exports.userLoginCheck = function(req, res){
	console.log("user로그인 체크!===============");   
    if(!req.user){res.redirect('auth/login');}	
    else{
        if(req.user.user_check == "admin"){
            res.redirect('/admin');
        }
    }
};
exports.adminLoginCheck = function(req, res){
	console.log("admin로그인 체크!================");
    if(!req.user){res.redirect('auth/login');}	
    else{
        if(req.user.user_check == "user"){
            res.redirect('/');
        }
    }
};