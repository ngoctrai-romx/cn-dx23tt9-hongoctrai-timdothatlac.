using System;
using System.Data;

public partial class SiteMaster : System.Web.UI.MasterPage
{
    protected void Page_Load(object sender, EventArgs e)
    {
        // Hiển thị số lượng sản phẩm trong giỏ hàng (lưu trong Session)
        DataTable gioHang = (DataTable)Session["GioHang"];
        int tongSoLuong = 0;
        if (gioHang != null)
        {
            foreach (DataRow dong in gioHang.Rows)
                tongSoLuong += Convert.ToInt32(dong["SoLuong"]);
        }
        lblSoLuongGio.Text = tongSoLuong.ToString();

        // Hiển thị tên khách hàng nếu đã đăng nhập
        if (Session["TenKhachHang"] != null)
        {
            lblXinChao.Text = "Xin chào, <b>" + Session["TenKhachHang"] + "</b>";
            lnkDangNhap.Visible = false;
            btnDangXuat.Visible = true;
        }
    }

    protected void btnDangXuat_Click(object sender, EventArgs e)
    {
        Session.Remove("MaKhachHang");
        Session.Remove("TenKhachHang");
        Response.Redirect("Default.aspx");
    }
}
