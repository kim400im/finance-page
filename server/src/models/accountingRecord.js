const mongoose = require('mongoose');

const accountingRecordSchema = new mongoose.Schema({
    date: {type:Date, required: true},
    description: {type: String, required: true},
    amount : {type: Number, required:true},
    type: {type: String, enum: ['income','expense'], required: true},
}, {timestamps: true});

const AccountingRecord = mongoose.model('AccountingRecord', accountingRecordSchema);

module.exports = AccountingRecord;