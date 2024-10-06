
import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js"
import Stripe from "stripe"

// stripe setup
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)



// placing user order from frontend
const placeOrder = async (req, res) => {
    const frontend_url = "http://localhost:5173";

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

        // session creation
        const session = await stripe.checkout.sessions.create({
            line_items: line_items,
            mode: 'payment',
            success_url: `${frontend_url}/verify?success=true&orderId=${newOrder._id}`,
            cancel_url: `${frontend_url}/verify?success=false&orderId=${newOrder._id}`,
        })

        res.json({ success: true, session_url: session.url })

    } catch (error) {
        console.log("Error while making payment in stripe:",error);
        res.json({ success: false, message: "Error while making payment" });
    }
}

export { placeOrder };