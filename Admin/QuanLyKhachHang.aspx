<%@ Page Language="C#" MasterPageFile="~/Admin/Admin.master" AutoEventWireup="true" CodeFile="QuanLyKhachHang.aspx.cs" Inherits="QuanLyKhachHang" %>

<asp:Content ID="Content1" ContentPlaceHolderID="NoiDungAdmin" runat="server">
    <div class="section-title">Quản lý khách hàng</div>

    <div class="search-bar">
        <asp:TextBox ID="txtTimKiem" runat="server" placeholder="Tìm theo tên hoặc email..." />
        <asp:Button ID="btnTim" runat="server" Text="Tìm kiếm" CssClass="btn" OnClick="btnTim_Click" />
    </div>

    <asp:GridView ID="gvKhachHang" runat="server" AutoGenerateColumns="False" CssClass="table-style">
        <Columns>
            <asp:BoundField DataField="MaKH" HeaderText="Mã KH" />
            <asp:BoundField DataField="HoTen" HeaderText="Họ tên" />
            <asp:BoundField DataField="TenDangNhap" HeaderText="Tên đăng nhập" />
            <asp:BoundField DataField="Email" HeaderText="Email" />
            <asp:BoundField DataField="DienThoai" HeaderText="Điện thoại" />
            <asp:BoundField DataField="NgayDangKy" HeaderText="Ngày đăng ký" DataFormatString="{0:dd/MM/yyyy}" />
            <asp:BoundField DataField="SoDon" HeaderText="Số đơn hàng" />
        </Columns>
    </asp:GridView>
</asp:Content>
