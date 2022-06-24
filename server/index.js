import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';

import userRoutes from './routes/users.js';
import friendsRoutes from './routes/friends.js';
import folderRoutes from './routes/folders.js';


const app = express();

dotenv.config();
app.use(cors());

app.use(bodyParser.json({limit:'30mb',extended:true}))
app.use(bodyParser.urlencoded({limit:'30mb',extended:true}))

app.use('/user', userRoutes);
app.use('/friends', friendsRoutes);
app.use('/folders', folderRoutes);


const PORT = process.env.PORT || 4001;

mongoose.connect(process.env.CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => app.listen(PORT,() => console.log(`Server is running on PORT: ${PORT}`)))
    .catch(() => console.log(error));