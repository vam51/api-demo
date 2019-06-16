'use strict';
let Promise = require('bluebird');
let dbHelper = require('./../helpers/DataBaseHelper');

module.exports = {getPhoneNumbers, activatePhoneNumber};

function getPhoneNumbers(req, res, next) {
    console.debug("Inside getPhoneNumbers")
    let customerId = req.swagger.params["customerId"].value;
    console.info("Get phone numbers for customer id:"+customerId);
    dbHelper.findByCustomerId(customerId).then((result)=>{
        console.info("Result:"+result);
        res.json(result);    
    },(err)=>{
        console.error(err);
        res.status(500);
        res.json({
            "errorCode":"503",
            "errorMessage":"Error while fetching the phone numbers"
        });
    });
}

function activatePhoneNumber(req, res, next) {
    console.debug("Inside activatePhoneNumber")
    let phoneNumber = req.swagger.params["phonenumber"].value;
    console.info("Started activation for phone number:"+phoneNumber);
    dbHelper.findByPhoneNumber(phoneNumber).then((result)=>{
        if(result && result.length == 0){
            console.info("Unable to find the phone number:"+phoneNumber);
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
                    console.info("Activation success for phone number:"+phoneNumber);
                    res.json({
                        "message":"Number activated sucessfully"
                    });
                }
            },(err)=>{
                console.error(err);
                res.status(500);
                res.json({"errorCode":"502","errorMessage":"Error while updating the status"});
            });
        }
    },(err)=>{
        console.error(err);
        res.status(500)
        res.json({"errorCode":"501","errorMessage":"Error while fetching the phone number"});
    });
}
