using System;
using System.Data;
using System.Data.SqlClient;
using System.Web;

public partial class DangNhap : System.Web.UI.Page
{
    protected void Page_Load(object sender, EventArgs e)
    {
        // Nếu có Cookie ghi nhớ đăng nhập thì tự động điền tên đăng nhập
        if (!IsPostBack)
        {
            HttpCookie cookie = Request.Cookies["NguoiDung"];
            if (cookie != null && cookie["TenDangNhap"] != null)
                txtTenDangNhap.Text = cookie["TenDangNhap"];
        }
    }

    protected void btnDangNhap_Click(object sender, EventArgs e)
    {
        // Kiểm tra tài khoản trong CSDL bằng câu truy vấn có tham số (tránh SQL Injection)
        string sql = @"SELECT MaKH, HoTen FROM tbl_KhachHang
                       WHERE TenDangNhap = @ten AND MatKhau = @matKhau";
        SqlParameter pTen = new SqlParameter("@ten", txtTenDangNhap.Text.Trim());
        SqlParameter pMatKhau = new SqlParameter("@matKhau", txtMatKhau.Text);
        DataTable bang = XuLyDuLieu.DocBang(sql, pTen, pMatKhau);

        if (bang.Rows.Count > 0)
        {
            // Đăng nhập thành công: lưu thông tin vào Session
            Session["MaKhachHang"] = bang.Rows[0]["MaKH"];
            Session["TenKhachHang"] = bang.Rows[0]["HoTen"];

            // Nếu chọn "Ghi nhớ đăng nhập" thì lưu Cookie 30 ngày
            if (chkGhiNho.Checked)
            {
                HttpCookie cookie = new HttpCookie("NguoiDung");
                cookie["TenDangNhap"] = txtTenDangNhap.Text.Trim();
                cookie.Expires = DateTime.Now.AddDays(30);
                Response.Cookies.Add(cookie);
            }

            // Quay về trang trước đó (nếu có) hoặc trang chủ
            if (Request.QueryString["returnurl"] != null)
                Response.Redirect(Request.QueryString["returnurl"]);
            else
                Response.Redirect("Default.aspx");
        }
        else
        {
            lblThongBao.Text = "Tên đăng nhập hoặc mật khẩu không đúng!";
        }
    }
}
