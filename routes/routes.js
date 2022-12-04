
const express = require('express')
const router = express.Router()
const Task = require('../models/model')
router.use(express.static('public'))
router.use(express.json())
router.get('/tasks', async(req, res) =>{ // get tasks
    try{
        const data = await Task.find({})
        res.status(200).json(data)
    }catch(err){
        res.status(500).json({err: err})
    }
})
router.post('/', async (req, res) =>{ // create task
    try{
        const task = await Task.create({name: req.body.name})
        res.status(201).json(task)
    }catch(err){
        res.status(500).json({success: false, err: err})
    }
})


// router.get('/edit/', async (req, res) =>{
//     res.sendFile('c:/Users/sulta/OneDrive/Desktop/auth/03-tasks/public/edit.html')
// })

router.get('/edit', async (req, res) =>{ // get one task
    const {id} = req.query
    try{
        const task = await Task.findOne({_id: id})
        res.status(201).json(task)
    }catch(err){
        res.status(500).json({success: false, err: err})
    }
})

router.patch('/task/:id', async (req, res) =>{ // update task
    try{
        const task = await Task.findOneAndUpdate({_id: req.params.id}, {name: req.body.name})
        res.status(201).json(task)
    }catch(err){
        res.status(500).json({success: false,err: err})
    }
})

router.delete('/task/:id', async (req, res) =>{ //delete task
    try{
        const task = await Task.findOneAndDelete({_id: req.params.id})
        res.status(201).json(task)
    }catch(err){
        console.log(err)
        res.status(500).json({success: false, err: err})
    }
})

module.exports = router