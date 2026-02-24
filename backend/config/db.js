import mongoose from 'mongoose';

export async function connectDb() {
  const uri = process.env.MONGODB_URL;
  if (!uri) {
    console.warn('DB env key (MONGODB_URL) missing – skipping connect');
    return;
  }
  await mongoose.connect(uri);
}
