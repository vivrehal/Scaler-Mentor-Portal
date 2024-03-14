import express from 'express';
import router from './routes.js';
import DbConnection from './database.js';   
import dotenv from 'dotenv';
import cors from 'cors';

const app = express();

app.use(express.json());
app.use(router);

const corsOption = {
    origin: process.env.CORS_ORIGIN,
    credentials: true,
}

dotenv.config();   
app.use(cors(corsOption));

const PORT = process.env.PORT || 5000;

app.listen(PORT, ()=>{
    DbConnection();
    console.log(`Listening on port ${process.env.PORT || 5000}`);
})