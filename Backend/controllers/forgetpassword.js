const Sib = require('sib-api-v3-sdk');
const User = require('../models/users');
const ForgetPassword = require('../models/forgetpassword');
const bcrypt = require('bcrypt');
require('dotenv').config();


exports.forgetPassword = async(req,res,next) => {
const emailId = req.body.email;

    const user = await User.findOne({
            email:emailId
       
    }).select("id");
    const forgetpasswordrequests = new ForgetPassword({
        userId:user._id,
        isActive:true
    })
    await forgetpasswordrequests.save();
    const client = Sib.ApiClient.instance

const apiKey = client.authentications['api-key']
apiKey.apiKey = process.env.API_KEY

const tranEmailAPI = new Sib.TransactionalEmailsApi();
try {
const sender = {
    email: 'mundhe.harshita29@gmail.com',
    name:'Harshita'
}

const receiver = [
{
    email:emailId
}

]

const response = await tranEmailAPI.sendTransacEmail({
    sender,
    to: receiver,
    subject:'Reset Password Link',
    textContent:`http://localhost:4000/password/resetpassword/${forgetpasswordrequests.id}`
})
res.status(200).json({message:'Mail Sent Successfully'})
}catch(err) {
    console.log(err);
    res.status(400).json({message:'Something Went Wrong'})
}

};

exports.resetPassword = async(req,res,next) => {
    const id = req.params.id;
    const requests = await ForgetPassword.findOne({
     
            _id:id
       
    });
    if(requests) {
        await requests.updateOne({ isActive: false})
    }
    res.status(200).send(`<html>
        <form action="/password/updatepassword/${id}" method="get">
            <label for="newpassword">Enter New password</label>
            <input name="newpassword" type="password" required></input>
            <button>Change Password</button>
        </form>
    </html>`);
    res.end();
};

exports.updatePassword = async(req,res,next) => {
    const newpassword = req.query.newpassword;
    const id = req.params.id;
    try {
    const user = await ForgetPassword.findOne({
        
            _id:id
        
    }).select('userId');
    const userInfo = await User.findOne( {_id:user.userId} );
    if(userInfo) {
        const salt = await bcrypt.genSalt(10);
        await userInfo.updateOne({ password: await bcrypt.hash(newpassword, salt)})
        res.status(201).send(`<h3>Updated the password</h3>`)
    } else {
        return res.status(404).json({ error: 'No user Exists', success: false})
    }
}catch(err) {
   throw new Error(err);
}
}