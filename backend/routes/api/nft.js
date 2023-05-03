const express = require("express");
const router = express.Router();
const coursemodel = require("../../models/Course.js");
const Lecturemodel = require("../../models/Lecture.js");
const usermodel = require("../../models/User.js");
const nftcontroller = require("../../controllers/nft.js");


//post api that calls the nft controller
router.post("/nft", (req, res) => {
    nftcontroller();
    res.send("NFT Created");
});

module.exports = router;
