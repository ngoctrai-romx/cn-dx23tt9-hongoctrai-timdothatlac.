<%@ Page Title="Sản phẩm" Language="C#" MasterPageFile="~/Site.master" AutoEventWireup="true" CodeFile="SanPham.aspx.cs" Inherits="SanPham" %>

<asp:Content ID="Content1" ContentPlaceHolderID="NoiDung" runat="server">
    <div class="container">
        <div class="section-title">Danh sách sản phẩm</div>

        <!-- Thanh tìm kiếm và lọc theo danh mục -->
        <div class="search-bar">
            <asp:TextBox ID="txtTimKiem" runat="server" placeholder="Nhập tên sản phẩm cần tìm..." />
            <asp:DropDownList ID="ddlDanhMuc" runat="server" AutoPostBack="true"
                OnSelectedIndexChanged="ddlDanhMuc_SelectedIndexChanged" />
            <asp:DropDownList ID="ddlSapXep" runat="server" AutoPostBack="true"
                OnSelectedIndexChanged="ddlSapXep_SelectedIndexChanged">
                <asp:ListItem Value="0">-- Sắp xếp --</asp:ListItem>
                <asp:ListItem Value="1">Giá tăng dần</asp:ListItem>
                <asp:ListItem Value="2">Giá giảm dần</asp:ListItem>
                <asp:ListItem Value="3">Tên A-Z</asp:ListItem>
            </asp:DropDownList>
            <asp:Button ID="btnTim" runat="server" Text="Tìm kiếm" CssClass="btn" OnClick="btnTim_Click" />
            <asp:Label ID="lblKetQua" runat="server" style="color:#86868b;font-size:14px;" />
        </div>

        <!-- Lưới sản phẩm -->
        <asp:Repeater ID="rptSanPham" runat="server">
            <HeaderTemplate><div class="product-grid"></HeaderTemplate>
            <ItemTemplate>
                <div class="product-card">
                    <a href='ChiTietSanPham.aspx?masp=<%# Eval("MaSP") %>'>
                        <img src='<%# Eval("HinhAnh") %>' alt='<%# Eval("TenSP") %>'
                             onerror="this.src='Images/no-image.png'" />
                        <h3><%# Eval("TenSP") %></h3>
                    </a>
                    <div class="price"><%# XuLyDuLieu.DinhDangTien(Eval("DonGia")) %></div>
                    <div class="category"><%# Eval("TenDM") %></div>
                </div>
            </ItemTemplate>
            <FooterTemplate></div></FooterTemplate>
        </asp:Repeater>

        <asp:Label ID="lblKhongTimThay" runat="server" Visible="false"
            Text="Không tìm thấy sản phẩm nào phù hợp." style="font-size:16px;color:#86868b;" />
    </div>
</asp:Content>
