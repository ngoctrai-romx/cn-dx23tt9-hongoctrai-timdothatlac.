import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Vui lòng nhập họ tên'],
  },
  phone: {
    type: String,
    required: [true, 'Vui lòng nhập số điện thoại'],
  },
  email: {
    type: String,
    required: [true, 'Vui lòng nhập email'],
    unique: true,
  },
  password: {
    type: String,
    required: [true, 'Vui lòng nhập mật khẩu'],
  },
}, { timestamps: true });

export default mongoose.models.User || mongoose.model('User', UserSchema);
