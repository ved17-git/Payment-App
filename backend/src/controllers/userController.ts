import { User } from "../models/userSchema";
import { Request,Response } from "express";
import jwt from 'jsonwebtoken'
import { UpdatedRequest } from "../middleware";
import { Account } from "../models/balanceSchema";
import bcrypt from 'bcrypt'





export const signUp = async (req: Request, res: Response): Promise<void> => {
  const { firstName, lastName, email, password } = req.body;

  if (!firstName || !lastName || !email || !password) {
    res.status(400).json({ message: "Invalid or missing details" });
    return;
  }

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      res.status(400).json({ message: "Email already registered" });
      return;
    }

    const hashedPassword=await bcrypt.hash(password,10)
    

    const newUser = await User.create({
      firstName,
      lastName,
      email,
      password:hashedPassword
    });

      const account=await Account.create({
          userId:newUser._id,
          balance:Math.floor(Math.random() * 10000),
        })

    const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET as string, {
      expiresIn: "2h"
    });

    res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
    });

    res.status(201).json({
      message: "New user created",
      token,
      user:{
        firstName:newUser.firstName,
        lastName:newUser.lastName,
        email:newUser.email
      },
      account
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error during sign-up" });
  }
};



export const login=async (req:Request,res:Response):Promise<void>=>{

const {email, password}=req.body

if(!email || !password){
    res.json({
        message:"Invalid or missing details"
    })
    return
}


const existingUser=await User.findOne({
    email:email
})

if(existingUser){
const check=await bcrypt.compare(password, existingUser?.password)

if(check){
    const token=jwt.sign({id:existingUser?._id}, process.env.JWT_SECRET as string, {expiresIn:'2h'})
    res.cookie('token', token)
     res.json({
        message:"Logged In",
        token:token,
        firstName:existingUser?.firstName,
        lastName:existingUser?.lastName,
        email:existingUser?.email,
    })
    
    return
}
}
else{
    res.json({
        message:"Cannot find the user please signUp"
    })
}
return


}



export const logout=async (req:Request,res:Response):Promise<void>=>{

    res.clearCookie('token', {
        httpOnly: true,
        secure: true, 
    });
    
    res.json({
        message:"logged out"
    })
    return
}


export const getUserById=async(req:UpdatedRequest,res:Response):Promise<void>=>{
     
    const id=req.user?.id

    const user=await User.findOne({
      _id:id
    })
    const balance=await Account.findOne({
      userId:id
    })

    if(user){
       res.status(200).json({
             firstName:user.firstName,
            lastName:user.lastName,
            email:user.email,
            balance
        })
        return
    }else{
      res.status(400).json({
            message:"user not found"
        })
        return
    }
 
}



export const updateUser=async(req:UpdatedRequest,res:Response):Promise<void>=>{

    if (!req.user?.id) {
    res.status(401).json({ message: "Unauthorized" });
    return;
  }
     
    const id = req.user.id;

    const {firstName, lastName, email}=req.body  

    const user=await User.findByIdAndUpdate(id,{
        firstName,
        lastName,
        email,
    },{new:true})

    if(user){
       res.status(200).json({
            firstName:user.firstName,
            lastName:user.lastName,
            email:user.email
        })
        return
    }else{
      res.status(400).json({
            message:"user not found"
        })
        return
    }
 
}

export const getAllUsers = async (req: UpdatedRequest, res: Response):Promise<void> => {
  if (!req.user?.id) {
    res.status(401).json({ message: "Unauthorized, Token Needed" });
    return;
  }

  const id = req.user.id;

  try {
    const currentUser = await User.findById(id);
    if (!currentUser) {
       res.status(404).json({ message: "User not found" });
       return
    }

    const allUsers = await User.find({ _id: { $ne: id } });

    res.status(200).json({ users: allUsers });
    return
  } catch (err) {
    console.error("Error fetching users:", err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};



