const express = require('express');
const router = express.Router();

const { getTransactions,
    newTransaction,
    getSingleTransaction,
    updateTransaction,
    deleteTransaction,
    createTransactionReview,
    getTransactionReviews,
    deleteReview,
    getMyFTransactions,
    getMyCTransactions
} = require('../controllers/transactionController');
const { isAuthenticatedUser, authorizeRoles } = require('../middlewares/auth');

router.route('/transactions').get(getTransactions);
router.route('/transaction/new').post(newTransaction);
// router.route('/transaction/:id').get(getSingleTransaction);
// router.route('/transaction/:id').put(updateTransaction).delete(deleteTransaction);
// router.route('/my/transactionsf').get(getMyFTransactions);
// router.route('/my/transactionsc').get(isAuthenticatedUser, getMyCTransactions);
module.exports = router;