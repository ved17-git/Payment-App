import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import dotenv from "dotenv";
import { router } from './routes/route'

dotenv.config();
const app=express()

app.use(cors())  
app.use(express.json());

app.use('/', router)


const PORT=process.env.PORT

const dbConnect=async()=>{
const connected=await mongoose.connect(process.env.MONG0DB_URL as string)
try {
    if(connected){
    console.log("connected to db")
}
} catch (error) {
    console.log("error in db connection");
    console.log(error);
}
}

dbConnect()

app.listen(PORT,()=>{
    console.log(`listening on ${PORT}`);
})

