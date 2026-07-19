<%@ Page Language="C#" MasterPageFile="~/Admin/Admin.master" AutoEventWireup="true" CodeFile="QuanLyDanhMuc.aspx.cs" Inherits="QuanLyDanhMuc" %>

<asp:Content ID="Content1" ContentPlaceHolderID="NoiDungAdmin" runat="server">
    <div class="section-title">Quản lý danh mục</div>

    <div class="search-bar">
        <asp:TextBox ID="txtTenDM" runat="server" placeholder="Tên danh mục..." />
        <asp:TextBox ID="txtMoTa" runat="server" placeholder="Mô tả..." Width="300px" />
        <asp:Button ID="btnThem" runat="server" Text="➕ Thêm" CssClass="btn" OnClick="btnThem_Click" />
        <asp:Button ID="btnCapNhat" runat="server" Text="💾 Cập nhật" CssClass="btn btn-secondary"
            OnClick="btnCapNhat_Click" Enabled="false" />
        <asp:HiddenField ID="hdMaDM" runat="server" />
        <asp:Label ID="lblThongBao" runat="server" />
    </div>

    <asp:GridView ID="gvDanhMuc" runat="server" AutoGenerateColumns="False"
        CssClass="table-style" DataKeyNames="MaDM" OnRowCommand="gvDanhMuc_RowCommand">
        <Columns>
            <asp:BoundField DataField="MaDM" HeaderText="Mã" />
            <asp:BoundField DataField="TenDM" HeaderText="Tên danh mục" />
            <asp:BoundField DataField="MoTa" HeaderText="Mô tả" />
            <asp:BoundField DataField="SoSP" HeaderText="Số sản phẩm" />
            <asp:TemplateField HeaderText="Thao tác">
                <ItemTemplate>
                    <asp:Button runat="server" Text="Sửa" CssClass="btn btn-secondary"
                        CommandName="SuaDM" CommandArgument='<%# Eval("MaDM") %>' />
                    <asp:Button runat="server" Text="Xóa" CssClass="btn btn-danger"
                        CommandName="XoaDM" CommandArgument='<%# Eval("MaDM") %>'
                        OnClientClick="return confirm('Bạn có chắc muốn xóa danh mục này?');" />
                </ItemTemplate>
            </asp:TemplateField>
        </Columns>
    </asp:GridView>
</asp:Content>
