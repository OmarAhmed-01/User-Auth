import mongoose from "mongoose";

const connectDB = async() => {
    try {
        await mongoose.connect("mongodb+srv://omarahmedm:tQQVFjRdXvSPb0w4@user-auth.iejyo4u.mongodb.net/?retryWrites=true&w=majority&appName=user-auth");
        console.log("Connected to Database");
    } catch (error) {
        console.log(error);
        process.exit(1);
    }
} 
export default connectDB;