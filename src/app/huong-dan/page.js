"use client";
import { useState } from "react";

const FAQS = [
  {
    question: "Làm thế nào để tôi đăng tin mất đồ?",
    answer: "Rất đơn giản, bạn chỉ cần bấm vào nút 'Đăng tin' trên thanh menu. Chọn tab 'Bị mất đồ', điền đầy đủ thông tin mô tả, chọn vị trí mất trên bản đồ và tải hình ảnh lên (nếu có). Cuối cùng bấm 'Đăng tin ngay'."
  },
  {
    question: "Tôi nhặt được đồ thì làm sao để trả lại người mất?",
    answer: "Tương tự như đăng tin mất đồ, bạn vào phần 'Đăng tin' và chọn tab 'Nhặt được đồ'. Hãy mô tả ngắn gọn và che đi một số thông tin quan trọng (ví dụ: che bớt số CMND/CCCD) để yêu cầu người nhận phải xác minh đúng đồ của mình."
  },
  {
    question: "Việc sử dụng website có mất phí không?",
    answer: "Không, TimDo.vn là một dự án phi lợi nhuận dành cho cộng đồng sinh viên và người dân. Tất cả các tính năng đăng tin, tìm kiếm và liên hệ đều hoàn toàn miễn phí."
  },
  {
    question: "Làm sao để tôi tránh bị lừa đảo khi nhận lại đồ?",
    answer: "Khi có người liên hệ nói rằng họ đã nhặt được đồ của bạn, HÃY CẨN THẬN: Yêu cầu họ cung cấp đặc điểm nhận dạng bí mật mà chỉ bạn biết. Tuyệt đối KHÔNG CHUYỂN TIỀN chuộc trước dưới bất kỳ hình thức nào. Nên hẹn gặp ở những nơi công cộng, đông người (như quán cà phê, cổng trường, trụ sở công an) để nhận lại đồ."
  }
];

