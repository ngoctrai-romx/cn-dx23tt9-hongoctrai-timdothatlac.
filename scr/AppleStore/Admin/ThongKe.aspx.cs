using System;
using System.Data.SqlClient;

public partial class ThongKe : System.Web.UI.Page
{
    protected void Page_Load(object sender, EventArgs e)
    {
        if (!IsPostBack)
        {
            NapNam();
            NapTongQuan();
            NapDoanhThuThang();
            NapBanChay();
            NapTonThap();
        }
    }

    // Nạp danh sách năm có đơn hàng vào DropDownList
    private void NapNam()
    {
        var bang = XuLyDuLieu.DocBang(
            "SELECT DISTINCT YEAR(NgayDat) AS Nam FROM tbl_DonHang ORDER BY Nam DESC");
        ddlNam.DataSource = bang;
        ddlNam.DataTextField = "Nam";
        ddlNam.DataValueField = "Nam";
        ddlNam.DataBind();
        if (ddlNam.Items.Count == 0)
            ddlNam.Items.Add(DateTime.Now.Year.ToString());
    }

    private void NapTongQuan()
    {
        lblTongSP.Text = XuLyDuLieu.LayGiaTri(
            "SELECT COUNT(*) FROM tbl_SanPham WHERE TrangThai = 1").ToString();
        lblTongKH.Text = XuLyDuLieu.LayGiaTri(
            "SELECT COUNT(*) FROM tbl_KhachHang").ToString();
        lblTongDH.Text = XuLyDuLieu.LayGiaTri(
            "SELECT COUNT(*) FROM tbl_DonHang").ToString();

        object doanhThu = XuLyDuLieu.LayGiaTri(
            "SELECT ISNULL(SUM(TongTien),0) FROM tbl_DonHang WHERE TrangThai = N'Đã giao'");
        lblDoanhThu.Text = XuLyDuLieu.DinhDangTien(doanhThu);
    }

    // Báo cáo doanh thu theo tháng của năm được chọn (GROUP BY tháng)
    private void NapDoanhThuThang()
    {
        string sql = @"SELECT MONTH(NgayDat) AS Thang,
                              COUNT(MaDH) AS SoDon,
                              SUM(TongTien) AS DoanhThu
                       FROM tbl_DonHang
                       WHERE YEAR(NgayDat) = @nam AND TrangThai <> N'Đã hủy'
                       GROUP BY MONTH(NgayDat)
                       ORDER BY Thang";
        SqlParameter pNam = new SqlParameter("@nam", ddlNam.SelectedValue);
        gvDoanhThu.DataSource = XuLyDuLieu.DocBang(sql, pNam);
        gvDoanhThu.DataBind();
    }

    private void NapBanChay()
    {
        string sql = @"SELECT TOP 10 sp.TenSP,
                              SUM(ct.SoLuong) AS DaBan,
                              SUM(ct.SoLuong * ct.DonGia) AS DoanhThu
                       FROM tbl_ChiTietDonHang ct
                       INNER JOIN tbl_SanPham sp ON ct.MaSP = sp.MaSP
                       INNER JOIN tbl_DonHang dh ON ct.MaDH = dh.MaDH
                       WHERE dh.TrangThai <> N'Đã hủy'
                       GROUP BY sp.TenSP
                       ORDER BY DaBan DESC";
        gvBanChay.DataSource = XuLyDuLieu.DocBang(sql);
        gvBanChay.DataBind();
    }

    private void NapTonThap()
    {
        string sql = @"SELECT TenSP, SoLuongTon FROM tbl_SanPham
                       WHERE SoLuongTon < 30 AND TrangThai = 1
                       ORDER BY SoLuongTon ASC";
        gvTonThap.DataSource = XuLyDuLieu.DocBang(sql);
        gvTonThap.DataBind();
    }

    protected void ddlNam_SelectedIndexChanged(object sender, EventArgs e)
    {
        NapDoanhThuThang();
    }
}
