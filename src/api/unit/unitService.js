const Unit = require('./unit')
const errorHandler = require('../common/errorHandler')

Unit.methods(['get', 'post', 'put', 'delete'])
Unit.updateOptions({new: true, runValidators: true})
Unit.after('post', errorHandler).after('put', errorHandler)

Unit.route('list', (req, res, next) => {
    Unit.find({user_id: req.body.user_id}, (error, result) => {
        if(error) {
            res.status(500).json({errors: [error]})
        } else {
            res.json(result || {})
        }
    })
})

Unit.route('count', (req, res, next) => {
    Unit.count((error, value) => {
        if(error) {
            res.status(500).json({errors: [error]})
        } else {
            res.json({value})
        }
    })
})

module.exports = Unit
