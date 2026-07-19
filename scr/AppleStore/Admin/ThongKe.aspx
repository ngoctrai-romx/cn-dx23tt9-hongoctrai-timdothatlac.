<%@ Page Language="C#" MasterPageFile="~/Admin/Admin.master" AutoEventWireup="true" CodeFile="ThongKe.aspx.cs" Inherits="ThongKe" %>

<asp:Content ID="Content1" ContentPlaceHolderID="NoiDungAdmin" runat="server">
    <div class="section-title">Thống kê - Báo cáo</div>

    <!-- Các thẻ số liệu tổng quan -->
    <div class="stat-cards">
        <div class="stat-card">
            <div class="num"><asp:Label ID="lblTongSP" runat="server" /></div>
            <div class="label">Sản phẩm đang bán</div>
        </div>
        <div class="stat-card">
            <div class="num"><asp:Label ID="lblTongKH" runat="server" /></div>
            <div class="label">Khách hàng</div>
        </div>
        <div class="stat-card">
            <div class="num"><asp:Label ID="lblTongDH" runat="server" /></div>
            <div class="label">Đơn hàng</div>
        </div>
        <div class="stat-card">
            <div class="num"><asp:Label ID="lblDoanhThu" runat="server" /></div>
            <div class="label">Doanh thu (đơn đã giao)</div>
        </div>
    </div>

    <!-- Thống kê doanh thu theo tháng -->
    <div class="section-title" style="font-size:20px;">Doanh thu theo tháng</div>
    <div class="search-bar">
        Năm:
        <asp:DropDownList ID="ddlNam" runat="server" AutoPostBack="true"
            OnSelectedIndexChanged="ddlNam_SelectedIndexChanged" />
    </div>
    <asp:GridView ID="gvDoanhThu" runat="server" AutoGenerateColumns="False" CssClass="table-style">
        <Columns>
            <asp:BoundField DataField="Thang" HeaderText="Tháng" />
            <asp:BoundField DataField="SoDon" HeaderText="Số đơn hàng" />
            <asp:TemplateField HeaderText="Doanh thu">
                <ItemTemplate><%# XuLyDuLieu.DinhDangTien(Eval("DoanhThu")) %></ItemTemplate>
            </asp:TemplateField>
        </Columns>
    </asp:GridView>

    <!-- Thống kê sản phẩm bán chạy -->
    <div class="section-title" style="font-size:20px;margin-top:30px;">Top 10 sản phẩm bán chạy</div>
    <asp:GridView ID="gvBanChay" runat="server" AutoGenerateColumns="False" CssClass="table-style">
        <Columns>
            <asp:BoundField DataField="TenSP" HeaderText="Sản phẩm" />
            <asp:BoundField DataField="DaBan" HeaderText="Số lượng đã bán" />
            <asp:TemplateField HeaderText="Doanh thu">
                <ItemTemplate><%# XuLyDuLieu.DinhDangTien(Eval("DoanhThu")) %></ItemTemplate>
            </asp:TemplateField>
        </Columns>
    </asp:GridView>

    <!-- Thống kê tồn kho thấp -->
    <div class="section-title" style="font-size:20px;margin-top:30px;">Sản phẩm sắp hết hàng (tồn dưới 30)</div>
    <asp:GridView ID="gvTonThap" runat="server" AutoGenerateColumns="False" CssClass="table-style">
        <Columns>
            <asp:BoundField DataField="TenSP" HeaderText="Sản phẩm" />
            <asp:BoundField DataField="SoLuongTon" HeaderText="Tồn kho" />
        </Columns>
    </asp:GridView>
</asp:Content>
