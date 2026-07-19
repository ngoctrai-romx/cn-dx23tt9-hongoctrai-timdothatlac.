using System;
using System.Data;
using System.Data.SqlClient;
using System.Web.UI.WebControls;

public partial class QuanLySanPham : System.Web.UI.Page
{
    protected void Page_Load(object sender, EventArgs e)
    {
        if (!IsPostBack)
        {
            NapDanhMuc();
            NapDanhSach();
        }
    }

    private void NapDanhMuc()
    {
        DataTable bang = XuLyDuLieu.DocBang("SELECT MaDM, TenDM FROM tbl_DanhMuc");
        ddlDanhMuc.DataSource = bang;
        ddlDanhMuc.DataTextField = "TenDM";
        ddlDanhMuc.DataValueField = "MaDM";
        ddlDanhMuc.DataBind();
    }

    private void NapDanhSach()
    {
        string sql = @"SELECT sp.MaSP, sp.TenSP, sp.DonGia, sp.SoLuongTon, dm.TenDM
                       FROM tbl_SanPham sp
                       INNER JOIN tbl_DanhMuc dm ON sp.MaDM = dm.MaDM
                       WHERE sp.TenSP LIKE @tuKhoa
                       ORDER BY sp.MaSP DESC";
        SqlParameter pTuKhoa = new SqlParameter("@tuKhoa", "%" + txtTimKiem.Text.Trim() + "%");
        gvSanPham.DataSource = XuLyDuLieu.DocBang(sql, pTuKhoa);
        gvSanPham.DataBind();
    }

    // ==================== THÊM MỚI ====================
    protected void btnThem_Click(object sender, EventArgs e)
    {
        if (txtTenSP.Text.Trim() == "" || txtDonGia.Text.Trim() == "")
        {
            lblThongBao.CssClass = "error-msg";
            lblThongBao.Text = "Vui lòng nhập tên sản phẩm và đơn giá!";
            return;
        }

        string sql = @"INSERT INTO tbl_SanPham (TenSP, MaDM, DonGia, SoLuongTon, HinhAnh, MoTa)
                       VALUES (@ten, @maDM, @gia, @ton, @hinh, @moTa)";
        int ketQua = XuLyDuLieu.ThucThi(sql,
            new SqlParameter("@ten", txtTenSP.Text.Trim()),
            new SqlParameter("@maDM", ddlDanhMuc.SelectedValue),
            new SqlParameter("@gia", txtDonGia.Text.Trim()),
            new SqlParameter("@ton", txtSoLuongTon.Text.Trim() == "" ? "0" : txtSoLuongTon.Text.Trim()),
            new SqlParameter("@hinh", txtHinhAnh.Text.Trim()),
            new SqlParameter("@moTa", txtMoTa.Text.Trim()));

        lblThongBao.CssClass = "success-msg";
        lblThongBao.Text = ketQua > 0 ? "Thêm sản phẩm thành công!" : "Thêm thất bại!";
        XoaTrang();
        NapDanhSach();
    }

    // ==================== SỬA / XÓA ====================
    protected void gvSanPham_RowCommand(object sender, GridViewCommandEventArgs e)
    {
        int maSP = Convert.ToInt32(e.CommandArgument);

        if (e.CommandName == "SuaSP")
        {
            // Nạp thông tin sản phẩm lên form để sửa
            SqlParameter p = new SqlParameter("@maSP", maSP);
            DataTable bang = XuLyDuLieu.DocBang("SELECT * FROM tbl_SanPham WHERE MaSP = @maSP", p);
            if (bang.Rows.Count > 0)
            {
                DataRow sp = bang.Rows[0];
                hdMaSP.Value = maSP.ToString();
                txtTenSP.Text = sp["TenSP"].ToString();
                ddlDanhMuc.SelectedValue = sp["MaDM"].ToString();
                txtDonGia.Text = sp["DonGia"].ToString();
                txtSoLuongTon.Text = sp["SoLuongTon"].ToString();
                txtHinhAnh.Text = sp["HinhAnh"].ToString();
                txtMoTa.Text = sp["MoTa"].ToString();
                btnCapNhat.Enabled = true;
                btnThem.Enabled = false;
            }
        }
        else if (e.CommandName == "XoaSP")
        {
            // Kiểm tra sản phẩm đã có trong đơn hàng chưa (ràng buộc khóa ngoại)
            SqlParameter pKiemTra = new SqlParameter("@maSP", maSP);
            object soDon = XuLyDuLieu.LayGiaTri(
                "SELECT COUNT(*) FROM tbl_ChiTietDonHang WHERE MaSP = @maSP", pKiemTra);

            if (Convert.ToInt32(soDon) > 0)
            {
                // Đã có đơn hàng: không xóa vật lý mà chuyển trạng thái ngừng bán
                SqlParameter pAn = new SqlParameter("@maSP", maSP);
                XuLyDuLieu.ThucThi("UPDATE tbl_SanPham SET TrangThai = 0 WHERE MaSP = @maSP", pAn);
                lblThongBao.CssClass = "success-msg";
                lblThongBao.Text = "Sản phẩm đã có đơn hàng nên được chuyển sang trạng thái ngừng bán.";
            }
            else
            {
                SqlParameter pXoa = new SqlParameter("@maSP", maSP);
                XuLyDuLieu.ThucThi("DELETE FROM tbl_SanPham WHERE MaSP = @maSP", pXoa);
                lblThongBao.CssClass = "success-msg";
                lblThongBao.Text = "Xóa sản phẩm thành công!";
            }
            NapDanhSach();
        }
    }

    protected void btnCapNhat_Click(object sender, EventArgs e)
    {
        if (hdMaSP.Value == "") return;

        string sql = @"UPDATE tbl_SanPham
                       SET TenSP = @ten, MaDM = @maDM, DonGia = @gia,
                           SoLuongTon = @ton, HinhAnh = @hinh, MoTa = @moTa
                       WHERE MaSP = @maSP";
        int ketQua = XuLyDuLieu.ThucThi(sql,
            new SqlParameter("@ten", txtTenSP.Text.Trim()),
            new SqlParameter("@maDM", ddlDanhMuc.SelectedValue),
            new SqlParameter("@gia", txtDonGia.Text.Trim()),
            new SqlParameter("@ton", txtSoLuongTon.Text.Trim() == "" ? "0" : txtSoLuongTon.Text.Trim()),
            new SqlParameter("@hinh", txtHinhAnh.Text.Trim()),
            new SqlParameter("@moTa", txtMoTa.Text.Trim()),
            new SqlParameter("@maSP", hdMaSP.Value));

        lblThongBao.CssClass = "success-msg";
        lblThongBao.Text = ketQua > 0 ? "Cập nhật thành công!" : "Cập nhật thất bại!";
        XoaTrang();
        NapDanhSach();
    }

    protected void btnHuy_Click(object sender, EventArgs e)
    {
        XoaTrang();
    }

    private void XoaTrang()
    {
        hdMaSP.Value = "";
        txtTenSP.Text = txtDonGia.Text = txtSoLuongTon.Text = txtHinhAnh.Text = txtMoTa.Text = "";
        btnThem.Enabled = true;
        btnCapNhat.Enabled = false;
    }

    protected void btnTim_Click(object sender, EventArgs e)
    {
        NapDanhSach();
    }

    protected void gvSanPham_PageIndexChanging(object sender, GridViewPageEventArgs e)
    {
        gvSanPham.PageIndex = e.NewPageIndex;
        NapDanhSach();
    }
}
