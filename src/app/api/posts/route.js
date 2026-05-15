import dbConnect from '@/lib/mongodb';
import Post from '@/models/Post';
import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '../auth/[...nextauth]/route';

export async function GET(req) {
  try {
    await dbConnect();
    
    // Get query parameters
    const { searchParams } = new URL(req.url);
    const type = searchParams.get('type');
    const category = searchParams.get('category');
    const q = searchParams.get('q');

    // Build filter
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

    return NextResponse.json(posts);
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
