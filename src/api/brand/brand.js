const restful = require('node-restful')
const mongoose = restful.mongoose


const brandSchema = new mongoose.Schema({
    name: { type: String, required: [true, 'O campo Nome é obrigatório'] },
    user_email: {type: String, required: true}
})

module.exports = restful.model('Brand', brandSchema)
