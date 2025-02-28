const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const cookieParser = require('cookie-parser');
require('dotenv').config();

const authRoutes = require('./routes/userRoutes');

const app = express();
const PORT = process.env.PORT || 4000;
const DATABASE_URL = process.env.DATABASE_URL;

if (!DATABASE_URL) {
  console.error('DATABASE_URL is missing in .env file');
  process.exit(1);
}

// Middleware
app.use(express.json());
app.use(cors());
app.use(cookieParser());

// Connect to MongoDB
mongoose.connect(DATABASE_URL)
  .then(() => {
    console.log('Connected to MongoDB');

    // Start server only after DB is connected
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch(err => console.error('MongoDB connection error:', err));

// Routes
app.use('/api', authRoutes);

// Graceful shutdown for server
process.on('SIGINT', async () => {
  console.log('Shutting down server...');
  await mongoose.connection.close();
  console.log('MongoDB connection closed');
  process.exit(0);
});
