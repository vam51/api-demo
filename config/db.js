'use strict;'
var _ = require('lodash');
module.exports = function() {
    return {
        phoneNumberList : [
            {"phonenumber":"0400000011","customerid":"C1","status":"ACTIVE"},
            {"phonenumber":"0400000012","customerid":"C1","status":"READY"},
            {"phonenumber":"0400000013","customerid":"C1","status":"ACTIVE"},
            {"phonenumber":"0400000021","customerid":"C2","status":"ACTIVE"},
            {"phonenumber":"0400000022","customerid":"C2","status":"READY"},
            {"phonenumber":"0400000031","customerid":"C3","status":"ACTIVE"},
            {"phonenumber":"0400000041","customerid":"C4","status":"READY"},
        ],
        /*
         * Retrieve a movie with a given id or return all the movies if the id is undefined.
         */
        query(params) {
            if(params) {
                return _.filter(this.phoneNumberList, function(o){return o[params.id]===params.value});
            }else {
                return this.phoneNumberList;
            }
        },
        /*
         * Update a movie with the given id
         */
        update(id, obj) {
            var index = this.phoneNumberList.findIndex(element => {
                return element["phonenumber"] === id;
            });
            if(index !== -1) {
                this.phoneNumberList[index] = obj;
                return 1;
            }else {
                return 0;
            }
        }        
    }
};