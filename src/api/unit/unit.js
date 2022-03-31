const restful = require('node-restful')
const mongoose = restful.mongoose


const unitSchema = new mongoose.Schema({
    name: { type: String, required: [true, 'O campo Nome é obrigatório!'] },
    abbreviation: { type: String, maxLength: [3, 'A sigla deve possuir no máximo 3 caracteres!'], required: true},
    user_email: {type: String, required: true}
})

module.exports = restful.model('Unit', unitSchema)
