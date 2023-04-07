const express = require('express');
const router = express.Router();

const { getReports,
    newReport,
    getSingleReport,


    getmyReports,
    PaymentReceived,
    PaymentSent,
    reportDone,
    createReportReview,
    getReportReviews,
    deleteReview,
    getMyFReports,
    getMyCReports
} = require('../controllers/reportController');
const { isAuthenticatedUser, authorizeRoles } = require('../middlewares/auth');

router.route('/reports').get(getReports);
router.route('/report/new').post(newReport);
router.route('/report/:id').get(getSingleReport);


router.route('/myreports').post(isAuthenticatedUser, getmyReports);
// router.route('/report/:id').put(PaymentSent);
// router.route('/report/received/:id').put(PaymentReceived);
// router.route('/report/done/:id').put(reportDone);
// router.route('/report/client/done/:id').put(reportDoneC);
// router.route('/report/:id').put(updateReport).delete(deleteReport);
// router.route('/my/reportsf').get(getMyFReports);
// router.route('/my/reportsc').get(isAuthenticatedUser, getMyCReports);
module.exports = router;