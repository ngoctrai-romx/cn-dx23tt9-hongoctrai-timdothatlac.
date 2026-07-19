<%@ Page Title="Đăng nhập" Language="C#" MasterPageFile="~/Site.master" AutoEventWireup="true" CodeFile="DangNhap.aspx.cs" Inherits="DangNhap" %>

<asp:Content ID="Content1" ContentPlaceHolderID="NoiDung" runat="server">
    <div class="form-box">
        <h2>Đăng nhập</h2>
        <div class="form-row">
            <asp:Label ID="lblTenDangNhap" runat="server" AssociatedControlID="txtTenDangNhap"
                Text="Tên đăng nhập" />
            <asp:TextBox ID="txtTenDangNhap" runat="server" autocomplete="username" />
            <asp:RequiredFieldValidator ID="rfvTen" runat="server"
                ControlToValidate="txtTenDangNhap" ErrorMessage="Vui lòng nhập tên đăng nhập"
                CssClass="error-msg" Display="Dynamic" ValidationGroup="DangNhap" />
        </div>
        <div class="form-row">
            <asp:Label ID="lblMatKhau" runat="server" AssociatedControlID="txtMatKhau"
                Text="Mật khẩu" />
            <asp:TextBox ID="txtMatKhau" runat="server" TextMode="Password"
                autocomplete="current-password" />
            <asp:RequiredFieldValidator ID="rfvMatKhau" runat="server"
                ControlToValidate="txtMatKhau" ErrorMessage="Vui lòng nhập mật khẩu"
                CssClass="error-msg" Display="Dynamic" ValidationGroup="DangNhap" />
        </div>
        <div class="form-row">
            <asp:CheckBox ID="chkGhiNho" runat="server" Text=" Ghi nhớ đăng nhập" />
        </div>
        <asp:Button ID="btnDangNhap" runat="server" Text="Đăng nhập"
            CssClass="btn btn-full" OnClick="btnDangNhap_Click"
            ValidationGroup="DangNhap" />
        <br /><br />
        <asp:Label ID="lblThongBao" runat="server" CssClass="error-msg" />
        <p style="text-align:center;margin-top:14px;font-size:14px;">
            Chưa có tài khoản? <a href="DangKy.aspx" style="color:#0071e3">Đăng ký ngay</a>
        </p>
    </div>
</asp:Content>
