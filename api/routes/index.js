const express = require('express');
const router = express.Router();

const firebaseAuthController = require('../controllers/auth.controller');
const formController = require('../controllers/formData.controller')
const verifyToken = require('../middlewares/verifyToken')

router.post('/register', firebaseAuthController.registerUser);
router.post('/login', firebaseAuthController.loginUser);
router.post('/logout', firebaseAuthController.logoutUser);
router.post('/reset-password', firebaseAuthController.resetPassword);

router.post('/submit-form', verifyToken, formController.submitForm);
router.get('/form-submissions', verifyToken,firebaseAuthController.checkAdminRole, formController.getFormSubmissions);
router.put('/form-submission/:id/approve', verifyToken, firebaseAuthController.checkAdminRole, formController.approveForm);
router.put('/form-submission/:id/reject', verifyToken,firebaseAuthController.checkAdminRole, formController.rejectForm);
router.get('/user-profile', verifyToken, formController.getUserProfile);

module.exports = router;
