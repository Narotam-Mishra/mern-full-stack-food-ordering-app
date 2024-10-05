
import userModel from "../models/userModel.js";


// add items to user's cart
const addToCart = async(req, res) => {
    try {
        // let userData = await userModel.findOne({ _id: req.body.userId });
        let userData = await userModel.findById(req.body.userId);
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
    try {
        let userData = await userModel.findById(req.body.userId);
        let cartData = await userData.cartData;

        if(cartData[req.body.itemId] > 0){
            cartData[req.body.itemId] -= 1;
        }

        // update cart data
        await userModel.findByIdAndUpdate(req.body.userId, { cartData });
        res.json({ success: true, message: "Removed from cart successfully!!"});
    } catch (error) {
        console.log("Error while removing food item from cart:", error);
        res.json({ success: false, message: "Error while removing food item from cart"});
    }
}


// fetch user's cart data
const getCart = async(req, res) => {
    try {
        let userData = await userModel.findById(req.body.userId);
        let cartData = await userData.cartData;
        res.json({ success: true, cartData });
    } catch (error) {
        console.log("Error while getting cart data:", error);
        res.json({ success: false, message: "Error while getting cart data" });
    }
}

export { addToCart, removeFromCart, getCart }