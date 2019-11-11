'use strict'

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserTypesSchema = Schema({
    nombre: String,
    permisos: [{
      titulo: String,
      icono: String,
      url: String,
      permiso: Boolean
    }]
});

module.exports = mongoose.model('UserTypes', UserTypesSchema);