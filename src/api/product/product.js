const restful = require('node-restful')
const mongoose = restful.mongoose


const productSchema = new mongoose.Schema({
    name: { type: String, required: [true, 'O campo Nome é obrigatório!'] },
    reference: { type: String, maxLength: [20, 'O campo Referência pode possuir no máximo 20 caracteres!']},
    user_id: [{type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }],
    unit_id: [{type: mongoose.Schema.Types.ObjectId, ref: 'Unit', required: true}],
    storageLocation_id: [{type: mongoose.Schema.Types.ObjectId, ref: 'StorageLocation'}],
    brand_id: [{type: mongoose.Schema.Types.ObjectId, ref: 'Brand'}]
})

module.exports = restful.model('Product', productSchema)
