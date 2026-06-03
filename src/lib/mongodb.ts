import mongoose from "mongoose";

 const MONGO_URI = process.env.MONGO_URI!;

 if(!MONGO_URI){
  throw new Error("There aren't enviorement variable")
 }

export async function connectDB() {

  try {
   
     
    await mongoose.connect(MONGO_URI);

    console.log("MongoDB connected");
  } catch (error) {
    console.error(error)
    throw error
  }
}