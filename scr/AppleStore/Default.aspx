<%@ Page Title="Trang chủ" Language="C#" MasterPageFile="~/Site.master" AutoEventWireup="true" CodeFile="Default.aspx.cs" Inherits="_Default" %>

<asp:Content ID="Content1" ContentPlaceHolderID="NoiDung" runat="server">
    <!-- Banner -->
    <div class="banner">
        <h1>Apple Store</h1>
        <p>Sản phẩm công nghệ Apple chính hãng - Giá tốt nhất</p>
        <a class="btn btn-mua" href="SanPham.aspx">Xem tất cả sản phẩm</a>
    </div>

    <div class="container">
        <div class="section-title">Sản phẩm mới nhất</div>
        <asp:Repeater ID="rptSanPhamMoi" runat="server">
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

        <div class="section-title" style="margin-top:40px;">Bán chạy nhất</div>
        <asp:Repeater ID="rptBanChay" runat="server">
            <HeaderTemplate><div class="product-grid"></HeaderTemplate>
            <ItemTemplate>
                <div class="product-card">
                    <a href='ChiTietSanPham.aspx?masp=<%# Eval("MaSP") %>'>
                        <img src='<%# Eval("HinhAnh") %>' alt='<%# Eval("TenSP") %>'
                             onerror="this.src='Images/no-image.png'" />
                        <h3><%# Eval("TenSP") %></h3>
                    </a>
                    <div class="price"><%# XuLyDuLieu.DinhDangTien(Eval("DonGia")) %></div>
                    <div class="category">Đã bán: <%# Eval("DaBan") %></div>
                </div>
            </ItemTemplate>
            <FooterTemplate></div></FooterTemplate>
        </asp:Repeater>
    </div>
</asp:Content>
