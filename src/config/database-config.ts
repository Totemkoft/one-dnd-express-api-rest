import mongoose from 'mongoose';
import Logger from './logger';

class DatabaseConnection {
  private mongoURI: string = process.env.MONGO_URI || '';

  public async connect(): Promise<void> {
    try {
      await mongoose.connect(this.mongoURI);
      Logger.info('MongoDB connection established');
    } catch (error) {
      Logger.error('Failed to connect to MongoDB', error);
      throw new Error('Database connection failed');
    }
  }
}

export default DatabaseConnection;
