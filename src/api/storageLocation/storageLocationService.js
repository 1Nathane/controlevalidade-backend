const StorageLocation = require('./storageLocation')
const errorHandler = require('../common/errorHandler')

StorageLocation.methods(['get', 'post', 'put', 'delete'])
StorageLocation.updateOptions({new: true, runValidators: true})
StorageLocation.after('post', errorHandler).after('put', errorHandler)

StorageLocation.route('list', (req, res, next) => {
    StorageLocation.find({user_id: req.body.user_id}, (error, result) => {
        if(error) {
            res.status(500).json({errors: [error]})
        } else {
            res.json(result || {})
        }
    })
})

StorageLocation.route('count', (req, res, next) => {
    StorageLocation.count((error, value) => {
        if(error) {
            res.status(500).json({errors: [error]})
        } else {
            res.json({value})
        }
    })
})

module.exports = StorageLocation
