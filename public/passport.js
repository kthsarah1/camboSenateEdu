module.exports = function (app) {
    var passport = require('passport');
    var LocalStrategy = require('passport-local').Strategy;
    var crypto = require('./config/crypto.js');
    var conn = require('./config/database.js');
    app.use(passport.initialize());
    app.use(passport.session());
    passport.serializeUser(function (user, done) {
        console.log("serialize================");
        done(null, user);
    });
	passport.deserializeUser(function(user, done){
		console.log("deserialize================");
		done(null, user);
	});
    passport.use(new LocalStrategy({
        usernameField: 'user_email',
        passwordField: 'user_pw',
    }, function (id, password, done) {
        console.log("passport!!");
        var crypto_pw = crypto.cryptoHash(password);
        console.log("로그지울것! : ", id, crypto_pw);
        var query = 'SELECT * FROM user WHERE user_email = ? AND user_pw = ?';
        var params = [id, crypto_pw];
        conn.getConnection(function (err, client) {
            if (err) { console.log('connection Error', err); }
            client.query(query, params, function (err, result) {
                if (err) {//Mysql Error
                    console.log("Mysql Error" + err);
                    return done(err);
                }
                else {
                    if (result.length === 0) {
                        console.log("idx");
                        return done(null, false, { message: 'Incorrect ID or Password' });
                    }
                    else {
                        var user = result[0];
                        console.log("로그인 성공", user);
                        return done(null, user);
                    }
                }
            });
        });
    }));

    return passport;
}