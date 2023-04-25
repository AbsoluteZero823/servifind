const express = require('express');
const router = express.Router();

const { getServices,
    newService,
    getSingleService,
    getFreelancerServices,
    updateService,
    deleteService,
    createServiceReview,
    getServiceReviews,
    deleteReview
} = require('../controllers/serviceController');
const { isAuthenticatedUser, authorizeRoles } = require('../middlewares/auth');

router.route('/services').get(getServices);
router.route('/services/:id').get(getFreelancerServices);
router.route('/service/new').post(isAuthenticatedUser, newService);
router.route('/service/:id').get(getSingleService);

router.route('/service/:id').put(updateService).delete(deleteService);
module.exports = router;