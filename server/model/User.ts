import mongoose, { Document, Schema } from 'mongoose';

export interface UserDocument extends Document {
  username: string;
  password: string;
}

const userSchema = new Schema<UserDocument>({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true }
});

userSchema.set('autoIndex', true);

export default mongoose.model<UserDocument>('User', userSchema);
