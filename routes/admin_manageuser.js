var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var conn = require('../public/config/database');

module.exports = function (passport) {
    //유저 목록
    router.get('/',function(req,res){
        var sql = "SELECT * FROM user;"
        console.log(sql);

        conn.getConnection(function (err, client) {
            if (err) { console.log('connection Error', err); }
            client.query(sql, function (err, result) {
                if (err) {//Mysql Error
                    console.log("Mysql Error" + err);
                    res.status(500).send('Internal Server Error');
                    return done(err);
                }else{
                    res.render('user',{goods:result});
                    console.log(result);
                }
            });
        });
    });

    //유저 추가
    router.get('/add',function(req,res){
        console.log("user add");
        res.render('adduser');
    });
    router.post('/add',function (req,res) {
        var user_num = req.body.user_num;
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
        var user_check = req.body.user_check;

        var user = {
            user_num:user_num,
            user_email:user_email,
            user_pw : user_pw,
            user_fn : user_fn,
            user_gn : user_gn,
            user_sex : user_sex,
            user_birth : user_birth,
            user_nation : user_nation,
            user_phone:user_phone,
            user_position:user_position,
            user_part : user_part,
            user_offid : user_offid,
            user_check : user_check
    };
        var sql = 'INSERT INTO user SET ?';
        console.log(sql);
        conn.getConnection(function (err, client) {
            if (err) { console.log('connection Error', err); }
            client.query(sql, user, function (err, result) {
                console.log(sql);
                if (err) {//Mysql Error
                    console.log("Mysql Error" + err);
                    res.status(500).send('Internal Server Error');
                }else{
                    res.redirect('/user/');
                    console.log("result : " +result);
                }
            });
        });
    });

    //유저 수정
    router.get('/:user_num/edit',function(req,res){
        var user_num = req.params.user_num;
        var sql = "SELECT * FROM user where user_num = ? ";
        conn.getConnection(function (err, client) {
            console.log(sql);
            if (err) { console.log('connection Error', err); }
            client.query(sql, [user_num], function (err, result) {
                if (err) {//Mysql Error
                    console.log("Mysql Error" + err);
                    res.status(500).send('Internal Server Error');
                }else{
                    res.render('edituser',{goods:result[0]});
                }
            });
        });

    });

    router.post('/:user_num/edit',function (req,res) {
        var user_num = req.body.user_num;
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
        var user_check = req.body.user_check;
        var sql = "UPDATE user SET user_email=?, user_pw=?,user_fn=?,user_gn=?,user_sex=?,user_birth=? user_nation=?,user_phone=?,user_position=?,user_part=?,user_offid=?,user_check=? where user_num = ?";
        var params = [user_email,user_pw,user_pw,user_fn,user_gn,user_sex,user_birth,user_nation,user_phone,user_position,user_part,user_offid,user_check,user_num];
        console.log(params);
        conn.getConnection(function (err, client) {
            console.log(sql);
            if (err) { console.log('connection Error', err); }

            client.query(sql, params, function (err, result) {
                if (err) {//Mysql Error
                    console.log("Mysql Error" + err);
                    res.status(500).send('Internal Server Error');
                }else{
                    res.redirect('/user/'+user_num);
                }
            });
        });

    });

    //유저삭제
    router.post('/:user_num/delete',function (req,res) {
        var user_num = req.params.user_num;
        var sql = 'DELETE FROM user where user_num = ?';

        conn.getConnection(function (err, client) {
            if (err) { console.log('connection Error', err); }
            client.query(sql, [user_num], function (err, result) {
                if (err) {//Mysql Error
                    console.log("Mysql Error" + err);
                    res.status(500).send('Internal Server Error');
                }else{
                    res.redirect('/user/');
                    console.log(result);
                }
            });
        });

    });

    //유저 보기
    router.get('/:user_num',function (req,res) {
       var user_num = req.params.user_num;
       var sql = "SELECT * FROM user WHERE user_num = ?";

        conn.getConnection(function (err, client) {
            if (err) { console.log('connection Error', err); }
            client.query(sql, [user_num], function (err, result) {
                if (err) {//Mysql Error
                    console.log("Mysql Error" + err);
                    res.status(500).send('Internal Server Error');
                    return done(err);
                }else{
                    console.log("result[0] : " + result[0]);
                    console.log(sql);
                    res.render('viewuser',{goods:result[0]});
                }
            });
        });

    });

    return router;
};