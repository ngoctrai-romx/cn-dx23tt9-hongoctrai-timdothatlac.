import mongoose from 'mongoose';

const PostSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Vui lòng nhập tiêu đề'],
  },
  type: {
    type: String,
    enum: ['lost', 'found'],
    required: [true, 'Vui lòng chọn loại bài viết'],
  },
  category: {
    type: String,
    required: [true, 'Vui lòng chọn danh mục'],
  },
  categoryName: {
    type: String,
  },
  description: {
    type: String,
    required: [true, 'Vui lòng nhập mô tả chi tiết'],
  },
  date: {
    type: String,
    required: [true, 'Vui lòng nhập thời gian'],
  },
  locationName: {
    type: String,
    default: 'Chưa xác định'
  },
  location: {
    lat: { type: Number, required: true },
    lng: { type: Number, required: true }
  },
  image: {
    type: String,
    default: 'https://via.placeholder.com/400x300?text=Khong+co+anh'
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  authorName: {
    type: String,
    required: true
  },
  status: {
    type: String,
    enum: ['active', 'resolved'],
    default: 'active'
  }
}, { timestamps: true });

export default mongoose.models.Post || mongoose.model('Post', PostSchema);
