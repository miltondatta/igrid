const express = require('express')
const Contacts = require('../models/contacts')

const route = express.Router()

// Read
route.get('/contacts', (req,res,next) => {
    Contacts.findAll({attributes: ['id', 'name', 'company', 'email', 'subject', 'message']})
        .then(resData => {
            res.status(200).json(resData)
        })
        .catch(err => {
            res.status(200).json({message: 'Something Went Wrong', err})
        })
})

// Update
route.put('/contacts/update/:id', (req,res,next) => {
    const {condition_type} = req.body
    if (condition_type !== '') {
        Contacts.update({condition_type}, {where: {id: req.params.id}})
            .then(resData => {
                res.status(200).json({resData, message: 'Data Saved Successfully', status: true})
            })
            .catch(err => {
                res.status(200).json({message: 'Something went wrong'})
            })
    } else {
        res.status(200).json({message: 'All fields required!'})
    }
})

// Create
route.post('/contacts/entry', (req,res,next) => {
    const {name, company, email, subject, message} = req.body
    if (name !== '', company !== '', email !== '', subject !== '', message !== '') {
        Contacts.create(req.body)
            .then(resData => {
                res.status(200).json({resData, message: 'Message Sent Successfully', status: true})
            })
            .catch(err => {
                console.log(err, 42);
                res.status(200).json({message: 'Something went wrong', err})
            })
    } else {
        res.status(200).json({message: 'All fields required!'})
    }
})

// Delete
route.delete('/contacts/delete', (req,res,next) => {
    Contacts.destroy({
        where: {
            id: req.body.id
        }
    })
        .then(resData => {
            res.status(200).json({message: 'Contacts Has Been Deleted'})
        })
        .catch(err => {
            console.log(err)
            res.status(200).json({message: 'Something went wrong', err})
        })
})

module.exports = route