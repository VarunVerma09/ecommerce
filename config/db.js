import mongoose  from "mongoose";

const connectDB = async ()=>{
    try {
        const conn = await mongoose.connect(process.env.DB_URL);
        console.log(`Conneted To MongoDB Database ${conn.connection.host}`);
        
        
    } catch (error) {
        console.log(`Error in mongoDB${error}`)
        
    }
}

export default connectDB;