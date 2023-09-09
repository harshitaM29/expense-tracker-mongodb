const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const filesSchema = new Schema({
    fileURL: {
        type:String,
        required:true
    },

    filename: {
        type:String,
       
       
    },
    userId: {
        type: Schema.Types.ObjectId,
        ref:'User',
        required:true
    }
});

module.exports = mongoose.model('FileDownload', filesSchema);