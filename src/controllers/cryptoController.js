const express = require('express');
const mongoose = require('mongoose');
const { isAuth } = require('../middlewares/authMiddleware');
const cryptoService = require('../services/cryptoService');
const { preloadCrypto, isCryptoOwner, isNotCryptoOwner } = require('../middlewares/cryptoMiddleware');
const { getErrorMessage } = require('../utils/errorHelpers');
const router = express.Router();

router.get('/create', isAuth, (req, res) => {
    res.render('crypto/create');
});

router.post('/create', isAuth, async(req, res) => {
    const cryptoData = {...req.body, buyACrypto: [], owner: req.user._id};
    try {
        const crypto = await cryptoService.create(cryptoData);
        res.redirect('/crypto/catalog');
    } catch (error) {
        return res.render('crypto/create', {...req.body, error: getErrorMessage(error)});
    }
});

module.exports = router;

router.get('/catalog', async (req, res) => {
    const allCrypto = await cryptoService.getAll().lean();
    res.render('crypto/catalog', {allCrypto});
});

// router.get('/details/:housingId', async (req, res) => {
//     const housing = await housingService.getOne(req.params.housingId).lean();
//     const isRented = housing.rentedAHome.map(x => x.toString()).includes(req.user?._id);
//     const isOwner = housing.owner == req.user?._id;
    
//     const getOneDetailed = await housingService.getOneDetailed(req.params.housingId);
//     const names = getOneDetailed.rentedAHome.map(x => x.name).join(', ');

//     res.render('housing/details', {...housing, isOwner, isRented, names});
// });

// router.get('/edit/:housingId', isAuth, preloadHousing, isHousingOwner, (req, res) => {
//     res.render('housing/edit', {...req.housing});
// });

// router.post('/edit/:housingId', isAuth, preloadHousing, isHousingOwner, async (req, res) => {
//     try {
//         await housingService.update(req.params.housingId, req.body);
//         res.redirect(`/housing/details/${req.params.housingId}`);
//     } catch (error) {
//         res.render('housing/edit', {...req.body, error: getErrorMessage(error)});
//     }
// });

// router.get('/delete/:housingId', isAuth, preloadHousing, isHousingOwner, async (req, res) => {
//     await housingService.del(req.params.housingId);
//     res.redirect('/housing/housingForRent');
// });

// router.get('/rent/:housingId', preloadHousing, isNotHousingOwner, async (req, res) => {
//     await housingService.rent(req.params.housingId, req.user._id);
//     res.redirect(`/housing/details/${req.params.housingId}`);
// });

// router.get('/search', async(req, res) => {
//     res.render('housing/search');
// });

// router.post('/search', async(req, res) => {
//     const foundedElements = await housingService.getSpecificByType(req.body.search).lean();
//     res.render('housing/search', {foundedElements});
// });

