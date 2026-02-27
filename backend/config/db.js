import mongoose from 'mongoose';

export async function connectDb() {
  const uri = process.env.DB_URI;

  if (!uri) {
    console.warn('DB_URI missing, skipping DB connect for now');
    return;
  }

  await mongoose.connect(uri);
}
