const express = require('express');
const router = express.Router();

const { getFreelancers,
    newFreelancer,
    getSingleFreelancer,
    getApplicationEntries,
    approveApplication,
    rejectApplication,
    availPremium,
    getApplicationPremium,
    approveApplicationPremium,
    rejectApplicationPremium,
    availabiltyUpdate,
    completeFreelancerSetup,

} = require('../controllers/freelancerController');
const { isAuthenticatedUser, authorizeRoles } = require('../middlewares/auth');

router.route('/freelancers').get(isAuthenticatedUser, getFreelancers);
router.route('/freelancer/new').post(isAuthenticatedUser, newFreelancer);
router.route('/freelancer/:id').get(getSingleFreelancer);
router.route('/application-entries').get(getApplicationEntries);
router.route('/application-approve/:id').put(approveApplication);
router.route('/application-reject/:id').put(rejectApplication);
router.route('/avail-premium').put(isAuthenticatedUser, availPremium);
router.route('/application-premium').get(getApplicationPremium);
router.route('/approve-premium/:id').put(approveApplicationPremium);
router.route('/reject-premium/:id').put(rejectApplicationPremium);
router.route('/availability-update').put(isAuthenticatedUser, availabiltyUpdate);
router.route('/complete-setup').put(isAuthenticatedUser, completeFreelancerSetup);

module.exports = router;