import mongoose, { Connection } from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI || '';

if (!MONGODB_URI) {
  throw new Error('Please define the MONGODB_URI environment variable inside .env.local');
}

interface CachedMongoose {
  conn: Connection | null;
  promise: Promise<Connection> | null;
}

const cached: CachedMongoose = (global as { mongoose?: CachedMongoose }).mongoose || { conn: null, promise: null };

export async function connectDB(): Promise<Connection> {
  try {
    if (cached.conn) return cached.conn;

    if (!cached.promise) {
      cached.promise = mongoose.connect(MONGODB_URI).then((mongooseInstance) => mongooseInstance.connection);
    }

    cached.conn = await cached.promise;

    console.log('Database connected successfully!');
    return cached.conn;
  } catch (error) {
    console.error('Database connection error:', error);
    throw new Error('Failed to connect to the database');
  }
}
