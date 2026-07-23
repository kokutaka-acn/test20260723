import mongoose from 'mongoose';
import { createApp } from './app.js';

const app = createApp();
const port = Number(process.env.PORT || 8000);

mongoose.connect(process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/octofit_db')
  .then(() => {
    console.log('MongoDB connected');
    app.listen(port, '0.0.0.0', () => {
      console.log(`Backend running on port ${port}`);
    });
  })
  .catch((error) => {
    console.error('MongoDB connection failed', error);
    process.exit(1);
  });
