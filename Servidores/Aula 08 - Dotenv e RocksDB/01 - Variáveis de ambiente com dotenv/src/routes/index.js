const express = require('express');
const router = express.Router();
const customerRoutes = require('./customerRoutes')
const productRoutes = require('./productRoutes')
const orderRoutes = require('./orderRoutes')
const userRoutes = require('./userRoutes');
const loginRoutes = require('./loginRoutes');

const permissionVerify = require('./permissionVerify')
const isAdmin = require('./isAdmin')

router.use('/users', userRoutes)
router.use('/login', loginRoutes)

// Middleware para verificar tipo de usuário:
router.use('/customer', permissionVerify, isAdmin, customerRoutes)
router.use('/product', permissionVerify, isAdmin, productRoutes)
router.use('/order', permissionVerify, isAdmin, orderRoutes)

module.exports = router;