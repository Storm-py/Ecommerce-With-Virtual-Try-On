import dotenv from "dotenv";

dotenv.config();
import express, { urlencoded } from 'express'
import cookieParser from 'cookie-parser'
import cors from "cors";

const allowedOrigins = [
  "https://ecommerce-website-self-five.vercel.app",
  "http://localhost:3000"
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.options("*", cors());


const app = express()



app.use(express.json())
app.use(cookieParser())
app.use(express.static('public'))
app.use(urlencoded({extended:true}))


import userRouter from './routes/userRoutes.js'
import adminRouter from './routes/adminRoutes.js'

app.use("/api/v1/users",userRouter)
app.use("/api/v1/admin",adminRouter)




export {app}