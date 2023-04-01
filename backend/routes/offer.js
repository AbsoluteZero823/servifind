const express = require('express');
const router = express.Router();

const { getOffers,
    newOffer,
    getSingleOffer,
    getRequestOffers
} = require('../controllers/offerController');
const { isAuthenticatedUser, authorizeRoles } = require('../middlewares/auth');

router.route('/offers').get(getOffers);
router.route('/offer/new').post(newOffer);
router.route('/offer/:id').get(getSingleOffer);
router.route('/offers-request/:request_id').get(getRequestOffers);

// router.route('/offer/:id').put(PaymentSent);
// router.route('/offer/received/:id').put(PaymentReceived);
// router.route('/offer/done/:id').put(offerDone);
// router.route('/offer/client/done/:id').put(offerDoneC);
// router.route('/offer/:id').put(updateOffer).delete(deleteOffer);
// router.route('/my/offersf').get(getMyFOffers);
// router.route('/my/offersc').get(isAuthenticatedUser, getMyCOffers);
module.exports = router;