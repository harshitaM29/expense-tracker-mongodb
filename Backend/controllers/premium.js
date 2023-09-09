
const User = require('../models/users');

exports.getLeaderBoardData = async(req,res,next) => {
  
    const users = await User.find().sort({totalExpenses: -1});
    
   res.status(200).json(users);
}