import dbConnect from '@/lib/mongodb';
import Post from '@/models/Post';
import { NextResponse } from 'next/server';

export async function GET(req, { params }) {
  try {
    await dbConnect();
    const { id } = params;

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
