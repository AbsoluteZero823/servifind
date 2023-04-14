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


// router.route('/freelancers').get(getFreelancers);
router.route('/freelancer/new').post(newFreelancer);
router.route('/freelancer/:id').get(getSingleFreelancer);
// router.route('/freelancer/:id').put(updateFreelancer).delete(deleteFreelancer);
module.exports = router;