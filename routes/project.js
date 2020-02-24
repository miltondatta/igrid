const express = require('express')
const Project = require('../models/asset/project')

const route = express.Router()

// Read
route.get('/projects', (req,res,next) => {
    Project.findAll({attributes: ['id', 'project_name', 'project_code', 'description']})
        .then(resData => {
            res.status(200).json(resData)
        })
        .catch(err => {
            res.status(200).json({message: 'Something Went Wrong', err})
        })
})

// Update
route.put('/projects/update/:id', (req,res,next) => {
    const {project_name,project_code,description} = req.body
    if(project_code === '' || project_name === '' || description === '') {
        res.status(200).json({message: 'All fields required!'})
    } else {
        Project.findAll({where: {id: req.params.id}})
            .then(resData => {
                if(resData[0].dataValues.project_code === project_code) {
                    Project.update({project_name,project_code,description}, {where: {id: req.params.id}})
                        .then(resData => {
                            res.status(200).json({resData, message: 'Data Saved Successfully', status: true})
                        })
                        .catch(err => {
                            res.status(200).json({message: 'Something went wrong'})
                        })
                } else {
                    res.status(200).json({message: 'Project Code Exist'})
                }
            })
    }
})

// Create
route.post('/projects/entry', (req,res,next) => {
    const {project_code, project_name, description} = req.body
    if(project_code === '' || project_name === '' || description === '') {
        res.status(200).json({message: 'All fields required!'})
    } else {
        Project.findAll({where: {project_code}})
            .then(resData => {
                if(resData.length === 0) {
                    Project.create(req.body)
                        .then(resData => {
                            res.status(200).json({resData, message: 'Data Saved Successfully', status: true})
                        })
                        .catch(err => {
                            console.log(err)
                            res.status(200).json({message: 'Something went wrong', err})
                        })
                } else {
                    res.status(200).json({message: 'Project Code Exist'})
                }
            })
    }
})

// Delete
route.delete('/projects/delete', (req,res,next) => {
    Project.destroy({
        where: {
            id: req.body.id
        }
    })
        .then(resData => {

            res.status(200).json({message: 'Project Has Been Deleted'})
        })
        .catch(err => {
            console.log(err)
            res.status(200).json({message: 'Something went wrong', err})
        })
})

module.exports = route