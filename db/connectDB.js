const connectionString = 'mongodb+srv://john:5nh5B5BCg6iKkQGR@atlascluster.6k9efrx.mongodb.net/TASKS?retryWrites=true&w=majority'
const mongoose = require('mongoose')
const connectDB = (uri) =>{
    return mongoose.connect(uri)
}
module.exports = connectDB