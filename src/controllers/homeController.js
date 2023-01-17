const express = require('express');
const router = express.Router();
//const housingService = require('../services/housingService');

router.get('/', async(req, res) => {
    //let allHousings = await housingService.getAll().lean();
   // allHousings = allHousings.slice(-3);
    res.render('home');
});

module.exports = router;