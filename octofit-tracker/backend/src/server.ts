import express from 'express';
import mongoose from 'mongoose';

const app = express();
const port = Number(process.env.PORT || 8000);

app.use(express.json());
app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok' });
});

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
