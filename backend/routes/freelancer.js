const express = require('express');
const router = express.Router();

const { getFreelancers,
    newFreelancer,
    getSingleFreelancer,
    makemeaFreelancer,
    getmyFreelancers,
    updatemyFreelancers,
    upgrademyFreelancer,
    newupgrade,
    getfreelancerjobs,
    updateFreelancer,
    deleteFreelancer,
    createFreelancerReview,
    getFreelancerReviews,
    deleteReview
} = require('../controllers/freelancerController');
const { isAuthenticatedUser, authorizeRoles } = require('../middlewares/auth');

// router.route('/freelancers').get(getFreelancers);
// router.route('/freelancer/new').post(newFreelancer);
router.route('/freelancers/register').post(isAuthenticatedUser,makemeaFreelancer);
router.route('/freelancers/me').post(isAuthenticatedUser,getmyFreelancers);
router.route('/freelancers/update').post(isAuthenticatedUser,updatemyFreelancers);
router.route('/freelancers/upgrade').post(isAuthenticatedUser,upgrademyFreelancer);

router.route('/freelancer/:id').get(getSingleFreelancer);
// router.route('/freelancer/:id').put(updateFreelancer).delete(deleteFreelancer);
module.exports = router;