require('dotenv').config();
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');

var User = require('../../models/user.model');
const { validation } = require('../validation');

module.exports.postSignup = async (req, res, next) => {
    const {error} = validation(req.body);
    if (error) return res.status(400).json({message: error.details[0].message});

    const emailExist = await User.findOne({email: req.body.email});
    if (emailExist) return res.status(400).json({message: "Email already exists."});

    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    const user = new User({
        email: req.body.email,
        password: hashedPassword
    });

    try {
        const newUser = await user.save();
        res.send({user: user._id});

    } catch (err) {
        res.status(400).json({message: err.message});
    }
};

module.exports.postSignin = async (req, res, next) => {
    const {error} = validation(req.body);
    if (error) return res.status(400).json({message: error.details[0].message});

    const user = await User.findOne({email: req.body.email});
    if (!user) return res.status(404).json({message: 'Email is not found.'});
    const validPassword = await bcrypt.compare(req.body.password, user.password);
    if (!validPassword) return res.status(400).json({message: 'Invalid password.'});

    var token = jwt.sign({_id: user._id}, process.env.TOKEN_SECRET);
    res.header('auth-token', token).send(token);
};


