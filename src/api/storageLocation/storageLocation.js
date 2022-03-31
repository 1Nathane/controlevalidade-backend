const restful = require('node-restful')
const mongoose = restful.mongoose


const storageLocationSchema = new mongoose.Schema({
    name: { type: String, required: [true, 'O campo Nome é obrigatório'] },
    user_id: [{type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }]
})

module.exports = restful.model('StorageLocation', storageLocationSchema)
