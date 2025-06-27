import connectDB from './db/index.js'
import dotenv from 'dotenv'
import { app } from './app.js'


dotenv.config({
    path:'./.env'
})

connectDB()
.then(()=>{
    app.listen(3000,()=>{
        console.log("Your server is working on port 4000")
    })
})
.catch((error)=>{
    console.log("MongoDb connection Failed",error)
})


































// import dotenv from 'dotenv'
// import connectDB from './db/index.js'
// import { app } from './app.js'

// dotenv.config({
//     path:'./.env'
// })

// connectDB()
// .then(()=>{
//     app.listen(process.env.PORT || 8000,()=>{
//         console.log("Server is running at port ", process.env.PORT)
//     })
// }
// )
// .catch((err)=>{
//     console.log('mongoDb connection failed ',err)
// })
