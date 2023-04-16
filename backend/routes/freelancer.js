const express = require('express');
const router = express.Router();

const { getFreelancers,
    newFreelancer,
    getSingleFreelancer,
    getApplicationEntries,
    approveApplication,
    rejectApplication,

} = require('../controllers/freelancerController');
const { isAuthenticatedUser, authorizeRoles } = require('../middlewares/auth');

router.route('/freelancers').get(isAuthenticatedUser, getFreelancers);
router.route('/freelancer/new').post(isAuthenticatedUser, newFreelancer);
router.route('/freelancer/:id').get(getSingleFreelancer);
router.route('/application-entries').get(getApplicationEntries);
router.route('/application-approve/:id').put(approveApplication);
router.route('/application-reject/:id').put(rejectApplication);
module.exports = router;