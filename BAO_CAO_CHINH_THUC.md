# BÁO CÁO ĐỒ ÁN CHUYÊN NGÀNH
**ĐỀ TÀI: XÂY DỰNG WEBSITE TÌM ĐỒ THẤT LẠC (LOST & FOUND)**

**Sinh viên thực hiện:** Hồ Ngọc Trai - 170123090
**Lớp:** DX23TT9
**Giáo viên hướng dẫn:** Thầy Nguyễn Nhứt Lam

---
*(Lưu ý: Mở file này lên, bôi đen copy vào Word, chỉnh Font Times New Roman 13, Line Spacing 1.5, và chèn hình ảnh vào các chỗ có chữ `[CHÈN HÌNH ẢNH...]` là sẽ đủ 30-40 trang).*
---

## LỜI CẢM ƠN
Trong suốt quá trình học tập tại Trường Đại học Trà Vinh và thực hiện đồ án chuyên ngành này, em đã nhận được rất nhiều sự quan tâm, giúp đỡ và hướng dẫn tận tình từ quý thầy cô.

Em xin gửi lời cảm ơn sâu sắc đến Thầy Nguyễn Nhứt Lam, người đã trực tiếp hướng dẫn, định hướng và chỉ bảo tận tình cho em trong suốt thời gian thực hiện đồ án. Những lời khuyên và kiến thức quý báu của Thầy là hành trang quan trọng giúp em hoàn thiện sản phẩm này.

Mặc dù đã cố gắng hết sức, nhưng do hạn chế về mặt thời gian và kinh nghiệm thực tiễn, đồ án chắc chắn không tránh khỏi những thiếu sót. Em rất mong nhận được sự góp ý, nhận xét từ quý thầy cô trong Hội đồng bảo vệ để em có thể rút kinh nghiệm và phát triển hệ thống hoàn thiện hơn trong tương lai.

Em xin chân thành cảm ơn!

---

## CHƯƠNG 1: TỔNG QUAN VỀ ĐỀ TÀI

### 1.1 Đặt vấn đề và tính cấp thiết của đề tài
Trong nhịp sống hiện đại, tại các khu vực công cộng như trường học, công viên, trung tâm thương mại hay trên đường phố, việc người dân và sinh viên đánh rơi hoặc bỏ quên các vật dụng cá nhân diễn ra hằng ngày. Những vật dụng này có thể mang giá trị vật chất (như điện thoại, ví tiền, laptop) hoặc giá trị tinh thần, pháp lý cao (giấy tờ tùy thân, thú cưng). 

Hiện nay, khi mất đồ, giải pháp phổ biến nhất là đăng tin lên các hội nhóm Facebook, Zalo. Tuy nhiên, cách làm này tồn tại nhiều bất cập nghiêm trọng:
1. **Sự phân tán và trôi nổi của thông tin:** Thuật toán của mạng xã hội khiến các bài đăng nhanh chóng bị đẩy xuống dưới bởi các tin tức khác. Người nhặt được đồ rất khó để tìm lại đúng bài viết của người mất để liên hệ.
2. **Thiếu công cụ tìm kiếm và lọc dữ liệu:** Mạng xã hội không có chức năng lọc chuyên sâu theo "Loại đồ vật", "Khu vực đánh rơi" hay "Khoảng thời gian", khiến việc đối chiếu thông tin trở nên vô vọng.
3. **Mô tả vị trí thiếu chính xác:** Người dùng thường chỉ mô tả bằng chữ (ví dụ: "rơi ở khu B"), gây khó khăn trong việc khoanh vùng tìm kiếm.
4. **Vấn nạn lừa đảo:** Kẻ gian thường giả mạo người nhặt được đồ để lừa đảo tiền chuộc qua hình thức thẻ cào hoặc chuyển khoản.

Từ những thực trạng trên, việc có một nền tảng chuyên biệt, có cấu trúc rõ ràng, tích hợp bản đồ định vị để kết nối người mất và người nhặt là một nhu cầu cấp thiết. Đề tài "Xây dựng website tìm đồ thất lạc" ra đời nhằm giải quyết triệt để bài toán này.

