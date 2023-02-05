const express = require('express');
const router = express.Router();

const { getServices,
    newInquiry,
    getSingleService,
    updateService,
    deleteService,
    createServiceReview,
    getServiceReviews,
    deleteReview
} = require('../controllers/inquiryController');


// router.route('/services').get(getServices);
router.route('/inquiry/new').post(newInquiry);
// router.route('/service/:id').get(getSingleService);
// router.route('/service/:id').put(updateService).delete(deleteService);
module.exports = router;