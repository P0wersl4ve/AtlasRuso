'use strict'

const User = require('../models/user.model');
const bcrypt = require('bcryptjs');

function getUser(req, res) {
    const id = req.params.id;
    var find;
    if (!id) {
      find = User.find({});
    } else {
      find = User.findById(id);
    }
  
    find.populate('tipo')
      .exec((err, user) => {
        if (err) {
          return res.status(500).send({
            message: 'Error al pedir User'
          });
        } else if (!user) {
          return res.status(404).send({
            message: 'No hay User'
          });
        }
        res.status(200).send({
          user: user
        });
  
      });
};


function searchUser(req, res) {
    let params = req.body;
    var find = User.find(params);
  
    find.populate('tipo')
      .exec((err, user) => {
        if (err) {
          return res.status(500).send({
            message: 'Error al pedir usuario', err
          });
        } else if (!user) {
          return res.status(404).send({
            message: 'No se ha encontrado el usuario'
          });
        }
  
        res.status(200).send({
          user: user
        });
      });
};


function saveUser(req, res) {
    var user = new User();
    const params = req.body;
    user.nombre = params.nombre;
    user.apellidos = params.apellidos;
    user.email = params.email;
    user.tipo = params.tipo;
    user.password = params.password;
  
    user.save((err, userStored) => {
      if (err) {
        return res.status(500).send({
          message: 'Ha ocurrido un error', err
        });
      } else {
        if (!userStored) {
          return res.status(404).send({
            message: 'No se ha guardado el usuario'
          });
        }
        res.status(200).send({
          user: userStored
        });
      }
    });
};

function updateUser(req, res) {
    const id = req.params.id;
    let update = req.body;
  
    if (update.password) {
      const saltRounds = Math.floor(Math.random() * 11);
      let salt = bcrypt.genSaltSync(saltRounds);
      update.password = bcrypt.hashSync(update.password, salt);
    }
  
    User.findByIdAndUpdate(id, update, (err, userUpdated) => {
      if (err) {
        return res.status(500).send({
          message: 'Error en la peticion de update', err
        });
      } else if (!userUpdated) {
        return res.status(500).send({
          message: 'No se ha actualizado el usuario'
        });
      }
      res.status(200).send({
        user: userUpdated
      });
    });
};


function deleteUser(req, res) {
    var id = req.params.id;
    User.findByIdAndRemove(id, (err, userRemoved) => {
      if (err) {
        return res.status(500).send({
          message: 'Error en la peticion de delete', err
        });
      } else if (!userRemoved) {
        return res.status(500).send({
          message: 'No se ha eliminado el usuario'
        });
      }
      res.status(200).send({
        user: userRemoved
      });
    });
  
};

module.exports = {
    getUser,
    searchUser,
    saveUser,
    updateUser,
    deleteUser
};