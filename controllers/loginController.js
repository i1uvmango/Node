const asyncHandler = require("express-async-handler");
const User = require('../models/userModel');
const bcrypt = require("bcrypt");

//Login Page
const getLogin = (req,res) => {
    res.render('home');  //로그인 경로
}

//loginUser
const loginUser = asyncHandler(async(req,res) =>{
    const {username, password } = req.body;

    const user = await User.findOne({username});
    if(!user){
        return res.json("아이디가 맞지 않습니다.");
    }

    const isMatch = bcrypt.compare(password, user.password);
    if(!isMatch){
        return res.json("비밀번호가 맞지 않습니다.");
    }

    const token = jwt.sign({id: user._id}, jwtsecret) //sign으로 토큰생성
    res.cookie("token", token, {httpOnly: true});
    res.redirect("/contacts") //로그인 성공시 redirect 경로
})


//회원가입 //POST 경로
const registerUser = asyncHandler(async(req,res) => {
    const {username, password, password2} = req.body;
    if (password === password2){//성공
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await User.create({username, password : hashedPassword});

        res.json({message : "회원가입 성공", user});
        
    }
    else{//fail
        res.send("Failed to Register")
    }
})

