using System;
using System.Data;
using System.Data.SqlClient;
using System.Web.UI.WebControls;

public partial class QuanLyDonHang : System.Web.UI.Page
{
    protected void Page_Load(object sender, EventArgs e)
    {
        if (!IsPostBack) NapDanhSach();
    }

    private void NapDanhSach()
    {
        string sql = @"SELECT dh.MaDH, kh.HoTen, dh.NgayDat, dh.DiaChiGiao, dh.TongTien, dh.TrangThai
                       FROM tbl_DonHang dh
                       INNER JOIN tbl_KhachHang kh ON dh.MaKH = kh.MaKH";
        if (ddlTrangThai.SelectedValue != "")
            sql += " WHERE dh.TrangThai = @trangThai";
        sql += " ORDER BY dh.NgayDat DESC";

        DataTable bang;
        if (ddlTrangThai.SelectedValue != "")
        {
            SqlParameter p = new SqlParameter("@trangThai", ddlTrangThai.SelectedValue);
            bang = XuLyDuLieu.DocBang(sql, p);
        }
        else
        {
            bang = XuLyDuLieu.DocBang(sql);
        }
        gvDonHang.DataSource = bang;
        gvDonHang.DataBind();
    }

    protected void ddlTrangThai_SelectedIndexChanged(object sender, EventArgs e)
    {
        pnlChiTiet.Visible = false;
        NapDanhSach();
    }

    protected void gvDonHang_RowCommand(object sender, GridViewCommandEventArgs e)
    {
        int maDH = Convert.ToInt32(e.CommandArgument);
        SqlParameter pMaDH = new SqlParameter("@maDH", maDH);

        switch (e.CommandName)
        {
            case "XemCT":
                string sqlCT = @"SELECT sp.TenSP, ct.DonGia, ct.SoLuong
                                 FROM tbl_ChiTietDonHang ct
                                 INNER JOIN tbl_SanPham sp ON ct.MaSP = sp.MaSP
                                 WHERE ct.MaDH = @maDH";
                gvChiTiet.DataSource = XuLyDuLieu.DocBang(sqlCT, pMaDH);
                gvChiTiet.DataBind();
                lblMaDH.Text = "DH" + maDH.ToString().PadLeft(5, '0');
                pnlChiTiet.Visible = true;
                break;

            case "DuyetGiao":
                XuLyDuLieu.ThucThi("UPDATE tbl_DonHang SET TrangThai = N'Đang giao' WHERE MaDH = @maDH", pMaDH);
                lblThongBao.CssClass = "success-msg";
                lblThongBao.Text = "Đã chuyển đơn #" + maDH + " sang trạng thái Đang giao.";
                NapDanhSach();
                break;

            case "DaGiao":
                XuLyDuLieu.ThucThi("UPDATE tbl_DonHang SET TrangThai = N'Đã giao' WHERE MaDH = @maDH", pMaDH);
                lblThongBao.CssClass = "success-msg";
                lblThongBao.Text = "Đã chuyển đơn #" + maDH + " sang trạng thái Đã giao.";
                NapDanhSach();
                break;

            case "HuyDon":
                XuLyDuLieu.ThucThi("UPDATE tbl_DonHang SET TrangThai = N'Đã hủy' WHERE MaDH = @maDH", pMaDH);
                lblThongBao.CssClass = "success-msg";
                lblThongBao.Text = "Đã hủy đơn #" + maDH + ".";
                NapDanhSach();
                break;
        }
    }
}
