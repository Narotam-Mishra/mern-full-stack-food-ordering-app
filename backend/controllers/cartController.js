
import userModel from "../models/userModel.js";


// add items to user's cart
const addToCart = async(req, res) => {
    try {
        let userData = await userModel.findOne({ _id: req.body.userId });
        let cartData = await userData.cartData;
        
        // add first entry of cart data
        if(!cartData[req.body.itemId]){
            cartData[req.body.itemId] = 1
        }else{
            cartData[req.body.itemId] += 1;
        }

        // once cart data is added we will update user's cart data
        await userModel.findByIdAndUpdate(req.body.userId, { cartData });
        res.json({ success: true, message: "Food item added to Cart successfully!!" });
    } catch (error) {
        console.log("Error while adding food item to cart:", error);
        res.json({ success: false, message: "Error while adding food item to cart"});
    }
}


// remove items from user's cart
const removeFromCart = async(req, res) => {

}


// fetch user's cart data
const getCart = async(req, res) => {

}

export { addToCart, removeFromCart, getCart }