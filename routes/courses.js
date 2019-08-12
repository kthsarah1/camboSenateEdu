var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var conn = require('../public/config/database');
module.exports = function (passport) {
    //코스 목록
    router.get('/',function(req,res){
        var sql = "SELECT * FROM course;"
        console.log(sql);

        conn.getConnection(function (err, client) {
            if (err) { console.log('connection Error', err); }
            client.query(sql, function (err, result) {
                if (err) {//Mysql Error
                    console.log("Mysql Error" + err);
                    res.status(500).send('Internal Server Error');
                    return done(err);
                }else{
                    res.render('course',{goods:result});
                    console.log(result);
                }
            });
        });
    });

    //코스 추가
    router.get('/add',function(req,res){
        console.log("course add");
        res.render('add');
    });
    router.post('/add',function (req,res) {

        var no = req.body.no;
        var courses = req.body.courses;
        var duration = req.body.duration;
        var date = req.body.date;
        var hours = req.body.hours;
        var trainers = req.body.trainers;
        var courses_managers = req.body.courses_managers;
        var courses_facilitators = req.body.courses_facilitators;
        if(duration ==null)
            duration = "2019";
        if(date ==null)
            date = "2019";
        if(hours == null)
            hours = 2;
        if(trainers ==null)
            trainers = "2019";
        if(courses_managers ==null)
            courses_managers = "2019";
        if(courses_facilitators ==null)
            courses_facilitators = "2019";
        var course = {
            courses:courses,
            no:no,
            duration : duration,
            date : date,
            hours : hours,
            trainers : trainers,
            courses_managers : courses_managers,
            courses_facilitators : courses_facilitators
    };
        var sql = 'INSERT INTO course SET ?';
        console.log(sql);
        conn.getConnection(function (err, client) {
            if (err) { console.log('connection Error', err); }
            client.query(sql, course, function (err, result) {
                console.log(sql);
                if (err) {//Mysql Error
                    console.log("Mysql Error" + err);
                    res.status(500).send('Internal Server Error');
                }else{
                    res.redirect('/course/');
                    console.log("result : " +result);
                }
            });
        });
    });
    
    //코스 수정
    router.get('/:no/edit',function(req,res){
        var no = req.params.no;
        var sql = "SELECT * FROM course where no = ? ";
        conn.getConnection(function (err, client) {
            console.log(sql);
            if (err) { console.log('connection Error', err); }
            client.query(sql, [no], function (err, result) {
                if (err) {//Mysql Error
                    console.log("Mysql Error" + err);
                    res.status(500).send('Internal Server Error');
                }else{
                    res.render('edit',{goods:result[0]});
                }
            });
        });

    });

    router.post('/:no/edit',function (req,res) {
        var no = req.params.no;
        var duration = req.body.duration;
        var date = req.body.date;
        var hours = req.body.hours;
        var trainers = req.body.trainers;
        var courses_managers = req.body.courses_managers;
        var courses_facilitators = req.body.courses_facilitators;
        var sql = "UPDATE course SET duration = ?, date = ?, hours =?,trainers = ?, courses_managers=?, courses_facilitators=? where no = ?";
        var params = [duration,date,hours,trainers,courses_managers,courses_facilitators,no];
        console.log(params);
        conn.getConnection(function (err, client) {
            console.log(sql);
            if (err) { console.log('connection Error', err); }

            client.query(sql, params, function (err, result) {
                if (err) {//Mysql Error
                    console.log("Mysql Error" + err);
                    res.status(500).send('Internal Server Error');
                }else{
                    res.redirect('/course/'+no);
                }
            });
        });

    });

    //코스삭제
    router.post('/:no/delete',function (req,res) {
        var no = req.params.no;
        var sql = 'DELETE FROM course where no = ?';

        conn.getConnection(function (err, client) {
            if (err) { console.log('connection Error', err); }
            client.query(sql, [no], function (err, result) {
                if (err) {//Mysql Error
                    console.log("Mysql Error" + err);
                    res.status(500).send('Internal Server Error');
                }else{
                    res.redirect('/course/');
                    console.log(result);
                }
            });
        });

    });

    //코스 보기
    router.get('/:no',function (req,res) {
       var no = req.params.no;
       var sql = "SELECT * FROM course WHERE no = ?";

        conn.getConnection(function (err, client) {
            if (err) { console.log('connection Error', err); }
            client.query(sql, [no], function (err, result) {
                if (err) {//Mysql Error
                    console.log("Mysql Error" + err);
                    res.status(500).send('Internal Server Error');
                    return done(err);
                }else{
                    console.log("result[0] : " + result[0]);
                    console.log(sql);
                    res.render('view',{goods:result[0]});
                }
            });
        });

    });

    return router;
};