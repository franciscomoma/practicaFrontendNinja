var $ = require('jquery');

var API_URL = "/api/comments/";

module.exports = {

    list: function(post, successCallback, errorCallback) {
        $.ajax({
            url: API_URL,
            type: "get",
            data: {
                post: post
            },
            success: function(data) {
                successCallback(data);
            },
            error: function(error) {
                errorCallback(error);
            }
        })
    },

    create: function(comment, successCallback, errorCallback) {
        $.ajax({
            url: API_URL,
            type: "post",
            data: comment,
            contentType: "application/json; charset=UTF-8",
            traditional: true,
            success: function(data) {
                successCallback(data);
            },
            error: function(error) {
                errorCallback(error);
            }
        });
    }

};