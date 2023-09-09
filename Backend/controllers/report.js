const { response } = require('express');
const FilesDownloaded = require('../models/filesdownloaded');
const Expense = require('../models/expense');
const AWS = require('aws-sdk');
require('dotenv').config();

function uploadToS3(data,filename) {
    let s3bucket = new AWS.S3({
        accessKeyId:process.env.IAM_USER_KEY,
        secretAccessKey:process.env.IAM_USER_SECRET,
        // Bucket:BUCKET_NAME
    });

    
        var params = {
            Bucket:process.env.BUCKET_NAME,
            Key:filename,
            Body:data,
            ACL:'public-read'
        }
        return new Promise((resolve,reject) => {
            s3bucket.upload(params, (err, response) => {
                if(err) {
                   
                    reject(err);
                } else {
                  
                    resolve(response.Location);
                }
            })
        })
       
   


}
exports.downloadReport = async(req,res,next) => {
    try {
    const expenseList = await Expense.find({ userId: req.user._id});
    const stringifiedExpenses = JSON.stringify(expenseList);
    const userId = req.user._id;
    const filename = `Expense${userId}/${new Date()}.txt`;
    const fileURL = await uploadToS3(stringifiedExpenses,filename);
    const filesDownloadedData = new FilesDownloaded({
        fileURL:fileURL,
        userId:userId,
        filename:filename
    });
    await filesDownloadedData.save();
    res.status(200).json({ fileURL, succues:true})
    
    }catch(err) {
        console.log(err)
        res.status(500).json({ fileURL:'', success:false, err:err})
    }
}

exports.getFileDownloadedData = async(req,res,next) => {
    const id = req.user._id;
    try {
            const data = await FilesDownloaded.find({ userId : id }).select("fileURL");
            res.status(200).json(data);

    }catch(err){
        res.status(400).json({message: 'Something Went Wrong', err:err})
    }
}