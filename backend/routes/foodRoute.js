
import express from 'express'
import { addFood } from '../controllers/foodController.js'
import multer from 'multer'

const foodRouter = express.Router();

// Image storage Engine (using multer)
const storage = multer.diskStorage({
    destination: "uploads", 
    filename: (req, file, cb) => {
        return cb(null, `${Date.now()}`)
    }
})

foodRouter.post("/add", addFood)


export default foodRouter;