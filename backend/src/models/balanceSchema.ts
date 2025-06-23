import mongoose, { Schema } from "mongoose";

const balanceSchema=new mongoose.Schema({
    userId:{
      type:mongoose.Schema.Types.ObjectId,
      ref:'User'
    },
    balance:{
        type:Number,
        required:true
    }
})

export const Account=mongoose.model('Account', balanceSchema)