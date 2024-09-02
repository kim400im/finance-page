const express = require('express');
const { createAccountingRecord, getAllAccountingRecords } = require('../controllers/accountingController');

const router = express.Router();

router.post('/accounting', createAccountingRecord);

router.get('/accounting', getAllAccountingRecords);

module.exports = router
