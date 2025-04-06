// src/index.ts
import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

import protectedRoutes from './routes/protectedRoutes';
import authRoutes from './routes/authRoutes';
import loanRoutes from './routes/loanRoutes';



dotenv.config();

const app = express(); // ✅ Declare this before using it
app.use('/api/loans', loanRoutes);

app.use(express.json());

// ✅ Now use the routes
app.use('/api/auth', authRoutes);
app.use('/api/protected', protectedRoutes);

app.get('/', (req, res) => {
  res.send('Loan Manager API Running');
});

const PORT = process.env.PORT || 5000;

mongoose
  .connect(process.env.MONGO_URI || '', {})
  .then(() => {
    console.log('MongoDB Connected');
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch(err => console.error('DB connection error:', err));
