'use strict'

const express = require('express');
const api = express.Router();

const LoginService = require('../services/login.service');

api.post('/login', LoginService.auth);
api.get('/init', LoginService.init);

module.exports = api;