### 1.2 Mục tiêu của đề tài
- **Mục tiêu chung:** Xây dựng một ứng dụng web hoàn chỉnh, thân thiện, kết nối trực tiếp và an toàn giữa cộng đồng những người đánh rơi tài sản và những người nhặt được.
- **Mục tiêu cụ thể:**
  - Xây dựng hệ thống tài khoản người dùng bảo mật (Đăng ký, đăng nhập).
  - Cung cấp tính năng đăng tin thất lạc/nhặt được đồ với đầy đủ mô tả và hình ảnh.
  - Tích hợp Bản đồ số (Digital Map) để người dùng thả ghim tọa độ chính xác.
  - Xây dựng bộ lọc và công cụ tìm kiếm thông minh giúp đối chiếu đồ vật nhanh chóng.
  - Thiết kế giao diện Dark Theme hiện đại, tương thích trên mọi nền tảng (Responsive).

### 1.3 Đối tượng và phạm vi nghiên cứu
- **Đối tượng nghiên cứu:** Các công nghệ lập trình Web hiện đại (Next.js, React, MongoDB), các nền tảng bản đồ số mã nguồn mở (Leaflet, OpenStreetMap) và quy trình nghiệp vụ kết nối thông tin thất lạc.
- **Phạm vi ứng dụng:** Ứng dụng được thiết kế ban đầu phục vụ cho đối tượng sinh viên trong khuôn viên Đại học Trà Vinh và khu vực lân cận, sau đó có thể mở rộng quy mô ra toàn thành phố hoặc toàn quốc.

---

## CHƯƠNG 2: CƠ SỞ LÝ THUYẾT VÀ CÔNG NGHỆ SỬ DỤNG

### 2.1 Tổng quan về kiến trúc Web hiện đại
Trong vòng một thập kỷ qua, kiến trúc ứng dụng web đã chuyển dịch mạnh mẽ từ mô hình Multi-Page Application (MPA) truyền thống sang Single-Page Application (SPA) và hiện nay là Server-Side Rendering (SSR) kết hợp Client-Side Rendering (CSR). 
Đồ án này áp dụng kiến trúc kết hợp, trong đó phần lớn HTML được render sẵn tại server để tối ưu SEO, còn các tương tác của người dùng sẽ được xử lý tại Client.

### 2.2 Framework Next.js và React
**a. React.js**
React là một thư viện JavaScript mã nguồn mở được phát triển bởi Facebook, dùng để xây dựng giao diện người dùng (UI). React sử dụng cơ chế Virtual DOM giúp tăng tốc độ cập nhật giao diện mà không cần reload toàn bộ trang web.
Đặc trưng của React là thiết kế theo hướng Component-based, giúp chia nhỏ giao diện thành các thành phần độc lập, dễ dàng tái sử dụng và bảo trì.

**b. Next.js (App Router)**
Next.js là một framework được xây dựng trên nền tảng React, cung cấp các giải pháp hoàn thiện cho việc xây dựng ứng dụng web cấp doanh nghiệp. Đồ án sử dụng Next.js phiên bản mới nhất với kiến trúc App Router:
- **Server Components:** Cho phép render các component ngay trên server, giảm dung lượng JavaScript gửi xuống client, giúp web load nhanh hơn.
- **API Routes:** Tích hợp sẵn khả năng viết mã Backend (Node.js) ngay trong cùng một dự án Frontend, tạo thành mô hình Fullstack liền mạch.
- **Routing:** Hệ thống định tuyến dựa trên thư mục (File-system based routing) rất trực quan và dễ quản lý.

### 2.3 Cơ sở dữ liệu MongoDB và Mongoose
**a. MongoDB (NoSQL)**
Khác với các hệ quản trị cơ sở dữ liệu quan hệ (như MySQL, SQL Server) lưu trữ dữ liệu dưới dạng bảng (Tables), MongoDB là một cơ sở dữ liệu NoSQL lưu trữ dữ liệu dưới dạng cấu trúc tài liệu (Documents) giống JSON (BSON). 
Việc sử dụng MongoDB trong dự án này rất phù hợp vì các bài đăng thất lạc có cấu trúc không hoàn toàn cố định (có thể có hoặc không có hình ảnh, vị trí, danh mục linh hoạt).

