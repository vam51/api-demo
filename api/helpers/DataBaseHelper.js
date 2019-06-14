// Include our "db"
let db = require('../../config/db')();

exports.findByCustomerId = function(id){
    return new Promise(function(resolve,reject){
        try{
            if(id) {
                resolve(db.query({"id":"customerid","value":id}));    
            }else {
                resolve(db.query()); 
            }   
        }catch(err){
            reject(err);
        }
    });
};

exports.findByPhoneNumber = function(id){
    return new Promise(function(resolve,reject){
        try{
            if(id) {
                resolve(db.query({"id":"phonenumber","value":id}));    
            }else {
                resolve(db.query()); 
            }   
        }catch(err){
            reject(err);
        }
    });
};

exports.save = function(id,obj){
    return new Promise(function(resolve,reject){
        try{
            resolve(db.update(id,obj));   
        }catch(err){
            reject(err);
        }
    });
};