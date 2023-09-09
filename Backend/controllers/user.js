const User = require('../models/users');
 const bcrypt = require('bcrypt');
 const jwt = require('jsonwebtoken');

const generateWebToken = (id, isPremium) => {
    return jwt.sign({ userId: id, isPremium}, 'secretkeyforexpensetracker');
 }

exports.postUserData = async(req,res,next) => {
    const name = req.body.name;
    const email = req.body.email;
    const password = req.body.password;
    const isPremium = req.body.isPremium;
    const totalExpenses = req.body.totalExpenses;
    try {
    const salt = await bcrypt.genSalt(10);
    const userData = new User({
        name:name,
        email:email,
        password: await bcrypt.hash(password, salt),
        isPremium:isPremium,
        totalExpenses:totalExpenses
    });
    await userData.save();
    return res.status(201).json(userData);
} catch(err) {
    console.log(err.code)
    return res.status(400).json(err.code)
}
   

}

exports.postLoginUserData = async(req,res,next) => {
    const email = req.body.email;
    const password = req.body.password;
    const user = await User.findOne({email:email})
    
    if(user) {
        const presentPass = await bcrypt.compare(password, user.password)
       
        if(presentPass) {
            res.status(200).json({ email:email, password:password,isPremium:user.isPremium, token:generateWebToken(user._id, false) });
           
        } else {

            res.status(401).json('Password Does Not Match')
        } 
    } else {
      
        res.status(404).json('User Does Not Exists')
    }

}


