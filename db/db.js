import mongoose from "mongoose";

const connectDB = async (req,res)=>{
    const DB_NAME = "Blog"
    try {
        const connectionInstance = await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`);
        console.log(`MongoDB Connected: ${connectionInstance.connection.host}`);

    } catch (error) {
        console.log("db connection failed");
        process.exit(1);
    }
}

export default connectDB;