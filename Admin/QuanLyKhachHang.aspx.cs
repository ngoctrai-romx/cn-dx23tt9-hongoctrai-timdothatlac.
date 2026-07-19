using System;
using System.Data.SqlClient;

public partial class QuanLyKhachHang : System.Web.UI.Page
{
    protected void Page_Load(object sender, EventArgs e)
    {
        if (!IsPostBack) NapDanhSach();
    }

    private void NapDanhSach()
    {
        string sql = @"SELECT kh.MaKH, kh.HoTen, kh.TenDangNhap, kh.Email, kh.DienThoai,
                              kh.NgayDangKy, COUNT(dh.MaDH) AS SoDon
                       FROM tbl_KhachHang kh
                       LEFT JOIN tbl_DonHang dh ON kh.MaKH = dh.MaKH
                       WHERE kh.HoTen LIKE @tuKhoa OR kh.Email LIKE @tuKhoa
                       GROUP BY kh.MaKH, kh.HoTen, kh.TenDangNhap, kh.Email, kh.DienThoai, kh.NgayDangKy";
        SqlParameter p = new SqlParameter("@tuKhoa", "%" + txtTimKiem.Text.Trim() + "%");
        gvKhachHang.DataSource = XuLyDuLieu.DocBang(sql, p);
        gvKhachHang.DataBind();
    }

    protected void btnTim_Click(object sender, EventArgs e)
    {
        NapDanhSach();
    }
}
