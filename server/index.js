import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';

import userRoutes from './routes/users.js';


const app = express();

dotenv.config();
app.use(cors());

app.use('/user', userRoutes);

const PORT = process.env.PORT || 4001;

mongoose.connect(process.env.CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => app.listen(PORT,() => console.log(`Server is running on PORT: ${PORT}`)))
    .catch(() => console.log(error));