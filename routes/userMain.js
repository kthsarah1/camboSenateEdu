var express = require('express');
var router = express.Router();
var auth = require('../public/modues');
/* GET users listing. */

router.get('/',  function (req, res, next) {
    auth.userLoginCheck(req, res);
    console.log(req.user);
    console.log("main page");
    res.render('subPage/mainpage');
});
module.exports = router;
