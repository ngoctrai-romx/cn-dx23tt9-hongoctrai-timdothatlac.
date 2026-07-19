<%@ Page Language="C#" AutoEventWireup="true" CodeFile="DangNhapAdmin.aspx.cs" Inherits="DangNhapAdmin" %>

<!DOCTYPE html>
<html lang="vi">
<head runat="server">
    <meta charset="utf-8" />
    <title>Đăng nhập quản trị - Apple Store</title>
    <link href="~/Content/StyleSheet.css" rel="stylesheet" runat="server" id="lnkCss" />
</head>
<body>
    <form id="form1" runat="server">
        <div class="form-box" style="margin-top:100px;">
            <h2>🔐 Đăng nhập quản trị</h2>
            <div class="form-row">
                <label>Tên đăng nhập</label>
                <asp:TextBox ID="txtTenDangNhap" runat="server" />
                <asp:RequiredFieldValidator runat="server" ControlToValidate="txtTenDangNhap"
                    ErrorMessage="Nhập tên đăng nhập" CssClass="error-msg" Display="Dynamic" />
            </div>
            <div class="form-row">
                <label>Mật khẩu</label>
                <asp:TextBox ID="txtMatKhau" runat="server" TextMode="Password" />
                <asp:RequiredFieldValidator runat="server" ControlToValidate="txtMatKhau"
                    ErrorMessage="Nhập mật khẩu" CssClass="error-msg" Display="Dynamic" />
            </div>
            <asp:Button ID="btnDangNhap" runat="server" Text="Đăng nhập"
                CssClass="btn btn-full" OnClick="btnDangNhap_Click" />
            <br /><br />
            <asp:Label ID="lblThongBao" runat="server" CssClass="error-msg" />
        </div>
    </form>
</body>
</html>
