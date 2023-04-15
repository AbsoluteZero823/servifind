const express = require('express');
const router = express.Router();

const { getFreelancers,
    newFreelancer,
    getSingleFreelancer,
    updateFreelancer,
    deleteFreelancer,
    createFreelancerReview,
    getFreelancerReviews,
    deleteReview
} = require('../controllers/freelancerController');
const { isAuthenticatedUser, authorizeRoles } = require('../middlewares/auth');

router.route('/freelancers').get(isAuthenticatedUser, getFreelancers);
router.route('/freelancer/new').post(isAuthenticatedUser, newFreelancer);
router.route('/freelancer/:id').get(getSingleFreelancer);
// router.route('/freelancer/:id').put(updateFreelancer).delete(deleteFreelancer);
module.exports = router;