'use strict'

const UserTypes = require('../models/usertype.model');

function getUserTypes(req, res) {
    const id = req.params.id;
    if (!id) {
        var find = UserTypes.find({}).sort('nombre');
    } else {
        var find = UserTypes.findById(id);
    }

    find.exec((err, userTypes) => {
        if (err) {
            return res.status(500).send({
                message: 'Error al pedir UserTypes'
            })
        } else if (!userTypes) {
            return res.status(404).send({
                message: 'No hay UserTypes'
            })
        }
        res.status(200).send({
            userTypes: userTypes
        });
    });

};

function searchUserTypes(req, res) {
    let params = req.body;
    var find = UserTypes.find(params);

    find.exec((err, userTypes) => {
        if (err) {
            return res.status(500).send({
                message: 'Error al pedir userTypes'
            })
        } else if (!userTypes) {
            return res.status(404).send({
                message: 'No hay userTypes'
            })
        }

        res.status(200).send({
            userTypes: userTypes

        });
    });
};


function saveUserTypes(req, res) {
    var userType = new UserTypes;
    const params = req.body;
  
    userType.nombre = params.nombre;
    userType.permisos = params.permisos;
  
    userType.save((err, userTypeStored) => {
      if (err) {
        return res.status(500).send({
          message: 'Error en la petición.'
        });
      } else {
        if (!userTypeStored) {
          return res.status(404).send({
            message: 'No se guardo la userType'
          });
        }
        res.status(200).send({
          userTypes: userTypeStored
        });
      }
    });
};

function updateUserTypes(req, res) {
    const id = req.params.id;
    const update = req.body;
    console.log(update.permisos[0].url.value);
    UserTypes.findByIdAndUpdate(id, update, (err, userTypeUpdated) => {
      if (err) {
        return res.status(500).send({
          message: 'Error en la peticion de update '
        });
      } else if (!userTypeUpdated) {
        return res.status(500).send({
          message: 'No se ha actualizado userType'
        });
      }
      res.status(200).send({
        userTypes: userTypeUpdated
      });
    });
};


function deleteUserTypes(req, res) {
    var id = req.params.id;
    UserTypes.findByIdAndRemove(id, (err, userTypeRemoved) => {
      if (err) {
        return es.status(500).send({
          message: 'Error en la peticion de delete '
        });
      } else if (!userTypeRemoved) {
        return es.status(500).send({
          message: 'No se ha eliminado userType'
        });
      }
      res.status(200).send({
        userTypes: userTypeRemoved
      });
    });
};

module.exports = {
    getUserTypes,
    searchUserTypes,
    saveUserTypes,
    updateUserTypes,
    deleteUserTypes
};