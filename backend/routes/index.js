var express = require('express');
const { signUpControl,loginControl } = require('../controllers/userController');
const {getCurrDoc,createDocs,updateDoc} =require("../controllers/docsController.js");
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

// Define the signup route
router.post("/signup", signUpControl);
router.post("/login",loginControl);
// router.post("/getDoc",getCurrDoc)
router.post("/createDoc",createDocs);
router.post("/updateDoc",updateDoc);

module.exports = router;
