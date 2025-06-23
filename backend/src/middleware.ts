import { Request,Response,NextFunction } from "express"
import jwt from 'jsonwebtoken'

type jwtPayload={
 id:string
 iat?:number
}

export interface UpdatedRequest extends Request{
 user?:jwtPayload
}



export const middleware=(req:UpdatedRequest,res:Response,next:NextFunction):void=>{

    const authHeader=req.headers.authorization
    

    if(!authHeader || !authHeader.startsWith('Bearer ')){
         res.json({
            message:"Token not found"
        })
        return
    }

    const token=authHeader.split(' ')[1]



  try {
  const decoded = jwt.verify(token, "secret") as { id: string };
 
  req.user=decoded 
  
  
  next()
     
  } catch (err) {
    res.status(403).json({ message: "Invalid token" });
    return;
  }

}