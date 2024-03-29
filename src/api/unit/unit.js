const restful = require('node-restful')
const mongoose = restful.mongoose


const unitSchema = new mongoose.Schema({
    name: { type: String, required: [true, 'O campo Nome é obrigatório!'] },
    user_email: { type: String, required: true },
    abbreviation: { type: String, maxLength: [3, 'A sigla deve possuir no máximo 3 caracteres!'], required: true}
    // user_id: [{type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }]
})

module.exports = restful.model('Unit', unitSchema)
