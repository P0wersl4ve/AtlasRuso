'use strict'

const express = require('express');
const api = express.Router();

const UserService = require('../services/user.service');

api.get('/usuario/:id?', UserService.getUser);
api.put('/usuario', UserService.searchUser);
api.post('/usuario', UserService.saveUser);
api.put('/usuario/:id', UserService.updateUser);
api.delete('/usuario/:id', UserService.deleteUser);

module.exports = api;