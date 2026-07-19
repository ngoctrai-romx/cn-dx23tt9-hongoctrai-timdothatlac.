<%@ Page Title="Chi tiết sản phẩm" Language="C#" MasterPageFile="~/Site.master" AutoEventWireup="true" CodeFile="ChiTietSanPham.aspx.cs" Inherits="ChiTietSanPham" %>

<asp:Content ID="Content1" ContentPlaceHolderID="NoiDung" runat="server">
    <div class="container">
        <div class="detail-wrap">
            <div>
                <asp:Image ID="imgHinh" runat="server" onerror="this.src='Images/no-image.png'" />
            </div>
            <div class="detail-info">
                <h1><asp:Label ID="lblTenSP" runat="server" /></h1>
                <div class="category"><asp:Label ID="lblDanhMuc" runat="server" /></div>
                <div class="price"><asp:Label ID="lblGia" runat="server" /></div>
                <div class="stock"><asp:Label ID="lblTonKho" runat="server" /></div>
                <p class="mota"><asp:Label ID="lblMoTa" runat="server" /></p>

                <div class="quantity-label">Số lượng</div>
                <div class="quantity-editor quantity-editor-detail">
                    <asp:Button ID="btnGiamSoLuong" runat="server" Text="−"
                        CssClass="quantity-step-button" ToolTip="Giảm số lượng"
                        CausesValidation="false" OnClick="btnGiamSoLuong_Click" />
                    <asp:TextBox ID="txtSoLuong" runat="server" Text="1" TextMode="Number"
                        CssClass="quantity-input" min="1" max="100" inputmode="numeric" />
                    <asp:Button ID="btnTangSoLuong" runat="server" Text="+"
                        CssClass="quantity-step-button" ToolTip="Tăng số lượng"
                        CausesValidation="false" OnClick="btnTangSoLuong_Click" />
                </div>
                <asp:RangeValidator ID="rvSoLuong" runat="server"
                    ControlToValidate="txtSoLuong" MinimumValue="1" MaximumValue="100"
                    Type="Integer" ErrorMessage="Số lượng từ 1 đến 100"
                    CssClass="error-msg" Display="Dynamic" ValidationGroup="ThemGio" />
                <br /><br />
                <asp:Button ID="btnThemGio" runat="server" Text="🛒 Thêm vào giỏ hàng"
                    CssClass="btn" OnClick="btnThemGio_Click" ValidationGroup="ThemGio" />
                <asp:Label ID="lblThongBao" runat="server" CssClass="success-msg" style="display:block;margin-top:10px;" />
            </div>
        </div>

        <div class="section-title" style="margin-top:40px;">Sản phẩm cùng danh mục</div>
        <asp:Repeater ID="rptCungLoai" runat="server">
            <HeaderTemplate><div class="product-grid"></HeaderTemplate>
            <ItemTemplate>
                <div class="product-card">
                    <a href='ChiTietSanPham.aspx?masp=<%# Eval("MaSP") %>'>
                        <img src='<%# Eval("HinhAnh") %>' alt='<%# Eval("TenSP") %>'
                             onerror="this.src='Images/no-image.png'" />
                        <h3><%# Eval("TenSP") %></h3>
                    </a>
                    <div class="price"><%# XuLyDuLieu.DinhDangTien(Eval("DonGia")) %></div>
                </div>
            </ItemTemplate>
            <FooterTemplate></div></FooterTemplate>
        </asp:Repeater>
    </div>
</asp:Content>
