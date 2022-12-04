require('dotenv').config()
const express = require('express')
const app = express()
app.use(express.json())
const connectDB = require('./db/connectDB')
const MyRouter = require('./routes/routes')
app.use(express.json())
app.use(MyRouter)

app.use(express.static('public'))
const start = async() =>{
    try{
        await connectDB(process.env.URI)
        console.log('db connected!')
        app.listen(3000, () => console.log('server is up on port 3000...'))
    }catch(err){
        console.log(err)
    }
}
start()