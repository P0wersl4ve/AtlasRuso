'use strict'

var config = require('../config.js');
const User = require('../models/user.model');
const UserTypes = require('../models/usertype.model');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const express = require('express');
const app = express();

app.set('superSecret', config.secret);

function auth(req, res) {
    const params = req.body;
    const username = params.username;
    const password = params.password;

    User.findOne({
        email: username
    }).populate('tipo').exec((err, userStored) => {
        if (err) {
            return res.status(404).send({
                message: 'Error en la petición.', err
            });
        }
        if (!userStored || !bcrypt.compareSync(password, userStored.password)) {
            return res.status(422).send({
                message: 'Usuario o contraseña incorrectos'
            });
        }
        let token = jwt.sign(userStored.toJSON(), app.get('superSecret'), {
            expiresIn: '1d' // expira en 1 dias
        });
        res.status(200).send({
            id: userStored._id,
            email: userStored.email,
            nombres: userStored.firstName,
            apellidos: userStored.lastName,
            token: token,
            menu: userStored.tipo.permisos
        });
    });
}


function init(req, res) {
    let userType = new UserTypes;
    let userTypeId;
    let user = new User;

    userType.nombre = 'Administrador';
    userType.permisos = [
        {
            titulo: "Dashboard",
            icono: "mdi mdi-chart-bar",
            url: "/dashboard",
            permiso: true
        },
        {
            titulo: 'Alumnos',
            icono: 'mdi mdi-account-multiple',
            url: '/alumnos',
            permiso: true
        },
        {
            titulo: 'Profesores',
            icono: 'mdi mdi-account-multiple',
            url: '/profesores',
            permiso: true
        },
        {
            titulo: 'Planteles',
            icono: 'mdi mdi-stadium',
            url: '/planteles',
            permiso: true
        },
        {
            titulo: 'Torneos',
            icono: 'mdi mdi-trophy',
            url: '/torneos',
            permiso: true
        },
        {
            titulo: 'Configuracion',
            icono: 'mdi mdi-account-settings-variant',
            url: '/configuracion',
            permiso: true
        }
    ];

    user.nombre = 'Admin';
    user.apellidos = 'Admin';
    user.email = 'admin@admin.com';
    user.password = 'admin';

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
            userTypeId = userTypeStored._id;
            user.tipo = userTypeId;
            user.save((err, userStored) => {
                if (err) {
                    console.log(err);
                    return res.status(500).send({
                        message: 'err', err
                    });
                } else {
                    if (!userStored) {
                        return res.status(404).send({
                            message: 'No se guardo el User'
                        });
                    }
                    res.status(200).send({
                        user: userStored
                    });
                }
            });
        }
    });

}


module.exports = {
    init,
    auth
};