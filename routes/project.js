const express = require('express')
const Project = require('../models/asset/project')

const route = express.Router()

// Read
route.get('/projects', (req,res,next) => {
    Project.findAll()
        .then(resData => {
            res.status(200).json(resData)
        })
        .catch(err => {
            res.status(404).json({message: 'Something Went Wrong', err})
        })
})

// Update
route.put('/projects/update/:id', (req,res,next) => {
    const {project_name,project_code,description} = req.body
    Project.update({project_name,project_code,description}, {where: {id: req.params.id}})
        .then(resData => {
            res.status(200).json(resData)
        })
        .catch(err => {
            res.status(404).json({message: 'Something went wrong'})
        })
})

// Create
route.post('/projects/entry', (req,res,next) => {
    Project.create(req.body)
        .then(resData => {
            res.status(200).json(resData)
        })
        .catch(err => {
            console.log(err)
            res.status(404).json({message: 'Something went wrong', err})
        })
})

// Delete
route.delete('/projects/delete', (req,res,next) => {
    Project.destroy({
        where: {
            id: req.body.id
        }
    })
        .then(resData => {
            console.log(resData)
            res.status(200).json({message: 'Project Has Been Deleted'})
        })
        .catch(err => {
            console.log(err)
            res.status(404).json({message: 'Something went wrong', err})
        })
})

module.exports = route