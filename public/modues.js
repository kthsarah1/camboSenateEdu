
exports.userLoginCheck = function(req, res){
	console.log("user로그인 체크!");
    console.log("체크",req.user);
    if(!req.user){res.redirect('auth/login');}	
};