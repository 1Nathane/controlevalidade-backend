const restful = require('node-restful')
const mongoose = restful.mongoose


const productSchema = new mongoose.Schema({
    name: { type: String, required: true },
    reference: { type: String, maxLength: 20},
    user_email: { type: String, required: true },
    unit_id: [{type: mongoose.Schema.Types.ObjectId, ref: 'Unit', required: true}],
    storageLocation_id: [{type: mongoose.Schema.Types.ObjectId, ref: 'StorageLocation'}],
    brand_id: [{type: mongoose.Schema.Types.ObjectId, ref: 'Brand'}]
})

module.exports = restful.model('Product', productSchema)
