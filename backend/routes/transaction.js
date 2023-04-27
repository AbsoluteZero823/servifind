const express = require('express');
const router = express.Router();

const { getTransactions,
    newTransaction,
    getSingleTransaction,
    PaymentReceived,
    PaymentSent,
    transactionDone,
    rateDone,
    reportDone,
    updateTransaction,
    createTransactionReview,
    getTransactionReviews,
    deleteReview,
    getMyFTransactions,
    getMyCTransactions
} = require('../controllers/transactionController');
const { isAuthenticatedUser, authorizeRoles } = require('../middlewares/auth');

router.route('/transactions').get(getTransactions);
router.route('/transaction/new').post(newTransaction);
router.route('/transaction/:id').get(getSingleTransaction);
router.route('/transaction/:id').put(PaymentSent);
router.route('/transaction/received/:id').put(PaymentReceived);
router.route('/transaction/done/:id').put(transactionDone);
router.route('/transaction/rated/:id').put(rateDone);
router.route('/transaction/reported/:id').put(reportDone);
router.route('/transaction-update/:id').put(updateTransaction);
// router.route('/transaction/client/done/:id').put(transactionDoneC);
// router.route('/transaction/:id').put(updateTransaction).delete(deleteTransaction);
// router.route('/my/transactionsf').get(getMyFTransactions);
// router.route('/my/transactionsc').get(isAuthenticatedUser, getMyCTransactions);
module.exports = router;