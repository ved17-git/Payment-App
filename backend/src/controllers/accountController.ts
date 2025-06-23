import { UpdatedRequest } from "../middleware";
import { Response } from "express";
import { Account } from "../models/balanceSchema";
import { User } from "../models/userSchema";

export const CreateAccount=async(req:UpdatedRequest,res:Response)=>{

    const id=req.user?.id
   
    const user=await User.findById({_id:id})

    if(!user){
        res.status(400).json({
            messsge:"User Not found"
        })
        return
    }
    const account=await Account.create({
       userId:user._id,
       balance:1000
    })

}