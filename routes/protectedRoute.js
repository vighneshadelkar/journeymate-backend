const express = require('express');
const User = require('../models/users');

exports.protect = async (req, res, next) => {
    let token;
    if (req.cookies.jwt) {
        token = req.cookies.jwt;
    }

    if (!token) {
        return res.status(401).json({
            status: 'fail',
            message: 'not logged in'
        });
    }

    try {
        const decoded = await jwt.verify(token, jwtsecretkey);

        const currentUser = await User.findById(decoded.id);

        if (!currentUser) {
            return res.status(401).json({
                status: 'fail',
                message: 'user no longer exists'
            });
        }
        req.user = currentUser;
        next();
    } catch (error) {

    }
};