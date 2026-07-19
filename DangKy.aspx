<%@ Page Title="Đăng ký" Language="C#" MasterPageFile="~/Site.master" AutoEventWireup="true" CodeFile="DangKy.aspx.cs" Inherits="DangKy" %>

<asp:Content ID="Content1" ContentPlaceHolderID="NoiDung" runat="server">
    <div class="form-box">
        <h2>Đăng ký tài khoản</h2>
        <div class="form-row">
            <label>Họ và tên</label>
            <asp:TextBox ID="txtHoTen" runat="server" />
            <asp:RequiredFieldValidator runat="server" ControlToValidate="txtHoTen"
                ErrorMessage="Vui lòng nhập họ tên" CssClass="error-msg" Display="Dynamic" />
        </div>
        <div class="form-row">
            <label>Tên đăng nhập</label>
            <asp:TextBox ID="txtTenDangNhap" runat="server" />
            <asp:RequiredFieldValidator runat="server" ControlToValidate="txtTenDangNhap"
                ErrorMessage="Vui lòng nhập tên đăng nhập" CssClass="error-msg" Display="Dynamic" />
        </div>
        <div class="form-row">
            <label>Mật khẩu</label>
            <asp:TextBox ID="txtMatKhau" runat="server" TextMode="Password" />
            <asp:RequiredFieldValidator runat="server" ControlToValidate="txtMatKhau"
                ErrorMessage="Vui lòng nhập mật khẩu" CssClass="error-msg" Display="Dynamic" />
        </div>
        <div class="form-row">
            <label>Nhập lại mật khẩu</label>
            <asp:TextBox ID="txtNhapLai" runat="server" TextMode="Password" />
            <asp:CompareValidator runat="server" ControlToValidate="txtNhapLai"
                ControlToCompare="txtMatKhau" ErrorMessage="Mật khẩu nhập lại không khớp"
                CssClass="error-msg" Display="Dynamic" />
        </div>
        <div class="form-row">
            <label>Email</label>
            <asp:TextBox ID="txtEmail" runat="server" />
            <asp:RegularExpressionValidator runat="server" ControlToValidate="txtEmail"
                ValidationExpression="\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*"
                ErrorMessage="Email không hợp lệ" CssClass="error-msg" Display="Dynamic" />
        </div>
        <div class="form-row">
            <label>Số điện thoại</label>
            <asp:TextBox ID="txtDienThoai" runat="server" />
            <asp:RegularExpressionValidator runat="server" ControlToValidate="txtDienThoai"
                ValidationExpression="^0\d{9,10}$"
                ErrorMessage="Số điện thoại không hợp lệ (bắt đầu bằng 0, 10-11 số)"
                CssClass="error-msg" Display="Dynamic" />
        </div>
        <div class="form-row">
            <label>Địa chỉ</label>
            <asp:TextBox ID="txtDiaChi" runat="server" />
        </div>
        <asp:Button ID="btnDangKy" runat="server" Text="Đăng ký"
            CssClass="btn btn-full" OnClick="btnDangKy_Click" />
        <br /><br />
        <asp:Label ID="lblThongBao" runat="server" />
    </div>
</asp:Content>
