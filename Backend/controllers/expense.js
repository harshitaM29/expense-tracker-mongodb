const Expenses = require('../models/expense');
const User = require('../models/users');
exports.getExpenseData = async(req,res,next) => {
    const page = +req.query.page || 1;
    const limit = +req.query.limit
    const expenses = await Expenses.find({ userId: req.user._id });
    let startIndex = (page - 1) * limit;
    let lastIndex = (page) * limit;
    const results = {};
    results.totalItems = expenses.length;
    results.pageCount = Math.ceil(expenses.length / limit);
    if(lastIndex < expenses.length) {
        results.next = {
            page: page + 1,
        }
    }

    if(startIndex > 0) {
        results.prev = {
            page: page - 1
        }
    }
    
    results.result = expenses.slice(startIndex, lastIndex);
   
    res.status(200).json(results);
};

exports.postExpenseData = async(req,res,next) => {
    let totalAmount;
   
    const description = req.body.description;
    const amount = req.body.amount;
    const category = req.body.category;
    try {
    const expenseData = new Expenses({
        description:description,
        amount:amount,
        category:category,
        userId:req.user._id
    });
    await expenseData.save()
    totalAmount = Number(req.body.amount) + Number(req.user.totalExpenses);
    await req.user.updateOne({ totalExpenses: totalAmount});
   
    res.status(201).json(expenseData); 
}catch(err)  {
    
    throw new Error(err)
}
};

exports.deleteExpenseData = async(req,res,next) => {
    const id = req.params.id;
    try {
    const expenseData = await Expenses.findByIdAndRemove({ _id: id });
    let totalAmount = Number(req.user.totalExpenses) - Number(expenseData.amount);
    await req.user.updateOne({ totalExpenses : totalAmount})
    res.status(200).json(expenseData);
    }
    catch(err) {
        throw new Error(err);
      
    }
}