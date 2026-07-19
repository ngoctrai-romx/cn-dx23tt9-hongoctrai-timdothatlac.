using System;
using System.Data;
using System.Data.SqlClient;

public partial class ChiTietSanPham : System.Web.UI.Page
{
    protected void Page_Load(object sender, EventArgs e)
    {
        if (!IsPostBack)
        {
            if (Request.QueryString["masp"] == null)
            {
                Response.Redirect("SanPham.aspx");
                return;
            }
            NapChiTiet();
        }
    }

    private void NapChiTiet()
    {
        string sql = @"SELECT sp.*, dm.TenDM
                       FROM tbl_SanPham sp
                       INNER JOIN tbl_DanhMuc dm ON sp.MaDM = dm.MaDM
                       WHERE sp.MaSP = @maSP";
        SqlParameter pMaSP = new SqlParameter("@maSP", Request.QueryString["masp"]);
        DataTable bang = XuLyDuLieu.DocBang(sql, pMaSP);

        if (bang.Rows.Count == 0)
        {
            Response.Redirect("SanPham.aspx");
            return;
        }

        DataRow sp = bang.Rows[0];
        lblTenSP.Text = sp["TenSP"].ToString();
        lblDanhMuc.Text = "Danh mục: " + sp["TenDM"];
        lblGia.Text = XuLyDuLieu.DinhDangTien(sp["DonGia"]);
        lblMoTa.Text = sp["MoTa"].ToString();
        imgHinh.ImageUrl = "~/" + sp["HinhAnh"];
        imgHinh.AlternateText = sp["TenSP"].ToString();

        int tonKho = Convert.ToInt32(sp["SoLuongTon"]);
        if (tonKho > 0)
            lblTonKho.Text = "✔ Còn hàng (" + tonKho + " sản phẩm)";
        else
        {
            lblTonKho.Text = "✘ Hết hàng";
            btnThemGio.Enabled = false;
        }

        // Sản phẩm cùng danh mục (tối đa 4, trừ chính nó)
        string sqlCungLoai = @"SELECT TOP 4 MaSP, TenSP, DonGia, HinhAnh
                               FROM tbl_SanPham
                               WHERE MaDM = @maDM AND MaSP <> @maSP AND TrangThai = 1";
        SqlParameter p1 = new SqlParameter("@maDM", sp["MaDM"]);
        SqlParameter p2 = new SqlParameter("@maSP", sp["MaSP"]);
        rptCungLoai.DataSource = XuLyDuLieu.DocBang(sqlCungLoai, p1, p2);
        rptCungLoai.DataBind();
    }

    protected void btnThemGio_Click(object sender, EventArgs e)
    {
        Page.Validate("ThemGio");
        int soLuongMua;
        if (!Page.IsValid || !int.TryParse(txtSoLuong.Text, out soLuongMua) || soLuongMua < 1 || soLuongMua > 100)
        {
            lblThongBao.CssClass = "error-msg";
            lblThongBao.Text = "Vui lòng nhập số lượng từ 1 đến 100.";
            return;
        }

        // Lấy thông tin sản phẩm hiện tại
        SqlParameter pMaSP = new SqlParameter("@maSP", Request.QueryString["masp"]);
        DataTable bang = XuLyDuLieu.DocBang("SELECT * FROM tbl_SanPham WHERE MaSP = @maSP", pMaSP);
        if (bang.Rows.Count == 0) return;
        DataRow sp = bang.Rows[0];

        // Lấy giỏ hàng từ Session, nếu chưa có thì tạo mới (giỏ hàng là 1 DataTable)
        DataTable gioHang = (DataTable)Session["GioHang"];
        if (gioHang == null)
        {
            gioHang = new DataTable();
            gioHang.Columns.Add("MaSP", typeof(int));
            gioHang.Columns.Add("TenSP", typeof(string));
            gioHang.Columns.Add("DonGia", typeof(decimal));
            gioHang.Columns.Add("SoLuong", typeof(int));
            gioHang.Columns.Add("HinhAnh", typeof(string));
        }

        // Nếu sản phẩm đã có trong giỏ thì tăng số lượng, chưa có thì thêm dòng mới
        bool daCo = false;
        foreach (DataRow dong in gioHang.Rows)
        {
            if (Convert.ToInt32(dong["MaSP"]) == Convert.ToInt32(sp["MaSP"]))
            {
                dong["SoLuong"] = Convert.ToInt32(dong["SoLuong"]) + soLuongMua;
                daCo = true;
                break;
            }
        }
        if (!daCo)
        {
            gioHang.Rows.Add(sp["MaSP"], sp["TenSP"], sp["DonGia"], soLuongMua, sp["HinhAnh"]);
        }

        Session["GioHang"] = gioHang;
        lblThongBao.CssClass = "success-msg";
        lblThongBao.Text = "Đã thêm \"" + sp["TenSP"] + "\" vào giỏ hàng!";
    }

    protected void btnGiamSoLuong_Click(object sender, EventArgs e)
    {
        int soLuong;
        if (!int.TryParse(txtSoLuong.Text, out soLuong)) soLuong = 1;
        txtSoLuong.Text = Math.Max(1, soLuong - 1).ToString();
        lblThongBao.Text = "";
    }

    protected void btnTangSoLuong_Click(object sender, EventArgs e)
    {
        int soLuong;
        if (!int.TryParse(txtSoLuong.Text, out soLuong)) soLuong = 1;
        txtSoLuong.Text = Math.Min(100, soLuong + 1).ToString();
        lblThongBao.Text = "";
    }
}
