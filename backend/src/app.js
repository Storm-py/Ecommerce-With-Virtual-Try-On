import dotenv from "dotenv";

dotenv.config();
import express, { urlencoded } from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'

const app = express()

app.use(cors({
    origin: (origin, callback) => {
        callback(null, origin)
    },
    credentials: true
}))


app.use(express.json())
app.use(cookieParser())
app.use(express.static('public'))
app.use(urlencoded({extended:true}))


import userRouter from './routes/userRoutes.js'
import adminRouter from './routes/adminRoutes.js'

app.use("/api/v1/users",userRouter)
app.use("/api/v1/admin",adminRouter)




export {app}