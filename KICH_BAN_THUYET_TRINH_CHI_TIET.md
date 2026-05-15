# KỊCH BẢN THUYẾT TRÌNH ĐỒ ÁN CHUYÊN NGÀNH (CÓ PHIÊN ÂM TIẾNG ANH)
**Đề tài:** Xây dựng Website *(Wép-sai)* Tìm Đồ Thất Lạc
**Thời gian dự kiến:** 7 - 10 phút

---

## PHẦN 1: CHÀO HỎI & ĐẶT VẤN ĐỀ (1.5 phút)

*(Đứng thẳng, mỉm cười)*
**"Dạ, lời đầu tiên em xin kính chào quý Thầy Cô trong Hội đồng bảo vệ đồ án. Em tên là Hồ Ngọc Trai, sinh viên lớp DX23TT9. Hôm nay, em xin phép được trình bày đồ án chuyên ngành do Thầy Nguyễn Nhứt Lam hướng dẫn, mang tên: Xây dựng Website Tìm Đồ Thất Lạc - Lost & Found *(Lót en Phao)*."**

*(Chuyển Slide: Lý do chọn đề tài)*
**"Thưa quý Thầy Cô, ý tưởng của đề tài này xuất phát từ một vấn đề rất quen thuộc ngay trong khuôn viên trường đại học của chúng ta. Hằng ngày, có rất nhiều bạn sinh viên đánh rơi chìa khóa, ví tiền, hoặc giấy tờ tùy thân. Thông thường, các bạn sẽ chụp ảnh rồi đăng lên các group Facebook *(Phây-búc)* hoặc Zalo của trường."**

**"Tuy nhiên, cách làm này có một nhược điểm rất lớn: Chỉ sau vài giờ, bài đăng đó sẽ bị trôi tuột đi bởi các tin tức khác. Hơn nữa, việc tìm kiếm lại một món đồ trên Facebook giống như mò kim đáy bể vì không có bộ lọc chuyên dụng. Tệ hơn nữa, nhiều kẻ gian đã lợi dụng các kẽ hở thông tin này để lừa đảo tiền chuộc."**

**"Chính vì vậy, em quyết định xây dựng website TimDo.vn - một nền tảng chuyên biệt giúp cấu trúc hóa thông tin, có hệ thống tìm kiếm rõ ràng và bản đồ định vị chính xác, giúp người nhặt và người mất kết nối với nhau an toàn và nhanh chóng nhất."**

---

## PHẦN 2: GIỚI THIỆU CÔNG NGHỆ (1.5 phút)

*(Chuyển Slide - Sờ-lai: Công nghệ sử dụng)*
**"Để giải quyết bài toán này một cách tối ưu, thay vì sử dụng các ngôn ngữ cũ, em đã quyết định áp dụng các công nghệ Web hiện đại nhất hiện nay:"**
- **"Về phía Frontend *(Phờ-rôn-en - Giao diện)* và Backend *(Bách-en - Xử lý ngầm)*:"** Em sử dụng Framework *(Ph-rem-uộc)* **Next.js** *(Nếch Di Ét)* kết hợp **React** *(Ri-ách)*. Việc này giúp hệ thống vừa có giao diện tương tác mượt mà, vừa tối ưu hóa SEO *(Ét-i-ô)* và thời gian tải trang nhờ cơ chế xử lý tại Server *(Sơ-vơ)*.
- **"Về Cơ sở dữ liệu:"** Do đặc thù các bài đăng thất lạc có cấu trúc thông tin rất đa dạng (có thể có ảnh hoặc không, có vị trí hoặc không), em sử dụng **MongoDB** *(Mông-gô-đi-bi)* - một cơ sở dữ liệu NoSQL *(Nô-xi-quồ)* kết hợp thư viện **Mongoose** *(Mông-gu-xơ)* để lưu trữ linh hoạt.
- **"Về Xác thực và Bảo mật:"** Em dùng **NextAuth** *(Nếch-au)* để quản lý phiên đăng nhập và **Bcrypt** *(Bi-cờ-ríp)* để băm mật khẩu, đảm bảo an toàn tuyệt đối cho người dùng.
- **"Về Bản đồ:"** Thay vì Google Maps *(Gu-gồ Máp)* có tính phí, em đã tích hợp thành công **Leaflet** *(Líp-lệt)* kết hợp với **OpenStreetMap** *(Ô-pần Sờ-trít Máp)* để tạo ra bản đồ định vị hoàn toàn miễn phí nhưng vẫn đảm bảo độ chính xác cao.

---

## PHẦN 3: DEMO SẢN PHẨM TRỰC TIẾP (4 - 5 phút)

