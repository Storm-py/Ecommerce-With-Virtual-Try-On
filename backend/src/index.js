import connectDB from './db/index.js'
import dotenv from 'dotenv'
import { app } from './app.js'


dotenv.config({
    path:'./.env'
})

connectDB()
.then(()=>{
    app.listen(4000,()=>{
        console.log("Your server is working on port 4000")
    })
})
.catch((error)=>{
    console.log("MongoDb connection Failed",error)
})
