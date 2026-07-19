using System;
using System.Data;
using System.Data.SqlClient;

public partial class DangNhapAdmin : System.Web.UI.Page
{
    protected void btnDangNhap_Click(object sender, EventArgs e)
    {
        string sql = @"SELECT MaQT, HoTen FROM tbl_QuanTri
                       WHERE TenDangNhap = @ten AND MatKhau = @matKhau";
        SqlParameter pTen = new SqlParameter("@ten", txtTenDangNhap.Text.Trim());
        SqlParameter pMatKhau = new SqlParameter("@matKhau", txtMatKhau.Text);
        DataTable bang = XuLyDuLieu.DocBang(sql, pTen, pMatKhau);

        if (bang.Rows.Count > 0)
        {
            Session["MaQuanTri"] = bang.Rows[0]["MaQT"];
            Session["TenQuanTri"] = bang.Rows[0]["HoTen"];
            Response.Redirect("ThongKe.aspx");
        }
        else
        {
            lblThongBao.Text = "Sai tên đăng nhập hoặc mật khẩu!";
        }
    }
}