export default function HuongDanPage() {
  const [openFaq, setOpenFaq] = useState(0);

  return (
    <div className="guide-page" style={{ paddingTop: "120px", paddingBottom: "80px" }}>
      <div className="container" style={{ maxWidth: "800px" }}>
        
        <div className="page-header" style={{ textAlign: "center", marginBottom: "50px" }}>
          <div style={{ fontSize: "3rem", marginBottom: "16px" }}>📖</div>
          <h1 style={{ fontSize: "2.5rem", fontWeight: "800", marginBottom: "16px" }}>Hướng dẫn sử dụng</h1>
          <p style={{ color: "var(--text-secondary)", fontSize: "1.1rem", lineHeight: "1.6" }}>
            TimDo.vn được thiết kế để giúp bạn dễ dàng tìm lại đồ vật thất lạc hoặc trả lại đồ nhặt được cho đúng người. Hãy làm theo các bước dưới đây!
          </p>
        </div>

        {/* CÁC BƯỚC HƯỚNG DẪN */}
        <div className="guide-steps">
          <div className="guide-step card">
            <div className="step-number">01</div>
            <div className="step-content">
              <h3>Đăng ký tài khoản (Tùy chọn nhưng khuyến khích)</h3>
              <p>Mặc dù bạn có thể xem tin mà không cần đăng nhập, nhưng để Đăng tin mới và quản lý tin của mình, bạn cần có một tài khoản.</p>
              <ul>
                <li>Bấm vào "Đăng ký" góc trên bên phải.</li>
                <li>Điền tên, số điện thoại và email của bạn. Số điện thoại sẽ giúp người khác dễ dàng liên lạc với bạn hơn.</li>
              </ul>
            </div>
          </div>

          <div className="guide-step card">
            <div className="step-number">02</div>
            <div className="step-content">
              <h3>Sử dụng tính năng Tìm kiếm</h3>
              <p>Nếu bạn mất đồ, đừng vội đăng tin ngay. Hãy thử tìm kiếm xem có ai đã nhặt được chưa nhé!</p>
              <ul>
                <li>Gõ tên đồ vật vào thanh tìm kiếm ở Trang chủ (Ví dụ: "chìa khóa xe", "ví da nâu").</li>
                <li>Sử dụng Bộ lọc trên trang "Tin đăng" để lọc riêng các tin "Nhặt được đồ".</li>
                <li>Bấm vào tin đăng để xem chi tiết thông tin liên hệ của người nhặt.</li>
              </ul>
            </div>
          </div>

          <div className="guide-step card">
            <div className="step-number">03</div>
            <div className="step-content">
              <h3>Đăng tin hiệu quả</h3>
              <p>Để tin đăng của bạn thu hút sự chú ý và dễ dàng tìm lại đồ, hãy nhớ quy tắc "3R": Rõ ràng - Rành mạch - Rực rỡ (Hình ảnh).</p>
              <ul>
                <li><strong>Tiêu đề ngắn gọn:</strong> Bao gồm tên đồ vật + địa điểm (Ví dụ: Rơi ví tại khuôn viên khu B).</li>
                <li><strong>Ghim đúng bản đồ:</strong> Hãy phóng to bản đồ và thả ghim chính xác nơi bạn nghi ngờ làm rớt/nhặt được. Việc này giúp mọi người dễ khoanh vùng tìm kiếm.</li>
                <li><strong>Hình ảnh (Quan trọng):</strong> Một bức ảnh bằng ngàn lời nói. Nếu nhặt được đồ, hãy chụp ảnh lại (nhưng che đi thông tin nhạy cảm).</li>
              </ul>
            </div>
          </div>
        </div>

        {/* CẨN THẬN LỪA ĐẢO */}
        <div className="warning-box card">
          <div className="warning-icon">⚠️</div>
          <div className="warning-text">
            <h4>Cảnh báo an toàn & Chống lừa đảo</h4>
            <p>Tuyệt đối <strong>KHÔNG CHUYỂN TIỀN</strong> thẻ cào, tiền công chuộc đồ trước khi trực tiếp nhận lại và xác minh đúng tài sản của mình. Mọi giao dịch nhận đồ nên diễn ra tại nơi công cộng, đông người vào ban ngày.</p>
          </div>
        </div>

        {/* FAQ SECTION */}
        <div className="faq-section" style={{ marginTop: "60px" }}>
          <h2 style={{ fontSize: "1.8rem", marginBottom: "30px", textAlign: "center" }}>Câu hỏi thường gặp</h2>
          
          <div className="faq-list">
            {FAQS.map((faq, index) => (
              <div 
                key={index} 
                className={`faq-item card ${openFaq === index ? "active" : ""}`}
                onClick={() => setOpenFaq(openFaq === index ? null : index)}
              >
                <div className="faq-question">
                  <h4>{faq.question}</h4>
                  <span className="faq-toggle">{openFaq === index ? "−" : "+"}</span>
                </div>
                {openFaq === index && (
                  <div className="faq-answer">
                    <p>{faq.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

      </div>

      <style jsx>{`
        .guide-steps {
          display: flex;
          flex-direction: column;
          gap: 24px;
          margin-bottom: 40px;
        }

        .guide-step {
          display: flex;
          padding: 30px;
          gap: 24px;
        }

        .step-number {
          flex-shrink: 0;
          width: 60px;
          height: 60px;
          background: var(--primary-bg);
          color: var(--primary-light);
          font-size: 1.5rem;
          font-weight: 800;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 50%;
          border: 2px solid var(--primary);
        }

        .step-content h3 {
          font-size: 1.25rem;
          margin-bottom: 12px;
          color: var(--text-primary);
        }

        .step-content p {
          color: var(--text-secondary);
          margin-bottom: 16px;
          line-height: 1.6;
        }

        .step-content ul {
          padding-left: 20px;
          color: var(--text-secondary);
        }

        .step-content li {
          margin-bottom: 8px;
          line-height: 1.5;
        }

        .step-content li strong {
          color: var(--text-primary);
        }

        /* Warning Box */
        .warning-box {
          display: flex;
          align-items: flex-start;
          gap: 20px;
          padding: 24px;
          background: var(--accent-red-bg);
          border-color: rgba(239, 68, 68, 0.3);
        }

        .warning-icon {
          font-size: 2.5rem;
        }

        .warning-text h4 {
          color: #fca5a5;
          font-size: 1.1rem;
          margin-bottom: 8px;
        }

        .warning-text p {
          color: #fecaca;
          line-height: 1.6;
          font-size: 0.95rem;
        }

        /* FAQ Section */
        .faq-item {
          margin-bottom: 16px;
          cursor: pointer;
          transition: all var(--transition-fast);
        }

        .faq-item:hover {
          border-color: var(--border-hover);
        }

        .faq-item.active {
          border-color: var(--primary);
          box-shadow: var(--shadow-glow);
        }

        .faq-question {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 20px 24px;
        }

        .faq-question h4 {
          font-size: 1.05rem;
          font-weight: 600;
          margin: 0;
        }

        .faq-toggle {
          font-size: 1.5rem;
          font-weight: 300;
          color: var(--text-muted);
        }

        .faq-answer {
          padding: 0 24px 24px;
          color: var(--text-secondary);
          line-height: 1.6;
          border-top: 1px solid transparent;
          animation: fadeIn 0.3s ease;
        }

        @media (max-width: 768px) {
          .guide-step {
            flex-direction: column;
            gap: 16px;
            padding: 24px;
          }
          .warning-box {
            flex-direction: column;
            align-items: center;
            text-align: center;
          }
        }
      `}</style>
    </div>
  );
}
