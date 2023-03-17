const express = require('express');
const router = express.Router();

const { registerUser,
     application,
     loginUser,
     logout,
     allUsers,
     allFreelancers,
     activateUser,
     deactivateUser,
     createUser,
     //
     forgotPassword,
     resetPassword,
     updatePassword,
     getUserProfile,
     updateProfile,
     getAdopters,
     deleteUser,

     getPersonnels,
     updateUser,
     updateAdopter,
     newUser,
     newAdopter,
     getUserDetails

} = require('../controllers/authController');
const { isAuthenticatedUser, authorizeRoles } = require('../middlewares/auth');


router.route('/register').post(registerUser);

router.route('/application').post(application);

router.route('/create').post(createUser);

router.route('/login').post(loginUser);

router.route('/password/forgot').post(isAuthenticatedUser, forgotPassword);
router.route('/password/reset/:token').put(isAuthenticatedUser, resetPassword);

router.route('/logout').get( logout);
router.route('/me').get(isAuthenticatedUser, getUserProfile)

router.route('/password/update').put(isAuthenticatedUser, updatePassword)
router.route('/me/update').put(isAuthenticatedUser, updateProfile)
router.route('/users').get(isAuthenticatedUser, authorizeRoles('admin'), allUsers)
router.route('/freelancers').get(isAuthenticatedUser, authorizeRoles('admin'), allFreelancers)

router.route('/adopters').get(getAdopters, isAuthenticatedUser, authorizeRoles('admin'))
router.route('/personnels').get(getPersonnels, isAuthenticatedUser, authorizeRoles('admin'))

router.route('/user/:id').put(activateUser, isAuthenticatedUser, authorizeRoles('admin')).delete(deleteUser, isAuthenticatedUser, authorizeRoles('admin'))
router.route('/userd/:id').put(deactivateUser, isAuthenticatedUser, authorizeRoles('admin'))

router.route('/customer/:id').put(updateUser, isAuthenticatedUser, authorizeRoles('admin'));
// router.route('/adopter/:id').put(updateAdopter, isAuthenticatedUser, authorizeRoles('admin'));

// router.route('/user/new').post(newUser, isAuthenticatedUser, authorizeRoles('admin'));
// router.route('/adopter/new').post(newAdopter, isAuthenticatedUser, authorizeRoles('admin'));
router.route('/user/:id').get(getUserDetails);

// router.route('/me/update').put(isAuthenticatedUser, updateProfile)
// router.route('/a').put(updatePersonnel);

// router.route('/user/activate/:id').put(activateUser);

module.exports = router;
