const express = require('express');
const AuthRouter = express.Router();
const bcrypt = require('bcrypt');
const User = require('../models/users');
const dotenev = require('dotenv').config();
const jwtsecretkey = process.env.jwtsecretkey;
const jwt = require('jsonwebtoken');

const generateToken = (user, res) => {
    const token = jwt.sign({
        id: user._id,
        email: user.email,
        username: user.username
    }, jwtsecretkey, {
        expiresIn: '7d'
    });

    res.cookie('jwt', token, {
        httpOnly: true,
        maxAge: 7 * 24 * 60 * 60 * 1000
    })

    res.status(200).json({
        status: 'sucess',
        token,
    })
}

const register = async (req, res) => {
    try {
        const { email, username, password } = req.body;

        if (!username || !email || !password) {
            return res.status(400).json({
                message: "All fields are required"
            });
        }

        const existingUser = await User.findOne({ email });

        if (existingUser) {
            res.status(400).json({
                message: "user already exists"
            });
        }

        const encryptedPassword = await bcrypt.hash(password, 10);

        const user = new User({
            username,
            email,
            password: encryptedPassword
        })

        const savedUser = await user.save();

        generateToken(savedUser, res);

    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: "server error"
        });
    }
};

const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });
        if (!user || !(await bcrypt.compare(password, user.password))) {
            return res.status(401).json({ status: 'fail', message: 'Invalid email or password' });
        }
        generateToken(user, res);
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: "server error"
        });
    }
};

module.exports = {
    register,
    login
};