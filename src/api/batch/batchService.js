const Batch = require('./batch')
const errorHandler = require('../common/errorHandler')
const moment = require('moment')
const Product = require('../product/product')

Batch.methods(['get', 'post', 'put', 'delete'])
Batch.updateOptions({ new: true, runValidators: true })
Batch.after('post', errorHandler).after('put', errorHandler)

function daysPlusDate(data, dias) {
    return (moment(data).add(dias, 'days').toDate())
}


Batch.route('count', (req, res, next) => {
    Batch.count((error, value) => {
        if (error) {
            res.status(500).json({ errors: [error] })
        } else {
            res.json({ value })
        }
    })
})

Batch.route('expired', (req, res, next) => {
    Batch.count({ outputDate: { $lt: Date.now() } }
        , (error, result) => {
            if (error) {
                res.status(500).json({ errors: [error] })
            } else {
                res.json({ expired: result })
            }
        })
})

Batch.route('expiremonth', (req, res, next) => {
    Batch.count({ $and: [{ outputDate: { $gt: Date.now() } }, { outputDate: { $lt: daysPlusDate(Date.now(), 30) } }] }, (error, result) => {
        if (error) {
            res.status(500).json({ errors: [error] })
        } else {
            res.json({ expiremonth: result })
        }
    })
})

Batch.route('expireaftermonth', (req, res, next) => {
    Batch.count({ outputDate: { $gt: daysPlusDate(Date.now(), 30) } }, (error, result) => {
        if (error) {
            res.status(500).json({ errors: [error] })
        } else {
            res.json({ expireaftermonth: result })
        }
    })
})

Batch.route('summary', (req, res, next) => {

    Batch.aggregate([
        {
            $match:
            {
               status: 'ABERTO' 
            }
        },{
           $lookup:
           {
               from: "products",
               localField: "product_id",
               foreignField:"_id",
               as: "product"
           }
        },{
            $project:
            {
                batch: "$name",
                user_email: '$user_email',
                product: '$product.name',
                inputDate: '$inputDate',
                outputDate:'$outputDate',
                quantity: "$quantity"
            }
        },{
            $sort:
            {
                outputDate: 1
            }
        }



    ])

        .exec((error, result) => {
            if (error) {
                res.status(500).json({ errors: [error] })
            } else {
                res.json( result )
            }
        })
})

Batch.route('outputdateyear', (req, res, next) => {

    Batch.aggregate([
        {
            $match:
            {
               status: 'ABERTO' 
            }
        },{
            $group: {
              _id: {
                year: {$year: "$outputDate"},
                month: {$month: '$outputDate'},
                user_email: "$user_email",
              },
              total: {$sum: 1}
            }
        },{
            $project: {
                _id: 0,
               year: "$_id.year",
               month: "$_id.month",
               user_email: "$_id.user_email",
               total: "$total" 
            }
        }



    ])

        .exec((error, result) => {
            if (error) {
                res.status(500).json({ errors: [error] })
            } else {
                res.json( result )
            }
        })
})



module.exports = Batch
