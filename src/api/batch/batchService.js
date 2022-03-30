const Batch = require('./batch')
const errorHandler = require('../common/errorHandler')

Batch.methods(['get', 'post', 'put', 'delete'])
Batch.updateOptions({new: true, runValidators: true})
Batch.after('post', errorHandler).after('put', errorHandler)

Batch.route('list', (req, res, next) => {
    Batch.find({user_id: req.body.user_id}, (error, result) => {
        if(error) {
            res.status(500).json({errors: [error]})
        } else {
            res.json(result || {})
        }
    })
})

Batch.route('count', (req, res, next) => {
    Batch.count((error, value) => {
        if(error) {
            res.status(500).json({errors: [error]})
        } else {
            res.json({value})
        }
    })
})

module.exports = Batch
