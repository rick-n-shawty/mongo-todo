const mongoose = require('mongoose')
const schema = mongoose.Schema({
    name: {
        type: String,
        required: [true, 'name must be provided']
    },
    completed: {
        type: Boolean,
        default: false
    }
})
const Task = mongoose.model('task', schema)
module.exports = Task