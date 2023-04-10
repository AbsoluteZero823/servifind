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

    ClientCompleteTransaction,
    ClientRateTransaction,
    ClientReportTransaction,
    ClientFetchTransaction,

    FreelancerGenerateTransaction,
    FreelancerCompleteTransaction,
    FreelancerReportTransaction,
    FreelancerFetchTransaction,

    createTransactionReview,
    getTransactionReviews,
    deleteReview,
    getMyFTransactions,
    getMyCTransactions,
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

router.route('/mytransactions').post(isAuthenticatedUser, ClientFetchTransaction);
router.route('/transactions/complete').post(isAuthenticatedUser, ClientCompleteTransaction);
router.route('/transactions/client/rate').post(isAuthenticatedUser, ClientRateTransaction);
router.route('/transactions/client/report').post(isAuthenticatedUser, ClientReportTransaction);

router.route('/myfreelancertransactions').post(isAuthenticatedUser, FreelancerFetchTransaction);
router.route('/myfreelancertransactions/generatetransaction').post(isAuthenticatedUser, FreelancerGenerateTransaction);
router.route('/myfreelancertransactions/completetransaction').post(isAuthenticatedUser, FreelancerCompleteTransaction);
router.route('/myfreelancertransactions/reporttransaction').post(isAuthenticatedUser, FreelancerReportTransaction);

// router.route('/transaction/client/done/:id').put(transactionDoneC);
// router.route('/transaction/:id').put(updateTransaction).delete(deleteTransaction);
// router.route('/my/transactionsf').get(getMyFTransactions);
// router.route('/my/transactionsc').get(isAuthenticatedUser, getMyCTransactions);
module.exports = router;