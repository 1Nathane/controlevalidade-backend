const Product = require('./product')
const errorHandler = require('../common/errorHandler')

Product.methods(['get', 'post', 'put', 'delete'])
Product.updateOptions({new: true, runValidators: true})
Product.after('post', errorHandler).after('put', errorHandler)

Product.route('list', (req, res, next) => {
    Product.find({user_id: req.body.user_id}, (error, result) => {
        if(error) {
            res.status(500).json({errors: [error]})
        } else {
            res.json(result || {})
        }
    })
})

Product.route('count', (req, res, next) => {
    Product.count((error, value) => {
        if(error) {
            res.status(500).json({errors: [error]})
        } else {
            res.json({value})
        }
    })
})

module.exports = Product
