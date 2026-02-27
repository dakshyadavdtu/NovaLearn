import mongoose from 'mongoose';

export async function connectDb() {
  const uri = process.env.MONGO_URL;

  if (!uri) {
    console.warn('DB env key (MONGO_URL) missing – skipping DB connect for now');
    return;
  }

  await mongoose.connect(uri);
  console.log('Connected to MongoDB');
}
