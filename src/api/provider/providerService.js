const Provider = require('./provider')
const errorHandler = require('../common/errorHandler')

Provider.methods(['get', 'post', 'put', 'delete'])
Provider.updateOptions({new: true, runValidators: true})
Provider.after('post', errorHandler).after('put', errorHandler)

Provider.route('list', (req, res, next) => {
    Provider.find({user_id: req.body.user_id}, (error, result) => {
        if(error) {
            res.status(500).json({errors: [error]})
        } else {
            res.json(result || {})
        }
    })
})

Provider.route('count', (req, res, next) => {
    Provider.count((error, value) => {
        if(error) {
            res.status(500).json({errors: [error]})
        } else {
            res.json({value})
        }
    })
})

module.exports = Provider
