using System;
using System.Data;

public partial class _Default : System.Web.UI.Page
{
    protected void Page_Load(object sender, EventArgs e)
    {
        if (!IsPostBack)
        {
            // 8 sản phẩm mới nhất
            string sqlMoi = @"SELECT TOP 8 sp.MaSP, sp.TenSP, sp.DonGia, sp.HinhAnh, dm.TenDM
                              FROM tbl_SanPham sp
                              INNER JOIN tbl_DanhMuc dm ON sp.MaDM = dm.MaDM
                              WHERE sp.TrangThai = 1
                              ORDER BY sp.NgayNhap DESC";
            rptSanPhamMoi.DataSource = XuLyDuLieu.DocBang(sqlMoi);
            rptSanPhamMoi.DataBind();

            // 4 sản phẩm bán chạy nhất (tính theo tổng số lượng trong chi tiết đơn hàng)
            string sqlBanChay = @"SELECT TOP 4 sp.MaSP, sp.TenSP, sp.DonGia, sp.HinhAnh,
                                         SUM(ct.SoLuong) AS DaBan
                                  FROM tbl_SanPham sp
                                  INNER JOIN tbl_ChiTietDonHang ct ON sp.MaSP = ct.MaSP
                                  GROUP BY sp.MaSP, sp.TenSP, sp.DonGia, sp.HinhAnh
                                  ORDER BY DaBan DESC";
            rptBanChay.DataSource = XuLyDuLieu.DocBang(sqlBanChay);
            rptBanChay.DataBind();
        }
    }
}
