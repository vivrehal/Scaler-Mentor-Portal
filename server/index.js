import dotenv from 'dotenv';
dotenv.config();   

// call the express library
import express from 'express';
const app = express();

// get the port to run the server on
const PORT = process.env.PORT || 5000;

// register all the routes
import router from './routes.js';

import cors from 'cors';

const corsOption = {
    origin: process.env.CORS_ORIGIN,
    credentials: true,
}

app.use(cors(corsOption));

// Database Connection
import DbConnection from './database.js';   
import marksheet from './templates/marksheet.js';
DbConnection();

// Using methods
app.use(express.json());
app.use(router);



// Listening requests on server
app.listen(PORT, ()=>{
    console.log(`Listening on port ${PORT}`);
})