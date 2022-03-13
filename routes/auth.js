var express = require('express');
var router = express.Router();
const User = require('../model/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const verify = require('./verifyToken')
const { registerValidation, loginValidation } = require('../validation');
module.exports = router;

// Registration Routes
router.post('/register', async (req, res) => {
    //Validate data before making user
    const validation = registerValidation(req.body);
    if (validation.error) {
        return res.status(400).send(validation.error.details[0].message);
    }

    //Checking if the user is already in the database
    const emailExist = await User.findOne({ email: req.body.email });
    if (emailExist) return res.status(400).send('Email already exists');

    //Hash passwords
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    //Create a new user
    const user = new User({
        email: req.body.email,
        password: hashedPassword
    });
    try {
        const savedUser = await user.save();
        res.send({ 'user': user._id });
    } catch (e) {
        res.status(400).send(err)
    }
});

// Registration Routes
router.post('/register', async (req, res) => {
    //Validate data before making user
    const validation = registerValidation(req.body);
    if (validation.error) {
        return res.status(400).send(validation.error.details[0].message);
    }

    //Checking if the user is already in the database
    const emailExist = await User.findOne({ email: req.body.email });
    if (emailExist) return res.status(400).send('Email already exists');

    //Hash passwords
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    //Create a new user
    const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: hashedPassword
    });
    try {
        const savedUser = await user.save();
        res.send({ 'user': user._id });
    } catch (e) {
        res.status(400).send(err)
    }
});