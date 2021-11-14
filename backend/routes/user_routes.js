const express = require("express");
const { apiGetAll, apiGetOne, apiPost, apiDelete, apiUpload, search, addUser } = require("../controller/parent");
const router = express.Router();

//const router = express.Router();

//get all
router.get("/", apiGetAll);

//post user
router.post("/", addUser);

//search by text

router.get("/search", search)

module.exports = router;