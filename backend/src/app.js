import dotenv from "dotenv";
dotenv.config();
import express, { urlencoded } from 'express'
import cookieParser from 'cookie-parser'

const app = express()

app.use((req, res, next) => {
    const allowedOrigins = [
        'https://ecommerce-website-self-five.vercel.app',
        'http://localhost:5173',
        process.env.CORS_ORIGIN
    ];
    
    const origin = req.headers.origin;
    if (allowedOrigins.includes(origin)) {
        res.setHeader('Access-Control-Allow-Origin', origin);
    }
    
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, Cookie');
    
    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }
    
    next();
});

app.use(express.json())
app.use(cookieParser())
app.use(express.static('public'))
app.use(urlencoded({extended: true}))

import userRouter from './routes/userRoutes.js'
import adminRouter from './routes/adminRoutes.js'

app.use("/api/v1/users", userRouter)
app.use("/api/v1/admin", adminRouter)

export { app }