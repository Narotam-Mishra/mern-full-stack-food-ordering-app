
import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js"
import Stripe from "stripe"
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

// stripe setup
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// placing user order from frontend
const placeOrder = async (req, res) => {
    const frontend_url = process.env.FRONTEND_URL;

    try {
        const newOrder = new orderModel({
            userId: req.body.userId,
            items: req.body.items,
            amount: req.body.amount,
            address: req.body.address,
        })
        // save new order into DB
        await newOrder.save();

        // to reset cart data after placing order
        await userModel.findByIdAndUpdate(req.body.userId, {cartData: {}});

        // create payment link using stripe
        // before payment link we will create line items where we will insert all the product data
        const line_items = req.body.items.map((item) =>({
            price_data: {
                currency: "inr",
                product_data: {
                    name: item.name
                },
                // convert unit amount USD into INR
                unit_amount: item.price * 100 * 80
            },
            quantity: item.quantity
        }))

        line_items.push({
            price_data: {
                currency: "inr",
                product_data: {
                    name: "Delivery Charges"
                },
                unit_amount: 2 * 100 * 80
            },
            quantity: 1,
        })

        // create stripe checkout session
        const session = await stripe.checkout.sessions.create({
            line_items: line_items,
            mode: 'payment',
            success_url: `${frontend_url}/verify?success=true&orderId=${newOrder._id}`,
            cancel_url: `${frontend_url}/verify?success=false&orderId=${newOrder._id}`,
        })

        res.json({ success: true, session_url: session.url })

    } catch (error) {
        console.error("Stripe payment error:",error);
        res.json({ success: false, message: "Stripe payment error" });
    }
}

// api to verify order item
const verifyOrder = async (req, res) => {
    const {orderId, success} = req.body;
    try {
        if(success === "true"){
            await orderModel.findByIdAndUpdate(orderId, {payment: true} );
            res.json({ success: true, message: "Payment successfull!!"});
        }else{
            await orderModel.findByIdAndDelete(orderId);
            res.json({ success: false, message: "Not Paid"});
        }
    } catch (error) {
        console.log("Error while verify order:", error);
        res.json({ success: false, message: "error while verify order"});
    }
}

// user orders for frontend
const userOrders = async(req, res) => {
    try {
        const orders = await orderModel.find({ userId: req.body.userId });
        res.json({ success: true, data: orders })
    } catch (error) {
        console.log("Error while checking order:", error);
        res.json({ success: false, message: "Error while checking order"});
    }
}

// listing orders for admin panel
const listOrders = async(req, res) => {
    try {
        const orders = await orderModel.find({});
        res.json({ success: true, data: orders})
    } catch (error) {
        console.log("Error while listing orders in admin panel:",error);
        res.json({ success: false, message:"Error while listing orders in admin panel" });        
    }
}

// api for updating order status
const updateStatus = async (req, res) => {
    try {
        await orderModel.findByIdAndUpdate(req.body.orderId, { status: req.body.status });
        res.json({ success: true, message: "Status Updated"})
    } catch (error) {
        console.log("Error while updating status:", error);
        res.json({ success: false, message: "Error while updating status"})
    }
}

export { placeOrder, verifyOrder, userOrders, listOrders, updateStatus };