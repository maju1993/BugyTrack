"use strict";

var debug = require('debug')('app:routes:' + process.pid),
    _ = require("lodash"),
    util = require('util'),
    path = require('path'),
    utils = require("../modules/jwt-utils.js"),
    Router = require("express").Router,
    UnauthorizedAccessError = require(path.join(__dirname, "..", "errors", "UnauthorizedAccessError.js")),
    User = require(path.join(__dirname, "..", "models", "user.js")),
    jwt = require("express-jwt"),
    accountManager = require('../modules/account-manager'),
    logger = require('winston');

var authenticate = function (req, res, next) {

    debug("Processing authenticate middleware");

    var username = req.body.username,
        password = req.body.password;

    if (_.isEmpty(username) || _.isEmpty(password)) {
        return next(new UnauthorizedAccessError("401", {
            message: 'Invalid username or password'
        }));
    }

    process.nextTick(function () {

        User.findOne({
            username: username
        }, function (err, user) {

            if (err || !user) {
                return next(new UnauthorizedAccessError("401", {
                    message: 'Invalid username or password'
                }));
            }
            accountManager.login(username, password, function (error) {
                if(error){
                    return next(new UnauthorizedAccessError("401", {
                        message: 'Invalid username or password'
                    }));
                }
                debug("User authenticated, generating token");
                utils.create(user, req, res, next);
            })
        });

    });


};

module.exports = function (router) {
    router.route("/verify").get(function (req, res, next) {
        return res.status(200).json(undefined);
    });

    router.route("/logout").get(function (req, res, next) {
        if (utils.expire(req.headers)) {
            delete req.user;
            return res.status(200).json({
                "message": "User has been successfully logged out"
            });
        } else {
            return next(new UnauthorizedAccessError("401"));
        }
    });

    router.route("/login").post(authenticate, function (req, res, next) {
        return res.status(200).json(req.user);
    });

    router.unless = require("express-unless");

    return router;
};

debug("Loaded");