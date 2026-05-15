import dbConnect from '@/lib/mongodb';
import Post from '@/models/Post';
import { NextResponse } from 'next/server';

const MOCK_POSTS = [
  { id: "1", title: "Mất ví da màu nâu tại quán cà phê Highlands", type: "lost", category: "Ví / Bóp", locationName: "Quận 1, TP.HCM", date: "2 giờ trước", image: "https://images.unsplash.com/photo-1627123424574-724758594e93?w=400&h=300&fit=crop", authorName: "Nguyễn Văn A", description: "Ví da màu nâu, bên trong có CMND và thẻ ngân hàng Vietcombank." },
  { id: "2", title: "Nhặt được iPhone 15 Pro Max tại công viên Tao Đàn", type: "found", category: "Điện thoại", locationName: "Quận 3, TP.HCM", date: "5 giờ trước", image: "https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=400&h=300&fit=crop", authorName: "Trần Thị B", description: "iPhone 15 Pro Max màu titan tự nhiên, có ốp lưng trong suốt." },
  { id: "3", title: "Mất chìa khóa xe Honda SH tại bãi giữ xe Vincom", type: "lost", category: "Chìa khóa", locationName: "Quận Bình Thạnh, TP.HCM", date: "1 ngày trước", image: "https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=400&h=300&fit=crop", authorName: "Lê Văn C", description: "Chìa khóa xe Honda SH 150i, móc khóa hình gấu nâu." },
  { id: "4", title: "Nhặt được CCCD mang tên Phạm Thị Hoa tại trường ĐH Trà Vinh", type: "found", category: "Giấy tờ", locationName: "TP. Trà Vinh", date: "1 ngày trước", image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=400&h=300&fit=crop", authorName: "Hồ Ngọc Trai", description: "Căn cước công dân mang tên Phạm Thị Hoa, sinh năm 2003." },
  { id: "5", title: "Mất laptop Dell XPS 13 tại thư viện", type: "lost", category: "Laptop", locationName: "TP. Trà Vinh", date: "2 ngày trước", image: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=400&h=300&fit=crop", authorName: "Nguyễn Thị D", description: "Laptop Dell XPS 13 màu bạc, có dán sticker mèo ở mặt lưng." },
  { id: "6", title: "Nhặt được mèo tam thể lạc tại khu chung cư", type: "found", category: "Thú cưng", locationName: "Quận 7, TP.HCM", date: "3 ngày trước", image: "https://images.unsplash.com/photo-1574158622682-e40e69881006?w=400&h=300&fit=crop", authorName: "Võ Văn E", description: "Mèo tam thể, khoảng 2-3kg, rất ngoan, đeo vòng cổ xanh." }
];

export async function GET(req, { params }) {
  try {
    const { id } = params;

    // Trả về dữ liệu mẫu nếu ID là chuỗi ngắn (1, 2, 3...)
    if (id.length < 10) {
      const mockPost = MOCK_POSTS.find(p => p.id === id);
      if (mockPost) return NextResponse.json(mockPost);
    }

    await dbConnect();
    const post = await Post.findById(id).populate('author', 'name email phone');
    if (!post) {
      return NextResponse.json({ error: 'Không tìm thấy bài đăng' }, { status: 404 });
    }

    return NextResponse.json(post);
  } catch (error) {
    console.error('Lỗi fetch chi tiết bài đăng:', error);
    return NextResponse.json({ error: 'Đã xảy ra lỗi hệ thống' }, { status: 500 });
  }
}
