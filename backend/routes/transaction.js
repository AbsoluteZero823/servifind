const express = require('express');
const router = express.Router();

const { getTransactions,
    newTransaction,
    getSingleTransaction,
    updateTransaction,
    deleteTransaction,
    createTransactionReview,
    getTransactionReviews,
    deleteReview
} = require('../controllers/transactionController');


// router.route('/transactions').get(getTransactions);
router.route('/transaction/new').post(newTransaction);
// router.route('/transaction/:id').get(getSingleTransaction);
// router.route('/transaction/:id').put(updateTransaction).delete(deleteTransaction);
module.exports = router;