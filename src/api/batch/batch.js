const restful = require('node-restful')
const mongoose = restful.mongoose


const batchSchema = new mongoose.Schema({
    name: { type: String, required: true },
    user_email: { type: String, required: true },
    product_id: [{type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true}],
    provider_id: [{type: mongoose.Schema.Types.ObjectId, ref: 'Provider', required: true }],
    quantity: { type: Number, required: true},
    finished: {type: Boolean, default: false},
    status: { type: String, required: true, uppercase: true,
        enum: ['ABERTO', 'FINALIZADO'], default: 'ABERTO'},
    inputDate: { type: Date, default: Date.now, required: true },
    outputDate: { type: Date, required: true }


})

module.exports = restful.model('Batch', batchSchema)
