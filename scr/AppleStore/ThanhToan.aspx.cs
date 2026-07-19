using System;
using System.Data;
using System.Data.SqlClient;

public partial class ThanhToan : System.Web.UI.Page
{
    protected void Page_Load(object sender, EventArgs e)
    {
        // Chưa đăng nhập thì chuyển về trang đăng nhập
        if (Session["MaKhachHang"] == null)
        {
            Response.Redirect("DangNhap.aspx?returnurl=ThanhToan.aspx");
            return;
        }

        // Giỏ hàng trống thì quay về trang sản phẩm
        DataTable gioHang = (DataTable)Session["GioHang"];
        if (gioHang == null || gioHang.Rows.Count == 0)
        {
            Response.Redirect("SanPham.aspx");
            return;
        }

        if (!IsPostBack)
        {
            gvDonHang.DataSource = gioHang;
            gvDonHang.DataBind();
            lblTongTien.Text = XuLyDuLieu.DinhDangTien(TinhTongTien(gioHang));

            // Điền sẵn thông tin khách hàng từ CSDL
            SqlParameter pMaKH = new SqlParameter("@maKH", Session["MaKhachHang"]);
            DataTable bangKH = XuLyDuLieu.DocBang(
                "SELECT HoTen, DienThoai, DiaChi FROM tbl_KhachHang WHERE MaKH = @maKH", pMaKH);
            if (bangKH.Rows.Count > 0)
            {
                txtNguoiNhan.Text = bangKH.Rows[0]["HoTen"].ToString();
                txtDienThoai.Text = bangKH.Rows[0]["DienThoai"].ToString();
                txtDiaChi.Text = bangKH.Rows[0]["DiaChi"].ToString();
            }
        }
    }

    private decimal TinhTongTien(DataTable gioHang)
    {
        decimal tong = 0;
        foreach (DataRow dong in gioHang.Rows)
            tong += Convert.ToDecimal(dong["DonGia"]) * Convert.ToInt32(dong["SoLuong"]);
        return tong;
    }

    protected void btnXacNhan_Click(object sender, EventArgs e)
    {
        DataTable gioHang = (DataTable)Session["GioHang"];
        if (gioHang == null || gioHang.Rows.Count == 0) return;

        decimal tongTien = TinhTongTien(gioHang);

        // 1. Thêm đơn hàng vào bảng tbl_DonHang
        string sqlDonHang = @"INSERT INTO tbl_DonHang (MaKH, TenNguoiNhan, DiaChiGiao, DienThoai, TongTien)
                              VALUES (@maKH, @nguoiNhan, @diaChi, @dienThoai, @tongTien);
                              SELECT SCOPE_IDENTITY();";   // lấy mã đơn hàng vừa thêm
        object maDH = XuLyDuLieu.LayGiaTri(sqlDonHang,
            new SqlParameter("@maKH", Session["MaKhachHang"]),
            new SqlParameter("@nguoiNhan", txtNguoiNhan.Text.Trim()),
            new SqlParameter("@diaChi", txtDiaChi.Text.Trim()),
            new SqlParameter("@dienThoai", txtDienThoai.Text.Trim()),
            new SqlParameter("@tongTien", tongTien));

        // 2. Thêm từng sản phẩm vào bảng chi tiết đơn hàng + trừ tồn kho
        foreach (DataRow dong in gioHang.Rows)
        {
            XuLyDuLieu.ThucThi(
                @"INSERT INTO tbl_ChiTietDonHang (MaDH, MaSP, SoLuong, DonGia)
                  VALUES (@maDH, @maSP, @soLuong, @donGia)",
                new SqlParameter("@maDH", maDH),
                new SqlParameter("@maSP", dong["MaSP"]),
                new SqlParameter("@soLuong", dong["SoLuong"]),
                new SqlParameter("@donGia", dong["DonGia"]));

            XuLyDuLieu.ThucThi(
                @"UPDATE tbl_SanPham SET SoLuongTon = SoLuongTon - @soLuong
                  WHERE MaSP = @maSP AND SoLuongTon >= @soLuong",
                new SqlParameter("@soLuong", dong["SoLuong"]),
                new SqlParameter("@maSP", dong["MaSP"]));
        }

        // 3. Xóa giỏ hàng và hiển thị thông báo thành công
        Session.Remove("GioHang");
        pnlDatHang.Visible = false;
        pnlThanhCong.Visible = true;
        lblMaDon.Text = "DH" + maDH.ToString().PadLeft(5, '0');
    }
}