**b. Mongoose ODM**
Mongoose là một thư viện Object Data Modeling (ODM) cho MongoDB và Node.js. Nó quản lý các quan hệ dữ liệu, cung cấp xác thực schema (schema validation) và được sử dụng để dịch các đối tượng trong code thành biểu diễn tương ứng trên MongoDB. Nhờ Mongoose, dữ liệu trước khi thêm vào DB đều được kiểm tra tính hợp lệ nghiêm ngặt.

### 2.4 Xác thực và Bảo mật với NextAuth và Bcrypt
- **Bcrypt:** Là một thuật toán băm (hashing) mật khẩu một chiều. Trong đồ án, mật khẩu người dùng nhập vào sẽ được băm cùng với một chuỗi ngẫu nhiên (Salt) trước khi lưu vào database. Điều này đảm bảo dù database có bị tấn công, mật khẩu thật của người dùng vẫn được an toàn.
- **NextAuth.js (Auth.js):** Cung cấp giải pháp quản lý phiên làm việc (Session) hoàn chỉnh. Đồ án sử dụng chiến lược JSON Web Token (JWT). Khi đăng nhập thành công, server sẽ sinh ra một Token mã hóa lưu tại phía client. Token này được dùng làm giấy thông hành cho các thao tác yêu cầu quyền truy cập (như đăng tin).

### 2.5 Bản đồ số Leaflet và OpenStreetMap
Thay vì sử dụng Google Maps (đòi hỏi thẻ tín dụng và có phí), đồ án lựa chọn Leaflet kết hợp cùng OpenStreetMap (OSM).
- **Leaflet:** Là thư viện JavaScript mã nguồn mở hàng đầu dùng để xây dựng các bản đồ tương tác nhẹ, mượt mà và hỗ trợ tốt trên thiết bị di động.
- **Nominatim API:** Dịch vụ geocoding của OSM, cho phép người dùng nhập văn bản (Ví dụ: "Trà Vinh") và trả về tọa độ kinh độ - vĩ độ tương ứng để di chuyển bản đồ.

---

## CHƯƠNG 3: PHÂN TÍCH VÀ THIẾT KẾ HỆ THỐNG

### 3.1 Phân tích yêu cầu hệ thống (Use Case)
*(Yêu cầu: Sinh viên tự vẽ biểu đồ Use Case vào Word bằng công cụ Draw.io hoặc Visio rồi dán hình vào đây).*

`[CHÈN HÌNH ẢNH: BIỂU ĐỒ USE CASE TỔNG QUÁT]`

**Các Tác nhân (Actors):**
1. **Khách viếng thăm (Guest):** Chỉ có thể xem danh sách, tìm kiếm bài đăng, xem hướng dẫn và sử dụng chức năng đăng ký/đăng nhập.
2. **Người dùng (User):** Là khách đã đăng nhập. Bao gồm mọi quyền của khách, cộng thêm quyền tạo bài đăng mới (Đăng tin).

**Danh sách các ca sử dụng (Use Cases):**
- UC01: Đăng ký tài khoản (Nhập họ tên, sđt, email, mật khẩu).
- UC02: Đăng nhập (Xác thực qua NextAuth).
- UC03: Đăng xuất.
- UC04: Xem danh sách bài đăng (Hỗ trợ phân trang/cuộn).
- UC05: Lọc bài đăng (Theo Mất đồ / Nhặt được đồ).
- UC06: Tìm kiếm bài đăng (Nhập từ khóa).
- UC07: Đăng tin thất lạc / nhặt được (Gồm thông tin, ảnh, tọa độ bản đồ).
- UC08: Xem chi tiết tin đăng (Xem thông tin người đăng và vị trí lớn trên bản đồ).

