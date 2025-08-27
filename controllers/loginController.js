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

    const user = await User
})


