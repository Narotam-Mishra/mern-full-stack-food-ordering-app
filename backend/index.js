
import expess from "express"
import cors from "cors"
import express from "express";
import evar from 'dotenv';
import { connectDB } from "./config/db.js";
import foodRouter from "./routes/foodRoute.js";

// configure environment variables
evar.config();

// app config
const app = express()

const portNo = process.env.PORT || 5874;

// middleware
app.use(expess.json())
app.use(cors())

// DB Connection
connectDB();

// api endpoints
app.use("/api/food", foodRouter)
app.use("/images", expess.static('uploads'))

app.get("/", (req, res) => {
    res.send("API Working")
})

app.listen(portNo, () => {
    console.log(`Server started on port: ${portNo}`);
})


