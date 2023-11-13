const express = require('express')
const {registerUser,loginUser,currentUser}=require('../controllers/userControllers')
const router = express.Router();
const validateToken = require("../middlewares/validateTockenHandler")


router.post("/register",registerUser)
router.post("/login",loginUser)
router.get("/current",validateToken, currentUser)

module.exports = router;