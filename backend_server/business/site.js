var Mongoose = require('mongoose');
var SiteModel = require('../models/siteModel');
var util = require('../utils/util');
var mongoose = require('mongoose');
/* system listing. */
exports.list = function(req, res, next) {
    if(req.userId==="5c3dce2b5a0e170a74e608c6"){
        SiteModel.find(function(err, r) {
            if (!err) {
                res.json(util.resJson({
                    IsSuccess: true,
                    Data: r
                }));
            } else {
                res.json(util.resJson({
                    IsSuccess: false,
                    Data: null
                }));
            }
        });
    }else{
        SiteModel.find({ userId: req.userId }, function(err, r) {
            if (!err) {
                res.json(util.resJson({
                    IsSuccess: true,
                    Data: r
                }));
            } else {
                res.json(util.resJson({
                    IsSuccess: false,
                    Data: null
                }));
            }
        });
    }
};

exports.create = function(req, res, next) {
    var ObjectId = mongoose.Types.ObjectId;
    var id1 = new ObjectId;
    var temp = new SiteModel({
        appName: req.body.appName,
        disableHook: false,
        disableJS: false,
        appKey: id1,
        id: id1,
        userId: req.userId
    });
    temp.save(function(err, r) {
        console.log(err);

        if (!err) {
            res.json(util.resJson({
                IsSuccess: true,
                Data: r
            }));
        } else {
            res.json(util.resJson({
                IsSuccess: false,
                Data: null
            }));
        }
    });

};


exports.update = function(req, res, next) {
    let id = new Mongoose.Types.ObjectId(req.body.id);
    SiteModel.findOneAndUpdate({
        id: id
    }, {
        disableHook: req.body.disableHook,
        disableJS: req.body.disableJS,
        disableResource: req.body.disableResource
    }, function(err, r) {
        if (!err) {
            res.json(util.resJson({
                IsSuccess: true,
                Data: null
            }));
        } else {
            res.json(util.resJson({
                IsSuccess: false,
                Data: null
            }));
        }
    });
};