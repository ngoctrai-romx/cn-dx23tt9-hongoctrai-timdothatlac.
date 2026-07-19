<%@ Page Language="C#" MasterPageFile="~/Admin/Admin.master" AutoEventWireup="true" CodeFile="QuanLySanPham.aspx.cs" Inherits="QuanLySanPham" %>

<asp:Content ID="Content1" ContentPlaceHolderID="NoiDungAdmin" runat="server">
    <div class="section-title">Quản lý sản phẩm</div>

    <!-- Form thêm / sửa sản phẩm -->
    <div class="search-bar" style="flex-direction:column;align-items:stretch;">
        <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:12px;">
            <div>
                <label style="font-size:13px;">Tên sản phẩm</label><br />
                <asp:TextBox ID="txtTenSP" runat="server" Width="100%" />
            </div>
            <div>
                <label style="font-size:13px;">Danh mục</label><br />
                <asp:DropDownList ID="ddlDanhMuc" runat="server" Width="100%" />
            </div>
            <div>
                <label style="font-size:13px;">Đơn giá (VNĐ)</label><br />
                <asp:TextBox ID="txtDonGia" runat="server" Width="100%" />
                <asp:CompareValidator runat="server" ControlToValidate="txtDonGia"
                    Operator="DataTypeCheck" Type="Double" ErrorMessage="Giá phải là số"
                    CssClass="error-msg" Display="Dynamic" />
            </div>
            <div>
                <label style="font-size:13px;">Số lượng tồn</label><br />
                <asp:TextBox ID="txtSoLuongTon" runat="server" Width="100%" />
            </div>
            <div>
                <label style="font-size:13px;">Hình ảnh (VD: Images/iphone16.jpg)</label><br />
                <asp:TextBox ID="txtHinhAnh" runat="server" Width="100%" />
            </div>
            <div>
                <label style="font-size:13px;">Mô tả</label><br />
                <asp:TextBox ID="txtMoTa" runat="server" Width="100%" />
            </div>
        </div>
        <div style="margin-top:12px;">
            <asp:Button ID="btnThem" runat="server" Text="➕ Thêm mới" CssClass="btn" OnClick="btnThem_Click" />
            <asp:Button ID="btnCapNhat" runat="server" Text="💾 Cập nhật" CssClass="btn btn-secondary"
                OnClick="btnCapNhat_Click" Enabled="false" />
            <asp:Button ID="btnHuy" runat="server" Text="Hủy" CssClass="btn btn-secondary"
                OnClick="btnHuy_Click" CausesValidation="false" />
            <asp:Label ID="lblThongBao" runat="server" style="margin-left:14px;" />
            <asp:HiddenField ID="hdMaSP" runat="server" />
        </div>
    </div>

    <!-- Tìm kiếm -->
    <div class="search-bar">
        <asp:TextBox ID="txtTimKiem" runat="server" placeholder="Tìm theo tên sản phẩm..." />
        <asp:Button ID="btnTim" runat="server" Text="Tìm kiếm" CssClass="btn"
            OnClick="btnTim_Click" CausesValidation="false" />
    </div>

    <!-- Danh sách sản phẩm -->
    <asp:GridView ID="gvSanPham" runat="server" AutoGenerateColumns="False"
        CssClass="table-style" DataKeyNames="MaSP"
        AllowPaging="true" PageSize="10"
        OnPageIndexChanging="gvSanPham_PageIndexChanging"
        OnRowCommand="gvSanPham_RowCommand">
        <Columns>
            <asp:BoundField DataField="MaSP" HeaderText="Mã" />
            <asp:BoundField DataField="TenSP" HeaderText="Tên sản phẩm" />
            <asp:BoundField DataField="TenDM" HeaderText="Danh mục" />
            <asp:TemplateField HeaderText="Đơn giá">
                <ItemTemplate><%# XuLyDuLieu.DinhDangTien(Eval("DonGia")) %></ItemTemplate>
            </asp:TemplateField>
            <asp:BoundField DataField="SoLuongTon" HeaderText="Tồn kho" />
            <asp:TemplateField HeaderText="Thao tác">
                <ItemTemplate>
                    <asp:Button runat="server" Text="Sửa" CssClass="btn btn-secondary"
                        CommandName="SuaSP" CommandArgument='<%# Eval("MaSP") %>' CausesValidation="false" />
                    <asp:Button runat="server" Text="Xóa" CssClass="btn btn-danger"
                        CommandName="XoaSP" CommandArgument='<%# Eval("MaSP") %>' CausesValidation="false"
                        OnClientClick="return confirm('Bạn có chắc muốn xóa sản phẩm này?');" />
                </ItemTemplate>
            </asp:TemplateField>
        </Columns>
    </asp:GridView>
</asp:Content>
