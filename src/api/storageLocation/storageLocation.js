const restful = require('node-restful')
const mongoose = restful.mongoose


const storageLocationSchema = new mongoose.Schema({
    name: { type: String, required: true },
    user_email: {type: String, required: true}
})

module.exports = restful.model('StorageLocation', storageLocationSchema)
