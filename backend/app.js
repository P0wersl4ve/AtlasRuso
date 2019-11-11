'use strict'

const config = require('./config');
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const fileUpload = require('express-fileupload');

const mongoose = require('mongoose');

// Express setup
const app = express();
app.use(cors());

app.use(bodyParser.json({
    limit: '100mb'
}));
app.use(bodyParser.urlencoded({
    limit: '100mb',
    extended: true
}));

// File upload
app.use(fileUpload());

// Express server
app.listen(config.port, () => {
    console.log('Express Server: \x1b[32m%s\x1b[0m', 'Online');
    console.log('PORT: \x1b[32m%s\x1b[0m', config.port);
});

// MongoDB
mongoose.connect('mongodb://localhost:27017/' + config.database, { useNewUrlParser: true }, err => {
    if (err) throw err;
    console.log('MongoDB: \x1b[32m%s\x1b[0m', 'Online');
});

// JWT token
app.set('superSecret', config.secret); // secret variable
const token_service = require('./services/token.service');

// rutas pertenecientes al dashboard
const login_routes = require('./routes/login.route');
const user_routes = require('./routes/user.route');
const usertypes_routes = require('./routes/usertype.route');

// login
app.use('/api', login_routes);

// token middleware, para protección de las rutas
app.use('/api', token_service);

// rutas que requieren del token
app.use('/api', user_routes);
app.use('/api', usertypes_routes);


// Static files redirection
app.use('/', express.static('frontend', {
    redirect: false
}));
app.use('/assets', express.static(path.resolve('frontend/assets')));
app.use('/uploads', express.static(path.resolve('backend/uploads')));
app.get('*', function(req, res, next) {
    res.sendFile(path.resolve('frontend/index.html'));
});

module.exports = app;