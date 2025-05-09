import User from "../models/user.js";
import jwt from "jsonwebtoken";

export const authMiddleware = async (req, res, next) => {

   try {
      const token = req.cookies.jwt //|| req.headers.authorization.split(" ")[1];
      //console.log("Token in authMiddleware",token);
      if(!token){
         return res.status(401).json({message: "Unauthorized"});
      }

   const decoded = jwt.verify(token, process.env.JWT_SECRET)

   //console.log("Decoded token in authMiddleware",decoded);

   if(!decoded){
      return res.status(401).json({message: "Unauthorized"});
   }

   const user = await User.findById(decoded.userId).select("-password");

   //console.log("User in authMiddleware",user);

   if(!user){
      return res.status(401).json({message: "Unauthorized"});
   }

   req.user = user;
   next();
   } catch (error) {
      console.error("Error in authMiddleware",error);
      return res.status(401).json({message: "Unauthorized"});   
   }
}