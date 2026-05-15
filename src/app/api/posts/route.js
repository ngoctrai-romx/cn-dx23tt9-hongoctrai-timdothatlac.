import dbConnect from '@/lib/mongodb';
import Post from '@/models/Post';
import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '../auth/[...nextauth]/route';

const MOCK_POSTS = [
  { id: "1", title: "Mất ví da màu nâu tại quán cà phê Highlands", type: "lost", category: "Ví / Bóp", categoryId: "vi-bop", locationName: "Quận 1, TP.HCM", date: "2 giờ trước", image: "https://images.unsplash.com/photo-1627123424574-724758594e93?w=400&h=300&fit=crop", authorName: "Nguyễn Văn A", description: "Ví da màu nâu, bên trong có CMND và thẻ ngân hàng Vietcombank." },
  { id: "2", title: "Nhặt được iPhone 15 Pro Max tại công viên Tao Đàn", type: "found", category: "Điện thoại", categoryId: "dien-thoai", locationName: "Quận 3, TP.HCM", date: "5 giờ trước", image: "https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=400&h=300&fit=crop", authorName: "Trần Thị B", description: "iPhone 15 Pro Max màu titan tự nhiên, có ốp lưng trong suốt." },
  { id: "3", title: "Mất chìa khóa xe Honda SH tại bãi giữ xe Vincom", type: "lost", category: "Chìa khóa", categoryId: "chia-khoa", locationName: "Quận Bình Thạnh, TP.HCM", date: "1 ngày trước", image: "https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=400&h=300&fit=crop", authorName: "Lê Văn C", description: "Chìa khóa xe Honda SH 150i, móc khóa hình gấu nâu." },
  { id: "4", title: "Nhặt được CCCD mang tên Phạm Thị Hoa tại trường ĐH Trà Vinh", type: "found", category: "Giấy tờ", categoryId: "giay-to", locationName: "TP. Trà Vinh", date: "1 ngày trước", image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=400&h=300&fit=crop", authorName: "Hồ Ngọc Trai", description: "Căn cước công dân mang tên Phạm Thị Hoa, sinh năm 2003." },
  { id: "5", title: "Mất laptop Dell XPS 13 tại thư viện", type: "lost", category: "Laptop", categoryId: "laptop", locationName: "TP. Trà Vinh", date: "2 ngày trước", image: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=400&h=300&fit=crop", authorName: "Nguyễn Thị D", description: "Laptop Dell XPS 13 màu bạc, có dán sticker mèo ở mặt lưng." },
  { id: "6", title: "Nhặt được mèo tam thể lạc tại khu chung cư", type: "found", category: "Thú cưng", categoryId: "thu-cung", locationName: "Quận 7, TP.HCM", date: "3 ngày trước", image: "https://images.unsplash.com/photo-1574158622682-e40e69881006?w=400&h=300&fit=crop", authorName: "Võ Văn E", description: "Mèo tam thể, khoảng 2-3kg, rất ngoan, đeo vòng cổ xanh." }
];

export async function GET(req) {
  try {
    await dbConnect();
    
    // Get query parameters
    const { searchParams } = new URL(req.url);
    const type = searchParams.get('type');
    const category = searchParams.get('category');
    const q = searchParams.get('q');

    // Build filter for MongoDB
    const filter = { status: 'active' };
    if (type && type !== 'all') filter.type = type;
    if (category) filter.category = category;
    if (q) {
      filter.$or = [
        { title: { $regex: q, $options: 'i' } },
        { description: { $regex: q, $options: 'i' } }
      ];
    }

    const posts = await Post.find(filter).sort({ createdAt: -1 });

    // Filter MOCK_POSTS manually
    let filteredMock = [...MOCK_POSTS];
    if (type && type !== 'all') filteredMock = filteredMock.filter(p => p.type === type);
    if (category) filteredMock = filteredMock.filter(p => p.categoryId === category);
    if (q) {
      const qLower = q.toLowerCase();
      filteredMock = filteredMock.filter(p => 
        p.title.toLowerCase().includes(qLower) || 
        p.description.toLowerCase().includes(qLower)
      );
    }

    // Combine Real Data + Mock Data
    const combinedData = [...posts, ...filteredMock];

    return NextResponse.json(combinedData);
  } catch (error) {
    console.error('Lỗi fetch bài đăng:', error);
    return NextResponse.json({ error: 'Đã xảy ra lỗi hệ thống' }, { status: 500 });
  }
}

export async function POST(req) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    await dbConnect();
    const data = await req.json();

    // Map category to categoryName for display
    const categoryMap = {
      'giay-to': 'Giấy tờ tùy thân',
      'dien-thoai': 'Điện thoại',
      'vi-bop': 'Ví / Bóp',
      'chia-khoa': 'Chìa khóa',
      'thu-cung': 'Thú cưng',
      'khac': 'Khác'
    };
    
    data.categoryName = categoryMap[data.category] || data.category;
    data.author = session.user.id;
    data.authorName = session.user.name;

    const newPost = await Post.create(data);

    return NextResponse.json({ message: 'Đăng tin thành công', post: newPost }, { status: 201 });
  } catch (error) {
    console.error('Lỗi tạo bài đăng:', error);
    return NextResponse.json({ error: 'Đã xảy ra lỗi hệ thống' }, { status: 500 });
  }
}
