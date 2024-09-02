const AccountingRecord = require('../models/accountingRecord');

// 회계 기록 생생
async function createAccountingRecord(req, res) {
    try {
        const newRecord = new AccountingRecord(req.body);
        await newRecord.save();
        res.status(201).json(newRecord);
    } catch (err) {
        res.status(400).json({message: 'Error createing record', error: err});
    }
}


// 모든 회계 기록 가져오기
async function getAllAccountingRecords(req,res) {
    try {
        const records = await AccountingRecord.find();
        res.status(200).json(records);
    } catch (err) {
        res.status(500).json({message: 'Error fetching records', error: err});
    }
}

module.exports = { createAccountingRecord, getAllAccountingRecords};