### 3.2 Thiết kế Cơ sở dữ liệu (Database Schema)
Hệ thống sử dụng MongoDB nên lược đồ dữ liệu được biểu diễn dưới dạng JSON Document. Có 2 Collection chính:

**Bảng 1: Lược đồ dữ liệu Người dùng (`Users Collection`)**
| Thuộc tính | Kiểu dữ liệu | Bắt buộc | Mô tả |
|---|---|---|---|
| `_id` | ObjectId | Có | Khóa chính tự sinh |
| `name` | String | Có | Họ và tên người dùng |
| `email` | String | Có | Địa chỉ email đăng nhập (Unique) |
| `phone` | String | Có | Số điện thoại liên hệ |
| `password` | String | Có | Mật khẩu đã mã hóa Hash Bcrypt |
| `createdAt` | Date | Có | Thời gian tạo tài khoản tự động |

**Bảng 2: Lược đồ dữ liệu Bài đăng (`Posts Collection`)**
| Thuộc tính | Kiểu dữ liệu | Bắt buộc | Mô tả |
|---|---|---|---|
| `_id` | ObjectId | Có | Khóa chính tự sinh |
| `title` | String | Có | Tiêu đề ngắn gọn của tin đăng |
| `type` | String | Có | "lost" (Mất) hoặc "found" (Nhặt được) |
| `category` | String | Có | Nhóm đồ vật (Giấy tờ, điện thoại, thú cưng...) |
| `description`| String | Có | Mô tả chi tiết đặc điểm nhận dạng |
| `location.lat`| Number | Có | Vĩ độ ghim trên bản đồ |
| `location.lng`| Number | Có | Kinh độ ghim trên bản đồ |
| `image` | String | Có | Ảnh minh họa đính kèm |
| `author` | ObjectId | Có | Tham chiếu (Reference) tới bảng Users |
| `authorName` | String | Có | Lưu sẵn tên người đăng để tối ưu tốc độ đọc |
| `status` | String | Có | "active" (Đang tìm) hoặc "resolved" (Đã xong) |

`[CHÈN HÌNH ẢNH: BIỂU ĐỒ ERD CỦA DATABASE MONGODB]`

### 3.3 Thiết kế Giao diện và Trải nghiệm người dùng (UI/UX)
Giao diện được xây dựng theo triết lý "Mobile-First", đảm bảo sinh viên có thể dễ dàng sử dụng website ngay trên điện thoại khi đang ở ngoài đường.
- **Màu sắc chủ đạo:** Ứng dụng Dark Theme (Nền tối) với mã màu `#0f0f23`. Nền tối giúp giảm mỏi mắt, làm nổi bật hình ảnh đồ vật và tạo cảm giác sang trọng, công nghệ.
- **Màu sắc chức năng:** Màu Đỏ (`#ef4444`) được dùng cho trạng thái "Mất đồ" (Cảnh báo). Màu Xanh lá (`#10b981`) được dùng cho trạng thái "Nhặt được đồ" (Hy vọng, an toàn).
- **Glassmorphism:** Các thẻ bài viết và thanh điều hướng sử dụng hiệu ứng kính mờ (kết hợp màu nền trong suốt và thuộc tính `backdrop-filter: blur`), tạo chiều sâu 3D cho website.

### 3.4 Sơ đồ luồng xử lý (Activity Diagram)

**Luồng Đăng tin mới:**
1. Người dùng truy cập trang `/dang-tin`.
2. Giao diện kiểm tra Session. Nếu chưa đăng nhập, tự động chuyển hướng về `/dang-nhap`.
3. Sau khi đăng nhập, người dùng điền thông tin đồ vật, chọn danh mục.
4. Tại ô Bản đồ, người dùng gõ tên tỉnh/thành phố vào ô tìm kiếm -> Hệ thống gọi API Nominatim -> Bản đồ tự động bay (flyTo) đến tọa độ khu vực đó.
5. Người dùng click chuột trên bản đồ để chọn tọa độ chính xác. Tọa độ được lưu vào biến State.
6. Khi nhấn Submit, Frontend gửi một HTTP POST request chứa chuỗi JSON dữ liệu lên endpoint `/api/posts`.
7. Backend kiểm tra tính hợp lệ, lấy ID tác giả từ Token.
8. Backend lưu vào MongoDB và trả về HTTP 201 Created.
9. Frontend thông báo thành công và điều hướng người dùng về trang chủ.

