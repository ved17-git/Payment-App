import { UpdatedRequest } from "../middleware";
import { Response } from "express";
import { Account } from "../models/balanceSchema";
import { User } from "../models/userSchema";
import mongoose from "mongoose";

    export const transferFunds=async(req:UpdatedRequest,res:Response):Promise<void>=>{

    const session =await mongoose.startSession()
    session.startTransaction()
   //Better way when doing a payment transfer=>multiple operations either all succeed or all fail — this is called atomicity.

    const {amount, email}=req.body
    const id=req.user?.id


        try {
        await session.commitTransaction()
        const sender=await Account.findOne({
            userId:id
        })

        if(!sender){
            await session.abortTransaction();
            res.status(400).json({
            message:"Sender not found"
            })
            return
        }

        if(sender.balance<amount){
        await session.abortTransaction();
        res.status(400).json({
        message:"Insuffucient balance"
        })
        return
    }
   
    await session.commitTransaction()
    const reciever=await User.findOne({
        email:email
    })
    

    if(!reciever){
        await session.abortTransaction();
        res.status(400).json({
            message:"Reciever not found"
        })
        return 
        
    }
    await session.commitTransaction()
    const toAccount=await Account.findOne({
        userId:reciever._id
    })

    if(!toAccount){        
        await session.abortTransaction();
        res.status(400).json({
            message:"Reciever Account not found"
        })
        return 
    }

    await session.commitTransaction()
    await Account.updateOne({
        _id:sender._id
    }, {$inc :{balance:-amount}})

    await Account.updateOne({
        _id:toAccount._id
    }, {$inc :{balance:amount}} )
    

   await session.endSession();
  res.status(200).json({
    message: "Transaction successful",
    senderId: sender.userId,
    receiverId: toAccount.userId,
    amount: amount
  });
            
        } catch (error) {
            console.log("transfer fund error");
            console.log(error);
        }
     
}

export const getCurrentUserBalance=async(req:UpdatedRequest,res:Response):Promise<void>=>{
  
    const id=req.user?.id

const balance = await Account.findOne({ userId: id })

    if(!balance){
        res.status(400).json({
            message:"Balance not found"
        })
        return
    }else{
    res.status(200).json({
    message: "Balance Found",
    balance,
  });
      return
    }
}