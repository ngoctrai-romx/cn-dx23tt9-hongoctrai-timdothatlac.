using System;
using System.Data;
using System.Data.SqlClient;
using System.Web.UI.WebControls;

public partial class QuanLyDanhMuc : System.Web.UI.Page
{
    protected void Page_Load(object sender, EventArgs e)
    {
        if (!IsPostBack) NapDanhSach();
    }

    private void NapDanhSach()
    {
        // Đếm số sản phẩm trong từng danh mục bằng LEFT JOIN
        string sql = @"SELECT dm.MaDM, dm.TenDM, dm.MoTa, COUNT(sp.MaSP) AS SoSP
                       FROM tbl_DanhMuc dm
                       LEFT JOIN tbl_SanPham sp ON dm.MaDM = sp.MaDM
                       GROUP BY dm.MaDM, dm.TenDM, dm.MoTa";
        gvDanhMuc.DataSource = XuLyDuLieu.DocBang(sql);
        gvDanhMuc.DataBind();
    }

    protected void btnThem_Click(object sender, EventArgs e)
    {
        if (txtTenDM.Text.Trim() == "")
        {
            lblThongBao.CssClass = "error-msg";
            lblThongBao.Text = "Nhập tên danh mục!";
            return;
        }
        XuLyDuLieu.ThucThi("INSERT INTO tbl_DanhMuc (TenDM, MoTa) VALUES (@ten, @moTa)",
            new SqlParameter("@ten", txtTenDM.Text.Trim()),
            new SqlParameter("@moTa", txtMoTa.Text.Trim()));
        lblThongBao.CssClass = "success-msg";
        lblThongBao.Text = "Thêm danh mục thành công!";
        txtTenDM.Text = txtMoTa.Text = "";
        NapDanhSach();
    }

    protected void btnCapNhat_Click(object sender, EventArgs e)
    {
        if (hdMaDM.Value == "") return;
        XuLyDuLieu.ThucThi("UPDATE tbl_DanhMuc SET TenDM = @ten, MoTa = @moTa WHERE MaDM = @maDM",
            new SqlParameter("@ten", txtTenDM.Text.Trim()),
            new SqlParameter("@moTa", txtMoTa.Text.Trim()),
            new SqlParameter("@maDM", hdMaDM.Value));
        lblThongBao.CssClass = "success-msg";
        lblThongBao.Text = "Cập nhật thành công!";
        txtTenDM.Text = txtMoTa.Text = hdMaDM.Value = "";
        btnThem.Enabled = true;
        btnCapNhat.Enabled = false;
        NapDanhSach();
    }

    protected void gvDanhMuc_RowCommand(object sender, GridViewCommandEventArgs e)
    {
        int maDM = Convert.ToInt32(e.CommandArgument);

        if (e.CommandName == "SuaDM")
        {
            SqlParameter p = new SqlParameter("@maDM", maDM);
            DataTable bang = XuLyDuLieu.DocBang("SELECT * FROM tbl_DanhMuc WHERE MaDM = @maDM", p);
            if (bang.Rows.Count > 0)
            {
                hdMaDM.Value = maDM.ToString();
                txtTenDM.Text = bang.Rows[0]["TenDM"].ToString();
                txtMoTa.Text = bang.Rows[0]["MoTa"].ToString();
                btnThem.Enabled = false;
                btnCapNhat.Enabled = true;
            }
        }
        else if (e.CommandName == "XoaDM")
        {
            // Ràng buộc: không xóa danh mục còn sản phẩm
            SqlParameter pDem = new SqlParameter("@maDM", maDM);
            object soSP = XuLyDuLieu.LayGiaTri(
                "SELECT COUNT(*) FROM tbl_SanPham WHERE MaDM = @maDM", pDem);

            if (Convert.ToInt32(soSP) > 0)
            {
                lblThongBao.CssClass = "error-msg";
                lblThongBao.Text = "Không thể xóa: danh mục này còn " + soSP + " sản phẩm!";
            }
            else
            {
                SqlParameter pXoa = new SqlParameter("@maDM", maDM);
                XuLyDuLieu.ThucThi("DELETE FROM tbl_DanhMuc WHERE MaDM = @maDM", pXoa);
                lblThongBao.CssClass = "success-msg";
                lblThongBao.Text = "Xóa danh mục thành công!";
                NapDanhSach();
            }
        }
    }
}
