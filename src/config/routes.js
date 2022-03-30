const express = require('express')
const auth = require('./auth')

module.exports = function (server) {

    /*
     * Rotas protegidas por Token JWT
     */
    const protectedApi = express.Router()
    server.use('/api', protectedApi)

    protectedApi.use(auth)

    const StorageLocation = require('../api/storageLocation/storageLocationService')
    StorageLocation.register(protectedApi, '/storageLocation')

    const Brand = require('../api/brand/brandService')
    Brand.register(protectedApi, '/brand')

    const Unit = require('../api/unit/unitService')
    Unit.register(protectedApi, '/unit')

    const Provider = require('../api/provider/providerService')
    Provider.register(protectedApi, '/provider')

    const Product = require('../api/product/productService')
    Product.register(protectedApi, '/product')

    const Batch = require('../api/batch/batchService')
    Batch.register(protectedApi, '/batch')


    /*
     * Rotas abertas
     */
    const openApi = express.Router()
    server.use('/oapi', openApi)

    const AuthService = require('../api/user/authService')
    openApi.post('/login', AuthService.login)
    openApi.post('/signup', AuthService.signup)
    openApi.post('/validateToken', AuthService.validateToken)
}
