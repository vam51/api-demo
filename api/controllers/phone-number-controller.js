'use strict';
let Promise = require('bluebird');
let dbHelper = require('./../helpers/DataBaseHelper');

module.exports = {getPhoneNumbers, activatePhoneNumber};

function getPhoneNumbers(req, res, next) {
    let customerId = req.swagger.params["customerId"].value;
    dbHelper.findByCustomerId(customerId).then((result)=>{
        res.json(result);    
    },(err)=>{
        res.status(500);
        res.json({
            "errorCode":"503",
            "errorMessage":"Error while fetching the phone numbers"
        });
    });
}

function activatePhoneNumber(req, res, next) {
    let phoneNumber = req.swagger.params["phonenumber"].value;
    dbHelper.findByPhoneNumber(phoneNumber).then((result)=>{
        if(result && result.length == 0){
            res.status(400);
            res.json({
                "errorCode":"404",
                "errorMessage":"Number not found"
            });
        }else{
            let obj = result[0];
            obj.status = "ACTIVE";
            dbHelper.save(phoneNumber,obj).then((r)=>{
                if(r == 1){
                    res.json({
                        "message":"Number activated sucessfully"
                    });
                }
            },(err)=>{
                res.status(500);
                res.json({"errorCode":"502","errorMessage":"Error while updating the status"});
            });
        }
    },(err)=>{
        res.status(500)
        res.json({"errorCode":"501","errorMessage":"Error while fetching the phone number"});
    });
}
