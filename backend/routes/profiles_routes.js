const { profile } = require('console');
const express = require('express');
const router = express.Router();

const {getProfileById, addProfile,updateProfile,deleteProfile} = require('../Controllers/profile_controller')

router.get('/:id',getProfileById);
router.post('/',addProfile);
router.patch('/:id',updateProfile);
router.delete('/:id',deleteProfile);

module.exports = router;
