const Crypto = require('../models/Crypto');

exports.create = (cryptoData) => Crypto.create(cryptoData);   
exports.getAll = () => Crypto.find();
// exports.getOne = (housingId) => Housing.findById(housingId);

// exports.getOneDetailed = (housingId) => Housing.findById(housingId).populate('rentedAHome');

// exports.update = (housingId, housingData) => Housing.findOneAndUpdate({_id: housingId}, {$set: housingData}, {runValidators: true});
// exports.del = (housingId) => Housing.findByIdAndDelete(housingId);
// exports.getSpecificByType = (type) => Housing.find({type: {$regex: type, $options: 'i'}});

// exports.rent = async (housingId, userId) => {
//     const housingForRent = await Housing.findById(housingId);
//     housingForRent.rentedAHome.push(userId);
//     housingForRent.availablePieces-=1;
//     await housingForRent.save();
// }