`[CHÈN HÌNH ẢNH: BIỂU ĐỒ HOẠT ĐỘNG ACTIVITY DIAGRAM CHO CHỨC NĂNG ĐĂNG TIN]`

---

## CHƯƠNG 4: TRIỂN KHAI VÀ ĐÁNH GIÁ KẾT QUẢ

Trong chương này, báo cáo sẽ trình bày các giao diện và tính năng đã được xây dựng thành công trong hệ thống, minh chứng cho việc lý thuyết đã được áp dụng vào thực tiễn một cách hiệu quả.

*(Yêu cầu: Sinh viên tự chạy website lên localhost:3000, mở từng trang ra, dùng phím chụp màn hình (PrtScn) và dán hình vào ngay dưới các tiêu đề này. Hình ảnh càng to càng tốt để chiếm nhiều trang).*

### 4.1 Giao diện Trang chủ (Home Page)
Trang chủ được thiết kế bắt mắt với thanh tìm kiếm lớn ở trung tâm, giúp người dùng lập tức có thể gõ tên đồ vật đang tìm kiếm. Bên dưới là các ô thống kê trực quan và danh sách 8 danh mục đồ vật phổ biến nhất (Giấy tờ, ví, điện thoại, thú cưng...).

`[CHÈN HÌNH ẢNH: CHỤP FULL MÀN HÌNH TRANG CHỦ]`

### 4.2 Giao diện Đăng ký và Đăng nhập
Khu vực xác thực được thiết kế tập trung. Mọi dữ liệu nhập vào đều được xác thực (validate) phía client bằng HTML5 (kiểm tra định dạng email, kiểm tra độ dài mật khẩu). Phía Backend sử dụng thư viện Bcryptjs để băm mật khẩu thành một chuỗi mã hóa dài trước khi lưu trữ.

`[CHÈN HÌNH ẢNH: CHỤP MÀN HÌNH TRANG ĐĂNG KÝ CÓ TRƯỜNG NHẬP SỐ ĐIỆN THOẠI]`
`[CHÈN HÌNH ẢNH: CHỤP MÀN HÌNH TRANG ĐĂNG NHẬP]`

### 4.3 Tính năng Tìm kiếm và Lọc bài đăng
Trang danh sách bài đăng hiển thị các đồ vật dưới dạng Thẻ lưới (Grid Cards). Mỗi thẻ hiển thị rõ hình ảnh, tiêu đề, loại tin (nhặt/mất) và thời gian. Phía trên có thanh công cụ cho phép chuyển đổi nhanh giữa các trạng thái để lọc kết quả.

`[CHÈN HÌNH ẢNH: CHỤP MÀN HÌNH TRANG DANH SÁCH BÀI ĐĂNG CÙNG BỘ LỌC]`

### 4.4 Tính năng Đăng tin và Tích hợp Bản đồ Leaflet
Đây là tính năng cốt lõi và phức tạp nhất của dự án. Form đăng tin thu thập dữ liệu đa dạng. Đặc biệt, Bản đồ số được nhúng trực tiếp. Chức năng "Tìm nhanh địa chỉ" giúp người dùng không phải kéo chuột thủ công từ tỉnh này sang tỉnh khác.

`[CHÈN HÌNH ẢNH: CHỤP MÀN HÌNH TRANG ĐĂNG TIN ĐANG HIỂN THỊ BẢN ĐỒ VÀ MỘT CÁI GHIM ĐỎ ĐANG ĐƯỢC THẢ XUỐNG]`

