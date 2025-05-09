import mongoose from "mongoose"

export const connectDb = async () => {
   try {
      const conn = await mongoose.connect(process.env.MONGO_URL)
      console.log("Mongo connected", conn.connection.name)
   } catch (error) {
      console.log("MongoDb ", error)
   }
}