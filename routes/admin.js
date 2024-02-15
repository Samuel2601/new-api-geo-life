'use strict'

const express = require('express');
const AdminController = require('../controllers/AdminController');


const api = express.Router();
const auth = require('../middlewares/authenticate');
const multiparty = require('connect-multiparty');
const path = multiparty({uploadDir: './uploads/instituciones'});

api.get('/obtener_portada/:img',AdminController.obtener_portada);
api.post('/newpassword',auth.auth,AdminController.newpassword);
api.post('/forgotpassword',AdminController.forgotpassword);
api.post('/login_admin',AdminController.login_admin);
api.get('/listar_registro',auth.auth,AdminController.listar_registro);
api.get('/verificar_token',auth.auth,AdminController.verificar_token);


module.exports = api;