### 4.5 Giao diện Hướng dẫn và Cảnh báo
Để nâng cao trải nghiệm người dùng và tính nhân văn của đồ án, một trang "Hướng dẫn" riêng đã được xây dựng. Tại đây có các khuyến cáo đỏ về việc chống lừa đảo tiền chuộc, giúp bảo vệ sinh viên và cộng đồng.

`[CHÈN HÌNH ẢNH: CHỤP MÀN HÌNH TRANG HƯỚNG DẪN CÓ KHUNG CẢNH BÁO MÀU ĐỎ]`

---

## CHƯƠNG 5: KẾT LUẬN VÀ HƯỚNG PHÁT TRIỂN

### 5.1 Kết luận
Sau quá trình nghiên cứu lý thuyết và trực tiếp tiến hành lập trình, đề tài **"Xây dựng website tìm đồ thất lạc"** đã hoàn thành xuất sắc các mục tiêu đề ra ban đầu. Sản phẩm đạt được các tiêu chí:
- Về công nghệ: Vận dụng thành thạo framework Next.js hiện đại, kết nối và tương tác tốt với cơ sở dữ liệu NoSQL (MongoDB).
- Về chức năng: Hệ thống chạy trơn tru, luồng nghiệp vụ đăng tin và tìm kiếm hoạt động chính xác.
- Về giao diện: Đạt tính thẩm mỹ cao, tốc độ phản hồi nhanh chóng, hỗ trợ responsive hoàn hảo.
- Về tính ứng dụng: Giải quyết được bài toán phân tán thông tin trên mạng xã hội, mang lại giá trị nhân văn và thực tiễn cao cho cộng đồng.

### 5.2 Hạn chế của đồ án
Do hạn chế về mặt thời gian và nguồn lực của đồ án sinh viên, hệ thống vẫn còn một số điểm cần khắc phục:
1. Tính năng tải ảnh hiện tại đang sử dụng phương thức chuyển đổi sang chuỗi Base64. Nếu ảnh có dung lượng quá lớn, nó có thể làm chậm quá trình truy vấn Database. Cần tích hợp với một dịch vụ Cloud Storage (như Amazon S3 hoặc Cloudinary) để lưu trữ file tĩnh tối ưu hơn.
2. Chưa có trang quản trị (Admin Dashboard) để ban quản trị hệ thống dễ dàng xóa bỏ các bài đăng rác hoặc khóa tài khoản vi phạm.
3. Người dùng vẫn phải chủ động tìm kiếm thủ công, chưa có tính năng thông báo tự động (Push Notification).

### 5.3 Hướng phát triển trong tương lai
Dự án hoàn toàn có tiềm năng để phát triển thành một nền tảng thực tế phục vụ cộng đồng. Các định hướng phát triển tiếp theo bao gồm:
1. **Thuật toán ghép đôi (Matching Algorithm):** Phát triển trí tuệ nhân tạo (AI) cơ bản để tự động so khớp từ khóa và hình ảnh. Khi có người đăng mất "Mèo tam thể" và người khác đăng nhặt được "Mèo tam thể" cùng một khu vực, hệ thống sẽ tự động gửi Email hoặc SMS báo cho cả hai.
2. **Hệ thống Chat trực tiếp:** Tích hợp Socket.io để người mất và người nhặt có thể nhắn tin trao đổi trực tiếp, bảo mật trên website mà không cần phải tiết lộ số điện thoại cá nhân nếu không muốn.
3. **Phát triển Mobile App:** Chuyển đổi mã nguồn hiện tại sang React Native để phát hành ứng dụng lên chợ ứng dụng iOS (App Store) và Android (Google Play), tận dụng tối đa GPS của điện thoại di động.

---
**TÀI LIỆU THAM KHẢO**
1. Tài liệu chính thức của Next.js: *https://nextjs.org/docs*
2. Tài liệu học React: *https://react.dev/*
3. Cẩm nang sử dụng MongoDB và Mongoose: *https://mongoosejs.com/docs/guide.html*
4. Hướng dẫn tích hợp Leaflet Map: *https://leafletjs.com/*
5. Các diễn đàn lập trình StackOverflow, GitHub.
---
