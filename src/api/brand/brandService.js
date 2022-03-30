const Brand = require('./brand')
const errorHandler = require('../common/errorHandler')

Brand.methods(['get', 'post', 'put', 'delete'])
Brand.updateOptions({new: true, runValidators: true})
Brand.after('post', errorHandler).after('put', errorHandler)

Brand.route('list', (req, res, next) => {
    Brand.find({"user_email": req.headers.email}, (error, result) => {
        if(error) {
            res.status(500).json({errors: [error]})
        } else {
            res.json(result || {})
        }
    })
})

Brand.route('count', (req, res, next) => {
    Brand.count((error, value) => {
        if(error) {
            res.status(500).json({errors: [error]})
        } else {
            res.json({value})
        }
    })
})

module.exports = Brand
