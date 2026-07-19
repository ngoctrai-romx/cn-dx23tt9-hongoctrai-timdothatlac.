using System;
using System.Data;
using System.Data.SqlClient;

public partial class SanPham : System.Web.UI.Page
{
    protected void Page_Load(object sender, EventArgs e)
    {
        if (!IsPostBack)
        {
            NapDanhMuc();

            // Nếu có tham số madm trên URL (ví dụ SanPham.aspx?madm=1) thì chọn sẵn danh mục
            if (Request.QueryString["madm"] != null)
                ddlDanhMuc.SelectedValue = Request.QueryString["madm"];

            NapSanPham();
        }
    }

    // Nạp danh sách danh mục vào DropDownList
    private void NapDanhMuc()
    {
        DataTable bang = XuLyDuLieu.DocBang("SELECT MaDM, TenDM FROM tbl_DanhMuc");
        ddlDanhMuc.DataSource = bang;
        ddlDanhMuc.DataTextField = "TenDM";
        ddlDanhMuc.DataValueField = "MaDM";
        ddlDanhMuc.DataBind();
        ddlDanhMuc.Items.Insert(0, new System.Web.UI.WebControls.ListItem("-- Tất cả danh mục --", "0"));
    }

    // Nạp danh sách sản phẩm theo điều kiện tìm kiếm + lọc + sắp xếp
    private void NapSanPham()
    {
        string sql = @"SELECT sp.MaSP, sp.TenSP, sp.DonGia, sp.HinhAnh, dm.TenDM
                       FROM tbl_SanPham sp
                       INNER JOIN tbl_DanhMuc dm ON sp.MaDM = dm.MaDM
                       WHERE sp.TrangThai = 1
                         AND sp.TenSP LIKE @tuKhoa";       // tìm kiếm tương đối với LIKE

        // Lọc theo danh mục
        if (ddlDanhMuc.SelectedValue != "0" && ddlDanhMuc.SelectedValue != "")
            sql += " AND sp.MaDM = @maDM";

        // Sắp xếp
        switch (ddlSapXep.SelectedValue)
        {
            case "1": sql += " ORDER BY sp.DonGia ASC"; break;
            case "2": sql += " ORDER BY sp.DonGia DESC"; break;
            case "3": sql += " ORDER BY sp.TenSP ASC"; break;
            default: sql += " ORDER BY sp.NgayNhap DESC"; break;
        }

        // Khai báo tham số cho câu truy vấn
        SqlParameter pTuKhoa = new SqlParameter("@tuKhoa", "%" + txtTimKiem.Text.Trim() + "%");
        DataTable bang;
        if (sql.Contains("@maDM"))
        {
            SqlParameter pMaDM = new SqlParameter("@maDM", ddlDanhMuc.SelectedValue);
            bang = XuLyDuLieu.DocBang(sql, pTuKhoa, pMaDM);
        }
        else
        {
            bang = XuLyDuLieu.DocBang(sql, pTuKhoa);
        }

        rptSanPham.DataSource = bang;
        rptSanPham.DataBind();

        lblKetQua.Text = "Tìm thấy " + bang.Rows.Count + " sản phẩm";
        lblKhongTimThay.Visible = (bang.Rows.Count == 0);
    }

    protected void btnTim_Click(object sender, EventArgs e)
    {
        NapSanPham();
    }

    protected void ddlDanhMuc_SelectedIndexChanged(object sender, EventArgs e)
    {
        NapSanPham();
    }

    protected void ddlSapXep_SelectedIndexChanged(object sender, EventArgs e)
    {
        NapSanPham();
    }
}
