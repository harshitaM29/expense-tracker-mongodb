const express = require('express');
const bodyParser = require('body-parser');
const cors =  require('cors');
const fs = require('fs');
const path = require('path');
const mongoose = require('mongoose');
const userRoutes = require('./routes/user');
const expenseRouter = require('./routes/expense');
const purchaseRouter = require('./routes/purchase');
const premiumRouter = require('./routes/premium');
const passwordRouter = require('./routes/forgetpassword');
const helmet = require('helmet');
const morgan = require('morgan');

const app = express();

app.use(cors());
const accessLogs = fs.createWriteStream(path.join(__dirname,'access.log'),
{flags: 'a'}
);
app.use(helmet());
app.use(morgan('combined', {stream: accessLogs}));
app.use(bodyParser.json({ extended: false }));
app.use('/user',userRoutes);
app.use(expenseRouter);
app.use('/purchase', purchaseRouter);
app.use('/premium',premiumRouter);
app.use('/password',passwordRouter);
// app.use(express.static(
//     path.join(__dirname,"../Frontend/build")));
// app.get("*", (req, res) => {
//         res.sendFile(
//           path.join(__dirname, "../Frontend/build/index.html")
//         );
//       });

// User.hasMany(Expense);
// Expense.belongsTo(User);

// User.hasMany(Order);
// Order.belongsTo(User);

// User.hasMany(ForgetPassword);
// ForgetPassword.belongsTo(User);

// User.hasMany(FilesDownloaded);
// FilesDownloaded.belongsTo(User);

mongoose.connect('mongodb+srv://harshita:2IsqiaXXHqt6sJsX@cluster0.zxpdkff.mongodb.net/expensetracker?retryWrites=true&w=majority').then(res => {
    app.listen(4000);
})
.catch(err => console.log(err));
