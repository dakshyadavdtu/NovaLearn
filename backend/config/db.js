import mongoose from 'mongoose';

export async function connectDb() {
  const uri = process.env.MONGO_URL;
  if (!uri) {
    console.warn('DB env key (MONGO_URL) missing – skipping connect');
    return;
  }
  await mongoose.connect(uri);
  console.log('MongoDB connected');
}
