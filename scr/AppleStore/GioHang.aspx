<%@ Page Title="Giỏ hàng" Language="C#" MasterPageFile="~/Site.master" AutoEventWireup="true" CodeFile="GioHang.aspx.cs" Inherits="GioHang" %>

<asp:Content ID="Content1" ContentPlaceHolderID="NoiDung" runat="server">
    <div class="container">
        <div class="section-title">Giỏ hàng của bạn</div>

        <div class="cart-table-wrap">
            <asp:GridView ID="gvGioHang" runat="server" AutoGenerateColumns="False"
                CssClass="table-style cart-table" DataKeyNames="MaSP"
                OnRowCommand="gvGioHang_RowCommand" EmptyDataText="">
                <Columns>
                    <asp:TemplateField HeaderText="Hình">
                        <ItemTemplate>
                            <img src='<%# Eval("HinhAnh") %>' class="cart-product-image"
                                 alt='<%# Eval("TenSP") %>' onerror="this.src='Images/no-image.png'" />
                        </ItemTemplate>
                        <ItemStyle CssClass="cart-image-cell" />
                    </asp:TemplateField>
                    <asp:BoundField DataField="TenSP" HeaderText="Tên sản phẩm"
                        ItemStyle-CssClass="cart-product-cell" />
                    <asp:TemplateField HeaderText="Đơn giá">
                        <ItemTemplate><%# XuLyDuLieu.DinhDangTien(Eval("DonGia")) %></ItemTemplate>
                        <ItemStyle CssClass="cart-price-cell" />
                    </asp:TemplateField>
                    <asp:TemplateField HeaderText="Số lượng">
                        <ItemTemplate>
                            <div class="quantity-editor">
                                <asp:Button ID="btnGiamSL" runat="server" Text="−"
                                    CssClass="quantity-step-button" ToolTip="Giảm số lượng"
                                    CausesValidation="false" CommandName="GiamSL"
                                    CommandArgument='<%# Eval("MaSP") %>' />
                                <asp:TextBox ID="txtSL" runat="server" Text='<%# Eval("SoLuong") %>'
                                    TextMode="Number" CssClass="quantity-input"
                                    min="1" max="100" inputmode="numeric" />
                                <asp:Button ID="btnTangSL" runat="server" Text="+"
                                    CssClass="quantity-step-button" ToolTip="Tăng số lượng"
                                    CausesValidation="false" CommandName="TangSL"
                                    CommandArgument='<%# Eval("MaSP") %>' />
                                <asp:Button ID="btnCapNhatSL" runat="server" Text="Lưu"
                                    CssClass="btn btn-secondary cart-save-button"
                                    CausesValidation="false" CommandName="CapNhat"
                                    CommandArgument='<%# Eval("MaSP") %>' />
                            </div>
                        </ItemTemplate>
                        <ItemStyle CssClass="cart-quantity-cell" />
                    </asp:TemplateField>
                    <asp:TemplateField HeaderText="Thành tiền">
                        <ItemTemplate>
                            <%# XuLyDuLieu.DinhDangTien(Convert.ToDecimal(Eval("DonGia")) * Convert.ToInt32(Eval("SoLuong"))) %>
                        </ItemTemplate>
                        <ItemStyle CssClass="cart-total-cell" />
                    </asp:TemplateField>
                    <asp:TemplateField HeaderText="">
                        <ItemTemplate>
                            <asp:Button ID="btnXoaSP" runat="server" Text="Xóa"
                                CssClass="btn btn-danger cart-delete-button" CausesValidation="false"
                                CommandName="XoaSP" CommandArgument='<%# Eval("MaSP") %>' />
                        </ItemTemplate>
                        <ItemStyle CssClass="cart-action-cell" />
                    </asp:TemplateField>
                </Columns>
            </asp:GridView>
        </div>

        <asp:Label ID="lblThongBao" runat="server" CssClass="cart-message" />

        <asp:Label ID="lblGioTrong" runat="server" Visible="false"
            Text="Giỏ hàng của bạn đang trống. " style="font-size:16px;color:#86868b;" />
        <asp:HyperLink ID="lnkMuaSam" runat="server" NavigateUrl="~/SanPham.aspx"
            Visible="false" CssClass="btn">Tiếp tục mua sắm</asp:HyperLink>

        <div style="text-align:right;margin-top:20px;">
            <h3>Tổng cộng: <asp:Label ID="lblTongTien" runat="server" style="color:#0071e3" /></h3>
            <br />
            <asp:Button ID="btnDatHang" runat="server" Text="Tiến hành đặt hàng"
                CssClass="btn" OnClick="btnDatHang_Click" Visible="false" />
        </div>
    </div>
</asp:Content>
