const express = require('express');
const router = express.Router();

const { getRequests,
    newRequest,
    getSingleRequest,
    getMyRequests,
    editMyRequest,
    deleteMyRequest,

    PaymentReceived,
    PaymentSent,
    requestDone,
    createRequestReview,
    getRequestReviews,
    deleteReview,
    getMyFRequests,
    getMyCRequests
} = require('../controllers/requestController');
const { isAuthenticatedUser, authorizeRoles } = require('../middlewares/auth');

router.route('/requests').get(getRequests);
router.route('/request/new').post(isAuthenticatedUser, newRequest);
router.route('/request/:id').get(getSingleRequest);
router.route('/myrequests').get(isAuthenticatedUser, getMyRequests);
router.route('/myrequest/edit/:id').put(isAuthenticatedUser, editMyRequest);
router.route('/myrequest/cancel/:id').put(isAuthenticatedUser, deleteMyRequest);

// router.route('/request/:id').put(PaymentSent);
// router.route('/request/received/:id').put(PaymentReceived);
// router.route('/request/done/:id').put(requestDone);
// router.route('/request/client/done/:id').put(requestDoneC);
// router.route('/request/:id').put(updateRequest).delete(deleteRequest);
// router.route('/my/requestsf').get(getMyFRequests);
// router.route('/my/requestsc').get(isAuthenticatedUser, getMyCRequests);
module.exports = router;