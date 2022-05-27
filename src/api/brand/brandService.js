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

// Brand.route('count', (req, res, next) => {
//     Brand.count((error, value) => {
//         if(error) {
//             res.status(500).json({errors: [error]})
//         } else {
//             res.json({value})
//         }
//     })
// })

Brand.route('count', (req, res, next) => {

    Batch.aggregate([
        // {
        //     $match:
        //     {
        //         user_email: req.headers.email 
        //     }
        // },
        {
            $project: {
                _id: "$_id.user_email",
               total: { $sum: 1 }
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

module.exports = Brand
