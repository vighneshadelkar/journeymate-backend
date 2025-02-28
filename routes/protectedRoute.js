const express = require('express');
const jwt = require('jsonwebtoken');  // Import jwt
const User = require('../models/users');

exports.protect = async (req, res, next) => {
    let token;
    if (req.cookies.jwt) {
        token = req.cookies.jwt;
    }

    if (!token) {
        return res.status(401).json({
            status: 'fail',
            message: 'Not logged in'
        });
    }

    try {
        const decoded = await jwt.verify(token, process.env.JWT_SECRET); 

        const currentUser = await User.findById(decoded.id);
        if (!currentUser) {
            return res.status(401).json({
                status: 'fail',
                message: 'User no longer exists'
            });
        }

        req.user = currentUser;
        next();
    } catch (error) {
        return res.status(401).json({
            status: 'fail',
            message: 'Invalid token'
        });
    }
};
