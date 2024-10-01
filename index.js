const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv').config();
const cookieParser = require('cookie-parser');
const PORT=process.env.PORT || 4000;
const DATABASE_URL=process.env.DATABASE_URL;
const authRoutes=require('./routes/userRoutes');

app.use(express.json());
app.use(cors());
app.use(cookieParser());

mongoose.connect(DATABASE_URL, { useUnifiedTopology: true });


const db=mongoose.connection;

db.on('close',(error)=>{
    console.log(error);
});

db.once('open',()=>{
    console.log('Connected to MongoDB');
});

app.use('/api',authRoutes);

app.listen(PORT, () => {
    console.log(PORT)
});
