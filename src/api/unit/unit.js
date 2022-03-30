const restful = require('node-restful')
const mongoose = restful.mongoose


const unitSchema = new mongoose.Schema({
    name: { type: String, required: true },
    abbreviation: { type: String, maxLength: 3, required: true},
    user_email: {type: String, required: true}
})

module.exports = restful.model('Unit', unitSchema)
