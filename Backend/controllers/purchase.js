const RazorPay = require('razorpay');
const Order = require('../models/orders');
require('dotenv').config();
const jwt = require('jsonwebtoken');
const generateWebToken = (id, isPremium) => {
    return jwt.sign({ userId: id, isPremium}, 'secretkeyforexpensetracker');
 }
exports.purchaseMembership = async(req,res) => {
    try {
      
        var rzp = new RazorPay({
            key_id: process.env.RAZORPAY_KEY_ID,
            key_secret:process.env.RAZORPAY_KEY_SECRET
        })
        const amount = 25;
        const currency = 'INR'
        const options = {
            amount: amount * 100,
            currency
        };

       const response = await rzp.orders.create(options)
        const order = new Order({ orderId: response.id, status: 'PENDING', userId:req.user._id})
        await order.save();
         res.status(201).json({ response, key_id: rzp.key_id });
           
      
    }catch(err){
        res.status(403).json({ message: 'Something Went Wrong', error: err})
    }
}

exports.updatetransactionstatus = async(req,res, next) => {
    const userId = req.user._id;
    try {
        const {payment_id, order_id} = req.body;
        if(!payment_id) {
        const order = await Order.findOne( {orderId: order_id} );
        await order.updateOne({ status: 'Failed'});
        await req.user.updateOne({ isPremium: false});
        }  else {
        const order = await Order.findOne({orderId: order_id} );
        await order.updateOne({ paymentId: payment_id, status: 'SUCCESSFUL'});
         await req.user.updateOne({ isPremium: true});
         res.status(202).json({token:generateWebToken(userId,true),isPremium:true, message: "Transaction Completed"})
        }
      

    }catch(err) {
        throw new Error(err);
    }

}