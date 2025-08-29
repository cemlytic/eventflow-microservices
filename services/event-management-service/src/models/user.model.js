import mongoose from 'mongoose';

const userSchema = mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      minlength: 6,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: { type: String, required: true, minlength: 6 },
    role: {
      type: String,
      enum: ['user', 'event_creator', 'admin'],
      default: 'user',
    },
  },
  {
    timestamps: true,
  }
);

export const User = mongoose.model('User', userSchema);
