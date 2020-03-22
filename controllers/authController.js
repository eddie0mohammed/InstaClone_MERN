
const crypto = require('crypto');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const User = require('../models/user');
const sendMail = require('../utils/email');


const register = async (req, res, next) => {

    const {userName, email, password } = req.body;
    if (!userName || !email || !password){
        return res.status(400).json({
            status: 'fail',
            error: 'Username, email and password are required'
        });
    }

    //validate date from req.body => todo

    //check if email exists in DB
    const emailExists = await User.findOne({email: req.body.email});
    if (emailExists){
        return res.status(400).json({
            status: 'fail',
            error: 'Email already exists in database'
        });
    }

    //hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    //activationToken
    const activationToken = crypto.randomBytes(32).toString('hex');
    // console.log(activationToken);
    // const hashedToken = await bcrypt.hash(activationToken, salt);
    

    const newUser = new User({
        userName: req.body.userName,
        email: req.body.email,
        password: hashedPassword,
        activationToken: activationToken

    });

    
    //activation url
    const activationURL = `${req.protocol}://${req.get('host')}/auth/validate/${activationToken}`;
    
    //message
    const message = `Click here to activate your profile and login: ${activationURL}`;
    try{

        await newUser.save();

        //send email
        await sendMail({
            email: 'test@test.com',
            subject: 'ACTIVATION EMAIL',
            message: message
        });

        res.status(201).json({
            status: 'success',
            data: {
                user: newUser
            }
        });

    }catch(err){
        console.log(err);
        res.status(400).json({
            status: 'fail',
            error: err
        });
    }

}




const login = async (req, res, next) => {

    const {email, password} = req.body;
    if (!email || !password){
        return res.status(400).json({
            status: 'fail',
            error: 'Email and password are required'
        });
    }

    //validate req.body => todo

    //check if user exists in db
    const user = await User.findOne({email: req.body.email});
    if (!user){
        return res.status(400).json({
            status: 'fail',
            error: "User not found"
        });
    }


    try{
        // //check if user is active => if not error 
        // if (!user.active){
        //     return res.status(401).json({
        //         status: 'fail',
        //         error: 'Invalid credentials'
        //     })
        // }
        
        //check of password match
        const isMatch = await bcrypt.compare(req.body.password, user.password);
        if (!isMatch){
            return res.status(400).json({
                status: 'fail',
                error: 'Invalid credentials'
            });
        }

        //token
        const token = jwt.sign({id: user._id}, process.env.JWT_SECRET, {expiresIn: 3600});
        res.header('auth-token', token);

        res.status(200).json({
            status:'success',
            token: token,
            data: {
                user: user
            }
        });



    }catch(err){
        console.log(err);
        res.status(400).json({
            status: 'fail',
            error: err
        });
    }

}



const getUser = async (req, res, next) => {

    try{

        const user = await User.findById(req.user.id);
        if (!user){
            return res.status(401).json({
                status: 'fail', 
                error: 'Unauthorized'
            });    
        }

        res.status(200).json({
            status: 'success',
            data: {
                user: user
            }
        });

    }catch(err){
        console.log(err);
        res.status(401).json({
            status: 'fail', 
            error: err
        });
    }
}


const activateUser = async (req, res, next) => {

    const token = req.params.token;
    // const salt = await bcrypt.genSalt(10);
    // const hashedToken = await bcrypt.hash(token, salt);

    try{

        const user = await User.findOne({activationToken: token});
    
        if (!user){
            return res.status(400).json({
                status: 'fail',
                error: 'User not found',
                hashedToken: hashedToken
            });
        }

        user.active = true;
        await user.save() ;
        res.redirect('http://localhost:3000/auth/login');
        
        // return res.status(200).json({
        //     status: 'success',
        //     user: user
        // });


    }catch(err){
        console.log(err);
    }

    
}


module.exports = {
    register: register,
    login: login,
    getUser: getUser,
    activateUser: activateUser
}