*(Bấm thoát Slide, mở trình duyệt web lên để Demo trực tiếp)*
**"Sau đây, em xin phép demo *(đề-mô - chạy thử)* trực tiếp các tính năng cốt lõi của hệ thống."**

**1. Giới thiệu Trang Chủ:**
*(Mở trang chủ, cuộn từ từ xuống)*
**"Đây là giao diện trang chủ của website với thiết kế Dark Theme *(Đác Thim - Giao diện tối)* hiện đại. Ở ngay trung tâm là một thanh tìm kiếm lớn để người dùng tra cứu nhanh. Phía dưới là các khối thống kê và 8 danh mục phổ biến như Giấy tờ, Ví, Điện thoại, Thú cưng..."**

**2. Demo chức năng Đăng Nhập / Đăng Ký:**
*(Bấm vào nút Đăng nhập / Đăng ký)*
**"Hệ thống bắt buộc người dùng phải đăng ký tài khoản để có thể đăng tin, việc này giúp hạn chế tình trạng spam *(sờ-pam - rác)*. Ở form *(phom)* đăng ký, em có thiết kế thêm trường 'Số điện thoại' bắt buộc nhập, để người nhặt được đồ có thể dễ dàng gọi điện liên lạc."** *(Thao tác gõ đăng nhập bằng 1 tài khoản có sẵn).*

**3. Demo chức năng Đăng Tin & Bản Đồ (Tính năng nổi bật nhất):**
*(Bấm vào nút Đăng Tin)*
**"Giả sử em vừa nhặt được một chiếc ví. Em sẽ bấm vào phần Đăng tin và chọn mục 'Nhặt được đồ'. Em điền thông tin mô tả."**
*(Vừa nói vừa gõ test)*
**"Đặc biệt nhất ở đây là phần Bản đồ định vị. Rất nhiều người khi đăng tin chỉ nói chung chung là 'Rơi ở Trà Vinh', làm người khác không thể tìm được. Ở đây, em đã nhúng một bản đồ tương tác. Nếu em gõ 'Đại học Trà Vinh' vào thanh tìm kiếm nhanh, bản đồ sẽ tự động bay đến đúng khu vực đó."** *(Thao tác gõ và nhấn nút Tìm kiếm nhanh)* **"Sau đó, em chỉ cần click chuột để thả cái ghim đỏ xuống chính xác tòa nhà em đã nhặt được cái ví. Sau đó bấm Đăng tin."**

**4. Demo chức năng Lọc / Tìm kiếm:**
*(Chuyển sang trang Danh sách tin)*
**"Sau khi đăng, bài viết sẽ hiện ra ở trang danh sách với một nhãn dán màu Xanh lá là 'Nhặt được'. Nếu là bài mất đồ thì nhãn sẽ có màu Đỏ để dễ phân biệt. Thầy cô có thể thấy bộ lọc ở đây hoạt động ngay lập tức khi bấm vào."** *(Bấm qua lại giữa các nút Mất đồ / Nhặt được).*

---

## PHẦN 4: KẾT LUẬN & HƯỚNG PHÁT TRIỂN (1 phút)

*(Mở lại Slide: Kết luận & Hướng phát triển)*
**"Thưa quý Thầy Cô, sau thời gian nghiên cứu và lập trình, đồ án đã hoàn thành được các mục tiêu cốt lõi: Xây dựng thành công một nền tảng website chạy ổn định, giao diện mượt mà, kết nối trực tiếp với Database *(Đa-ta-bây - Cơ sở dữ liệu)* và có tính năng bản đồ hoạt động trơn tru."**

**"Tuy nhiên, sản phẩm vẫn còn một số điểm có thể cải thiện như: Cần tích hợp thêm Cloud Storage *(Cờ-lau Sto-rịt - Lưu trữ đám mây)* để lưu trữ hình ảnh chuyên nghiệp hơn, và xây dựng một trang Quản trị Admin *(Át-min)* để kiểm duyệt các bài viết rác."**

**"Nếu có thêm thời gian phát triển trong tương lai, em dự định sẽ bổ sung thêm 'Thuật toán Matching' *(Mát-chinh - Ghép đôi)*. Ví dụ: khi 1 bạn báo mất thẻ sinh viên, và 1 bạn báo nhặt được thẻ, hệ thống sẽ tự quét từ khóa và tự động gửi Email *(I-meo)* thông báo cho cả 2 bạn để liên hệ với nhau."**

**"Dạ, phần trình bày đồ án của em đến đây là kết thúc. Em xin chân thành cảm ơn quý Thầy Cô đã lắng nghe. Em rất mong nhận được những nhận xét, góp ý và câu hỏi từ quý Thầy Cô để đồ án của em được hoàn thiện hơn ạ. Em xin cám ơn!"**

*(Cúi chào, đứng chờ nghe câu hỏi)*
