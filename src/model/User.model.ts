import mongoose, { Schema, Document } from "mongoose";

export interface Message extends Document {
  content: string;
  createdAt: Date;
}

const MessageSchema: Schema<Message> = new Schema({
  content: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    required: true,
    default: Date.now,
  },
});

export interface User extends Document {
  username: string;
  email: string;
  password: string;
  verifyCode: string;
  verifyCodeExpiry: Date;
  isVerify: boolean;
  isAcceptingMessages: boolean;
  message: Message[];
}

const UserSchema: Schema<User> = new Schema({
  username: {
    type: String,
    required: true,
    trim: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    match: [/.+@.+\..+/, "Please fill a valid email address"],
  },
  password: {
    type: String,
    required: true,
  },
  verifyCode: {
    type: String,
    required: true,
  },
  verifyCodeExpiry: {
    type: Date,
    required: true,
  },
  isVerify: {
    type: Boolean,
    default: false,
  },
  isAcceptingMessages: {
    type: Boolean,
    required: true,
    default: true,
  },
  message: {
    type: [MessageSchema],
  },
});

// In Next.js (or other serverless/hot-reloading environments), the code can run multiple times.
// Mongoose throws an "OverwriteModelError" if we try to compile the same model more than once.
// To prevent this, we check if the model is already compiled (exists in mongoose.models).
// If it exists, we reuse it; otherwise, we compile a new one.

const UserModel =
  (mongoose.models.User as mongoose.Model<User>) ||
  mongoose.model<User>("User", UserSchema);

export default UserModel;
