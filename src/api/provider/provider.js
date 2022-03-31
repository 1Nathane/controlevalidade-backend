const restful = require('node-restful')
const mongoose = restful.mongoose


const providerSchema = new mongoose.Schema({
    name: { type: String, required: [true, 'O campo Nome é obrigatório!'] },
    user_email: { type: String, required: true },
    user_id: [{type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }]
})

module.exports = restful.model('Provider', providerSchema)
