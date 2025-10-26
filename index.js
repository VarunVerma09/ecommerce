import express from 'express'
import dotenv from 'dotenv'
import morgan from 'morgan';
import connectDB from './config/db.js'
import authRoutes from './routes/authRoute.js'
import cors from "cors";
import categoryRoute from "./routes/categoryRoute.js"
import productRoute from "./routes/productRoute.js"
import path from "path"
dotenv.config();
connectDB();


const app= express();


app.use(express.json()); 
app.use(cors());
app.use(morgan('dev'));
app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use(express.static(path.join(__dirname, "./client/dist")))

// routes

app.use("/api/v1/auth",authRoutes)
app.use("/api/v1/category",categoryRoute)
app.use("/api/v1/product",productRoute)




app.use("*", function(req,res){
    res.sendFile(path.join(__dirname,"./client/dist/index.html"))
})

const PORT = 8080;


app.listen(PORT,()=>{console.log
(`Server Running on ${PORT}`);})