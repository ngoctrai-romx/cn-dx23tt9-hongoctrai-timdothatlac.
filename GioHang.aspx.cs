using System;
using System.Data;
using System.Web.UI.WebControls;

public partial class GioHang : System.Web.UI.Page
{
    protected void Page_Load(object sender, EventArgs e)
    {
        if (!IsPostBack)
        {
            HienThiGioHang();
        }
    }

    private void HienThiGioHang()
    {
        DataTable gioHang = (DataTable)Session["GioHang"];

        if (gioHang == null || gioHang.Rows.Count == 0)
        {
            gvGioHang.Visible = false;
            btnDatHang.Visible = false;
            lblGioTrong.Visible = true;
            lnkMuaSam.Visible = true;
            lblTongTien.Text = "0 đ";
            return;
        }

        gvGioHang.Visible = true;
        btnDatHang.Visible = true;
        lblGioTrong.Visible = false;
        lnkMuaSam.Visible = false;

        gvGioHang.DataSource = gioHang;
        gvGioHang.DataBind();

        // Tính tổng tiền giỏ hàng
        decimal tong = 0;
        foreach (DataRow dong in gioHang.Rows)
            tong += Convert.ToDecimal(dong["DonGia"]) * Convert.ToInt32(dong["SoLuong"]);
        lblTongTien.Text = XuLyDuLieu.DinhDangTien(tong);
    }

    protected void gvGioHang_RowCommand(object sender, GridViewCommandEventArgs e)
    {
        DataTable gioHang = (DataTable)Session["GioHang"];
        if (gioHang == null) return;

        int maSP = Convert.ToInt32(e.CommandArgument);
        DataRow dongSanPham = null;
        foreach (DataRow dong in gioHang.Rows)
        {
            if (Convert.ToInt32(dong["MaSP"]) == maSP)
            {
                dongSanPham = dong;
                break;
            }
        }

        if (dongSanPham == null) return;

        if (e.CommandName == "XoaSP")
        {
            gioHang.Rows.Remove(dongSanPham);
            lblThongBao.CssClass = "cart-message success-msg";
            lblThongBao.Text = "Đã xóa sản phẩm khỏi giỏ hàng.";
        }
        else if (e.CommandName == "GiamSL")
        {
            int soLuong = Convert.ToInt32(dongSanPham["SoLuong"]);
            dongSanPham["SoLuong"] = Math.Max(1, soLuong - 1);
            lblThongBao.CssClass = "cart-message success-msg";
            lblThongBao.Text = "Đã cập nhật số lượng.";
        }
        else if (e.CommandName == "TangSL")
        {
            int soLuong = Convert.ToInt32(dongSanPham["SoLuong"]);
            dongSanPham["SoLuong"] = Math.Min(100, soLuong + 1);
            lblThongBao.CssClass = "cart-message success-msg";
            lblThongBao.Text = "Đã cập nhật số lượng.";
        }
        else if (e.CommandName == "CapNhat")
        {
            // Lấy số lượng mới từ TextBox trong dòng GridView
            for (int i = 0; i < gvGioHang.Rows.Count; i++)
            {
                if (Convert.ToInt32(gvGioHang.DataKeys[i].Value) == maSP)
                {
                    TextBox txtSL = (TextBox)gvGioHang.Rows[i].FindControl("txtSL");
                    int soLuongMoi;
                    if (int.TryParse(txtSL.Text, out soLuongMoi) && soLuongMoi > 0)
                    {
                        dongSanPham["SoLuong"] = Math.Min(100, soLuongMoi);
                        lblThongBao.CssClass = "cart-message success-msg";
                        lblThongBao.Text = "Đã lưu số lượng mới.";
                    }
                    else
                    {
                        lblThongBao.CssClass = "cart-message error-msg";
                        lblThongBao.Text = "Số lượng phải là số nguyên từ 1 đến 100.";
                    }
                    break;
                }
            }
        }

        Session["GioHang"] = gioHang;
        HienThiGioHang();
    }

    protected void btnDatHang_Click(object sender, EventArgs e)
    {
        // Bắt buộc đăng nhập trước khi đặt hàng
        if (Session["MaKhachHang"] == null)
            Response.Redirect("DangNhap.aspx?returnurl=ThanhToan.aspx");
        else
            Response.Redirect("ThanhToan.aspx");
    }
}
