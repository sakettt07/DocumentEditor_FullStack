var express = require('express');
const { signUpControl,loginControl,logoutControl, currUser } = require('../controllers/userController');
const {getCurrDoc,createDocs,updateDoc, AllDocs, DeleteDoc} =require("../controllers/docsController.js");
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

// Define the signup route
router.post("/signup", signUpControl);
router.post("/login",loginControl);
router.post("/logout",logoutControl);
router.post("/getUser",currUser)
router.post("/getDoc",getCurrDoc)
router.post("/createDoc",createDocs);
router.post("/updateDoc",updateDoc);
router.post("/getAllDocs",AllDocs)
router.post("/deleteDoc",DeleteDoc)

module.exports = router;
