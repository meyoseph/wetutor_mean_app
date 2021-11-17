const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const checkAuth = require('../middleware/check-auth');
const { getAllUserProfiles, updateUserStatus,deleteUser, getUserById } = require('../controller/adminController');

router.get('/tutors', checkAuth, getAllUserProfiles);
router.get('/tutors/:id', checkAuth, getUserById);
router.put('/tutors/:id', checkAuth, updateUserStatus);
router.delete('/tutors/:id', checkAuth, deleteUser);

module.exports = router;
