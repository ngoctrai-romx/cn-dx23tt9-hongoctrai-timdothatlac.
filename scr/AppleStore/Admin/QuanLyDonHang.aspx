<%@ Page Language="C#" MasterPageFile="~/Admin/Admin.master" AutoEventWireup="true" CodeFile="QuanLyDonHang.aspx.cs" Inherits="QuanLyDonHang" %>

<asp:Content ID="Content1" ContentPlaceHolderID="NoiDungAdmin" runat="server">
    <div class="section-title">Quản lý đơn hàng</div>

    <div class="search-bar">
        Lọc theo trạng thái:
        <asp:DropDownList ID="ddlTrangThai" runat="server" AutoPostBack="true"
            OnSelectedIndexChanged="ddlTrangThai_SelectedIndexChanged">
            <asp:ListItem Value="">-- Tất cả --</asp:ListItem>
            <asp:ListItem Value="Chờ xử lý">Chờ xử lý</asp:ListItem>
            <asp:ListItem Value="Đang giao">Đang giao</asp:ListItem>
            <asp:ListItem Value="Đã giao">Đã giao</asp:ListItem>
            <asp:ListItem Value="Đã hủy">Đã hủy</asp:ListItem>
        </asp:DropDownList>
        <asp:Label ID="lblThongBao" runat="server" />
    </div>

    <asp:GridView ID="gvDonHang" runat="server" AutoGenerateColumns="False"
        CssClass="table-style" DataKeyNames="MaDH" OnRowCommand="gvDonHang_RowCommand">
        <Columns>
            <asp:BoundField DataField="MaDH" HeaderText="Mã ĐH" />
            <asp:BoundField DataField="HoTen" HeaderText="Khách hàng" />
            <asp:BoundField DataField="NgayDat" HeaderText="Ngày đặt" DataFormatString="{0:dd/MM/yyyy HH:mm}" />
            <asp:BoundField DataField="DiaChiGiao" HeaderText="Địa chỉ giao" />
            <asp:TemplateField HeaderText="Tổng tiền">
                <ItemTemplate><%# XuLyDuLieu.DinhDangTien(Eval("TongTien")) %></ItemTemplate>
            </asp:TemplateField>
            <asp:BoundField DataField="TrangThai" HeaderText="Trạng thái" />
            <asp:TemplateField HeaderText="Thao tác">
                <ItemTemplate>
                    <asp:Button runat="server" Text="Xem" CssClass="btn"
                        CommandName="XemCT" CommandArgument='<%# Eval("MaDH") %>' />
                    <asp:Button runat="server" Text="Duyệt giao" CssClass="btn btn-secondary"
                        CommandName="DuyetGiao" CommandArgument='<%# Eval("MaDH") %>' />
                    <asp:Button runat="server" Text="Đã giao" CssClass="btn btn-secondary"
                        CommandName="DaGiao" CommandArgument='<%# Eval("MaDH") %>' />
                    <asp:Button runat="server" Text="Hủy" CssClass="btn btn-danger"
                        CommandName="HuyDon" CommandArgument='<%# Eval("MaDH") %>'
                        OnClientClick="return confirm('Hủy đơn hàng này?');" />
                </ItemTemplate>
            </asp:TemplateField>
        </Columns>
    </asp:GridView>

    <!-- Chi tiết đơn hàng -->
    <asp:Panel ID="pnlChiTiet" runat="server" Visible="false" style="margin-top:26px;">
        <div class="section-title">Chi tiết đơn hàng <asp:Label ID="lblMaDH" runat="server" /></div>
        <asp:GridView ID="gvChiTiet" runat="server" AutoGenerateColumns="False" CssClass="table-style">
            <Columns>
                <asp:BoundField DataField="TenSP" HeaderText="Sản phẩm" />
                <asp:TemplateField HeaderText="Đơn giá">
                    <ItemTemplate><%# XuLyDuLieu.DinhDangTien(Eval("DonGia")) %></ItemTemplate>
                </asp:TemplateField>
                <asp:BoundField DataField="SoLuong" HeaderText="Số lượng" />
                <asp:TemplateField HeaderText="Thành tiền">
                    <ItemTemplate>
                        <%# XuLyDuLieu.DinhDangTien(Convert.ToDecimal(Eval("DonGia")) * Convert.ToInt32(Eval("SoLuong"))) %>
                    </ItemTemplate>
                </asp:TemplateField>
            </Columns>
        </asp:GridView>
    </asp:Panel>
</asp:Content>
