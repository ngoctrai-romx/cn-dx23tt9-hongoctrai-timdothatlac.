<%@ Page Title="Đặt hàng" Language="C#" MasterPageFile="~/Site.master" AutoEventWireup="true" CodeFile="ThanhToan.aspx.cs" Inherits="ThanhToan" %>

<asp:Content ID="Content1" ContentPlaceHolderID="NoiDung" runat="server">
    <div class="container">
        <div class="section-title">Xác nhận đặt hàng</div>

        <asp:Panel ID="pnlDatHang" runat="server">
            <div style="display:grid;grid-template-columns:1fr 1fr;gap:30px;">
                <div class="form-box" style="margin:0;max-width:none;">
                    <h2>Thông tin giao hàng</h2>
                    <div class="form-row">
                        <label>Tên người nhận</label>
                        <asp:TextBox ID="txtNguoiNhan" runat="server" />
                        <asp:RequiredFieldValidator runat="server" ControlToValidate="txtNguoiNhan"
                            ErrorMessage="Nhập tên người nhận" CssClass="error-msg" Display="Dynamic" />
                    </div>
                    <div class="form-row">
                        <label>Địa chỉ giao hàng</label>
                        <asp:TextBox ID="txtDiaChi" runat="server" />
                        <asp:RequiredFieldValidator runat="server" ControlToValidate="txtDiaChi"
                            ErrorMessage="Nhập địa chỉ giao hàng" CssClass="error-msg" Display="Dynamic" />
                    </div>
                    <div class="form-row">
                        <label>Số điện thoại</label>
                        <asp:TextBox ID="txtDienThoai" runat="server" />
                        <asp:RequiredFieldValidator runat="server" ControlToValidate="txtDienThoai"
                            ErrorMessage="Nhập số điện thoại" CssClass="error-msg" Display="Dynamic" />
                    </div>
                    <asp:Button ID="btnXacNhan" runat="server" Text="Xác nhận đặt hàng"
                        CssClass="btn btn-full" OnClick="btnXacNhan_Click" />
                </div>

                <div>
                    <asp:GridView ID="gvDonHang" runat="server" AutoGenerateColumns="False" CssClass="table-style">
                        <Columns>
                            <asp:BoundField DataField="TenSP" HeaderText="Sản phẩm" />
                            <asp:BoundField DataField="SoLuong" HeaderText="SL" />
                            <asp:TemplateField HeaderText="Thành tiền">
                                <ItemTemplate>
                                    <%# XuLyDuLieu.DinhDangTien(Convert.ToDecimal(Eval("DonGia")) * Convert.ToInt32(Eval("SoLuong"))) %>
                                </ItemTemplate>
                            </asp:TemplateField>
                        </Columns>
                    </asp:GridView>
                    <h3 style="text-align:right;margin-top:14px;">
                        Tổng cộng: <asp:Label ID="lblTongTien" runat="server" style="color:#0071e3" />
                    </h3>
                </div>
            </div>
        </asp:Panel>

        <asp:Panel ID="pnlThanhCong" runat="server" Visible="false">
            <div class="form-box" style="text-align:center;">
                <h2 style="color:#1d7a1d;">✔ Đặt hàng thành công!</h2>
                <p style="margin:14px 0;">Mã đơn hàng của bạn: <b><asp:Label ID="lblMaDon" runat="server" /></b></p>
                <p style="color:#86868b;">Chúng tôi sẽ liên hệ với bạn để xác nhận đơn hàng.</p>
                <br />
                <a href="SanPham.aspx" class="btn">Tiếp tục mua sắm</a>
            </div>
        </asp:Panel>
    </div>
</asp:Content>
