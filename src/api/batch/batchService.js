const Batch = require('./batch')
const errorHandler = require('../common/errorHandler')
const moment = require('moment')

Batch.methods(['get', 'post', 'put', 'delete'])
Batch.updateOptions({new: true, runValidators: true})
Batch.after('post', errorHandler).after('put', errorHandler)

function daysPlusDate(data, dias) {
    return (moment(data).add(dias, 'days').toDate())
}


Batch.route('count', (req, res, next) => {
    Batch.count((error, value) => {
        if(error) {
            res.status(500).json({errors: [error]})
        } else {
            res.json({value})
        }
    })
})

Batch.route('expired', (req, res, next) => {
    Batch.count( {$and: [{outputDate:{$lt: Date.now()}}, {user_email:{$eq: req.body.user_email}}]}
         
    , (error, result) => {
        if(error) {
            res.status(500).json({errors: [error]})
        } else {         
            res.json(result)
        }   
    })
})

Batch.route('expiremonth', (req, res, next) => {
    Batch.count({$and:[{outputDate:{$gt: Date.now()}},{outputDate:{$lt: daysPlusDate(Date.now(),30)}}]}, (error, result) => {
        if(error) {
            res.status(500).json({errors: [error]})
        } else {
            res.json({result})
        }   
    })
})

Batch.route('expireaftermonth', (req, res, next) => {
    Batch.count({outputDate:{$gt: daysPlusDate(Date.now(),30)}}, (error, result) => {
        if(error) {
            res.status(500).json({errors: [error]})
        } else {
            res.json({result})
        }   
    })
})

module.exports = Batch
