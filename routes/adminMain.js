var express = require('express');
var router = express.Router();
var auth = require('../public/modues');
/* GET users listing. */

router.get('/',  function (req, res, next) {
    auth.adminLoginCheck(req, res);
    console.log(req.user);
    console.log("admin page");
});
module.exports = router;
