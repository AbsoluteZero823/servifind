const express = require('express');
const router = express.Router();

const { getServices,
    newService,
    getSingleService,
    updateService,
    deleteService,
    createServiceReview,
    getServiceReviews,
    deleteReview
} = require('../controllers/serviceController');


router.route('/services').get(getServices);
router.route('/service/new').post(newService);
router.route('/service/:id').get(getSingleService);
router.route('/service/:id').put(updateService).delete(deleteService);
module.exports = router;