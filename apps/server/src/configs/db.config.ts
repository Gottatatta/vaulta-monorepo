import mongoose from 'mongoose';
import { Env } from './env.config';
import { logger } from '../utils/logger.utils';

const connectDatabase = async () => {
  try {
    await mongoose.connect(Env.DATABASE_URL);
    logger.info('Connected to database');
  } catch (error) {
    logger.error('Error connecting to database', error);
    process.exit(1);
  }
};

const disconnectDatabase = async () => {
  try {
    await mongoose.disconnect();
    logger.info('Disconnected from database');
  } catch (error) {
    logger.error('Error disconnecting from database', error);
    process.exit(1);
  }
};

export { connectDatabase, disconnectDatabase };
