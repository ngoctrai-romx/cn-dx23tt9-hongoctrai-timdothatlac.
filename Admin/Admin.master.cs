using System;

public partial class AdminMaster : System.Web.UI.MasterPage
{
    protected void Page_Load(object sender, EventArgs e)
    {
        // Kiểm tra đăng nhập quản trị: chưa đăng nhập thì chuyển về trang đăng nhập admin
        if (Session["MaQuanTri"] == null)
        {
            Response.Redirect("DangNhapAdmin.aspx");
            return;
        }
        lblAdmin.Text = "Quản trị viên: <b>" + Session["TenQuanTri"] + "</b>";
    }

    protected void btnDangXuat_Click(object sender, EventArgs e)
    {
        Session.Remove("MaQuanTri");
        Session.Remove("TenQuanTri");
        Response.Redirect("DangNhapAdmin.aspx");
    }
}
