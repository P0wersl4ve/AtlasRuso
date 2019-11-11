'use strict'

const express = require('express');
const api = express.Router();

const UserTypeService = require('../services/usertype.service');

api.get('/usertypes/:id?', UserTypeService.getUserTypes);
api.put('/usertypes', UserTypeService.searchUserTypes);
api.post('/usertypes', UserTypeService.saveUserTypes);
api.put('/usertypes/:id', UserTypeService.updateUserTypes);
api.delete('/usertypes/:id', UserTypeService.deleteUserTypes);

module.exports = api;