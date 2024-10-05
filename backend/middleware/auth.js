
import jwt from "jsonwebtoken"

const authMiddleware = async(req, res, next) => {
    const { token } = req.headers;
    if(!token){
        res.json({ success: false, message: "Not Authorized to access, Please login Again!!" });
    }
    try {
        const token_decode = jwt.verify(token, process.env.JWT_SECRET);
        req.body.userId = token_decode.id;
        next();
    } catch (error) {
        console.log("Error while authentication:", error);
        res.json({ success: false, message: "Error while authentication" });
    }
}

export default authMiddleware;