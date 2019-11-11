'user strict'

var config = require('../config.js');
const express = require('express');
const jwt = require('jsonwebtoken');

const app = express();
var apiToken = express.Router();

app.set('superSecret', config.secret);

apiToken.use(function(req, res, next) {
    var token = req.body.token || req.query.token || req.headers['token'];
    if (token) {
        jwt.verify(token, app.get('superSecret'), function(err, decoded) {
            if (err) {
                return res.status(401).send({
                    success: false,
                    message: 'Failed to authenticate token.'
                });
            } else {
                req.decoded = decoded;
                next();
            }
        });

    } else {
        return res.status(403).send({
            success: false,
            message: 'No token provided.'
        });

    }
});

module.exports = apiToken;