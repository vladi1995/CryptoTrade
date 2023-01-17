const express = require('express');
const router = express.Router();
const authService = require('../services/authService');
const { getErrorMessage } = require('../utils/errorHelpers');
const { COOKIE_NAME } = require('../config/constants');
const { isGuest, isAuth } = require('../middlewares/authMiddleware');

router.get('/register', isGuest, (req, res) => {
    res.render('auth/register');
});

router.post('/register', isGuest, async (req, res) => {
    const {username, email, password, repeatPassword} = req.body;
    
    if (password !== repeatPassword) {
        return res.render('auth/register', {username, email, error: 'Password mismatch!'});
    }

    const objOfUser = {
        username,
        email,
        password,
    }

    try {
        const createdUser = await authService.create(objOfUser);
        const token = await authService.createToken(createdUser);

        res.cookie(COOKIE_NAME, token, {httpOnly: true});
        res.redirect('/');
    } catch (err) {
        return res.render('auth/register', {username, email, error: getErrorMessage(err)});
    }
});

router.get('/login', isGuest, (req, res) => {
    res.render('auth/login');
});

router.post('/login', isGuest, async (req, res) => {
    const {email, password} = req.body;
    
    try {
        const userFound = await authService.login(email, password);
        const token = await authService.createToken(userFound);

        res.cookie(COOKIE_NAME, token, {httpOnly: true});
        res.redirect('/');
    } catch (err) {
        return res.render('auth/login', {email, error: getErrorMessage(err)});
    }
});

router.get('/logout', isAuth, (req, res) => {
    res.clearCookie(COOKIE_NAME);
    res.redirect('/');
});

module.exports = router;