
import expess from "express"
import cors from "cors"
import express from "express";
import evar from 'dotenv';

// configure environment variables
evar.config();

// app config
const app = express()

const portNo = process.env.PORT || 5874;

// middleware
app.use(expess.json())
app.use(cors())

app.get("/", (req, res) => {
    res.send("API Working")
})

app.listen(portNo, () => {
    console.log(`Server started on port: ${portNo}`);
})

