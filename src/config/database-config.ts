import mongoose from 'mongoose';

class DatabaseConnection {
  private mongoURI: string = process.env.uri || '';

  public async connect(): Promise<void> {
    try {
      await mongoose.connect(this.mongoURI);
      console.log('MongoDB connection established');
    } catch (error) {
      console.error('Failed to connect to MongoDB', error);
      throw new Error('Database connection failed');
    }
  }
}

export default DatabaseConnection;
