var express = require('express');
var router = express.Router();
var crypto = require('./../public/config/crypto.js');
var conn = require('./../public/config/database.js');

module.exports = function (passport) {
  router.get('/login', function (req, res, next) {
    res.render('login');
  });
  router.post('/login',
    passport.authenticate('local', {
      successRedirect: '/',
      failureRedirect: '/auth/login',
      failureFlash: true,
      successFlash: true
    })
  );
  router.post('/signup', function (req, res, next) {
    var user_email = req.body.user_email;
    var user_pw = req.body.user_pw;
    var user_fn = req.body.user_fn;
    var user_gn = req.body.user_gn;
    var user_sex = req.body.user_sex;
    var user_birth = req.body.user_birth;
    var user_nation = req.body.user_nation;
    var user_phone = req.body.user_phone;
    var user_position = req.body.user_position;
    var user_part = req.body.user_part;
    var user_offid = req.body.user_offid;
    console.log("-------------------", '\n', user_email, '\n', user_pw, '\n', user_fn, '\n', user_gn, '\n',
      user_sex, '\n', user_birth, '\n', user_nation, '\n', user_phone, '\n',
      user_position, '\n', user_part, '\n', user_offid, '\n', "-------------------");

    var crypto_pw = crypto.cryptoHash(user_pw);
    console.log("회원가입 로그 : ", user_email, crypto_pw);
    var query = 'INSERT INTO user (user_email, user_pw, user_fn, user_gn, user_sex, user_birth, user_nation, user_phone, user_position, user_part, user_offid, user_check) VALUES (?,?,?,?,?,?,?,?,?,?,?,?)';
    var params = [user_email, crypto_pw, user_fn, user_gn, user_sex, user_birth, user_nation, user_phone, user_position, user_part, user_offid, "user"];
    conn.getConnection(function (err, client) {
      if (err) { console.log('회원가입 connection Error', err); }
      client.query(query, params, function (err, result) {
        if (err) {//Mysql Error
          console.log("회원가입 mysql 에러" + err);
        }
        else {
          console.log("회원가입 mysql 결과" + result);
        }
      });
    });
  });
  return router;
}


