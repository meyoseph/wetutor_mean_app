const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const { getAllUserProfiles, updateUserStatus,deleteUser, getUserById } = require('../controller/adminController');

router.get('/tutors', getAllUserProfiles);
router.get('/tutors/:id', getUserById);
router.put('/tutors/:id', updateUserStatus);
router.delete('/tutors/:id', deleteUser);

module.exports = router;