using System;
using System.Data;
using System.Data.SqlClient;
using System.Web.Configuration;

/// <summary>
/// Lớp XuLyDuLieu: gom các hàm dùng chung để thao tác với CSDL
/// theo mô hình ADO.NET (Connection - Command - DataAdapter - DataSet)
/// </summary>
public class XuLyDuLieu
{
    // Lấy chuỗi kết nối từ file web.config
    public static string ChuoiKetNoi
    {
        get
        {
            return WebConfigurationManager.ConnectionStrings["strAppleStore"].ConnectionString;
        }
    }

    /// <summary>
    /// Đọc dữ liệu: trả về DataTable từ câu truy vấn SELECT (có thể kèm tham số)
    /// </summary>
    public static DataTable DocBang(string sql, params SqlParameter[] thamSo)
    {
        SqlConnection ketNoi = new SqlConnection(ChuoiKetNoi);
        SqlCommand lenh = new SqlCommand(sql, ketNoi);
        lenh.CommandType = CommandType.Text;
        if (thamSo != null)
        {
            foreach (SqlParameter p in thamSo)
                lenh.Parameters.Add(p);
        }
        SqlDataAdapter boDoc = new SqlDataAdapter(lenh);
        DataSet ds = new DataSet();
        boDoc.Fill(ds);
        return ds.Tables[0];
    }

    /// <summary>
    /// Thực thi câu lệnh INSERT / UPDATE / DELETE, trả về số dòng bị ảnh hưởng
    /// </summary>
    public static int ThucThi(string sql, params SqlParameter[] thamSo)
    {
        SqlConnection ketNoi = new SqlConnection(ChuoiKetNoi);
        SqlCommand lenh = new SqlCommand(sql, ketNoi);
        lenh.CommandType = CommandType.Text;
        if (thamSo != null)
        {
            foreach (SqlParameter p in thamSo)
                lenh.Parameters.Add(p);
        }
        ketNoi.Open();
        int soDong = lenh.ExecuteNonQuery();
        ketNoi.Close();
        return soDong;
    }

    /// <summary>
    /// Thực thi câu lệnh trả về 1 giá trị đơn (ví dụ SELECT COUNT(*), SELECT SUM(...))
    /// </summary>
    public static object LayGiaTri(string sql, params SqlParameter[] thamSo)
    {
        SqlConnection ketNoi = new SqlConnection(ChuoiKetNoi);
        SqlCommand lenh = new SqlCommand(sql, ketNoi);
        lenh.CommandType = CommandType.Text;
        if (thamSo != null)
        {
            foreach (SqlParameter p in thamSo)
                lenh.Parameters.Add(p);
        }
        ketNoi.Open();
        object ketQua = lenh.ExecuteScalar();
        ketNoi.Close();
        return ketQua;
    }

    /// <summary>
    /// Định dạng số tiền theo kiểu Việt Nam: 34990000 -> 34.990.000 đ
    /// </summary>
    public static string DinhDangTien(object gia)
    {
        decimal tien = Convert.ToDecimal(gia);
        return tien.ToString("#,##0").Replace(",", ".") + " đ";
    }
}
