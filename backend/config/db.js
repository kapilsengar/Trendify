import mongoose from 'mongoose';

const connectDb = async ()=>{
    try {
        await mongoose.connect(process.env.MONGO_URL)
        console.log("Database Connected")
    } catch (error) {
        console.log("Database Error")
    }
}

export default connectDb