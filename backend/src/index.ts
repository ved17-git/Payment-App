import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'

import { router } from './routes/route'




const app=express()

app.use(cors())  
app.use(express.json());

app.use('/', router)


const PORT=8000

const dbConnect=async()=>{
const connected=await mongoose.connect("mongodb://localhost:27017/paytm")
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

