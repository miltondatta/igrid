const express = require('express')
const Products = require('../models/asset/products')

const route = express.Router()

// Read
route.get('/products', (req,res,next) => {
    Products.findAll({attributes: ['id','product_name', 'category_id','sub_category_id','product_code','brand_id','model_id']})
        .then(resData => {
            res.status(200).json(resData)
        })
        .catch(err => {
            res.status(404).json({message: 'Something Went Wrong', err})
        })
})

// Update
route.put('/products/update/:id', (req,res,next) => {
    const {category_id,sub_category_id,product_name,product_code,brand_id,model_id} = req.body
    if(category_id !== '' && sub_category_id !== '' && product_name !== '' && product_code !== '' && brand_id !== '' && model_id !== '') {
        Products.findAll({where: {id: req.params.id}})
            .then(resData => {
                if(resData[0].dataValues.product_code === product_code) {
                    Products.update({category_id,sub_category_id,product_name,product_code,brand_id,model_id}, {where: {id: req.params.id}})
                        .then(resData => {
                            res.status(200).json(resData)
                        })
                        .catch(err => {
                            res.status(404).json({message: 'Something went wrong'})
                        })
                } else {
                    res.status(200).json({message: 'Product Code Exist'})
                }
            })
    } else {
        res.status(200).json({message: 'All fields required!'})
    }

})

// Create
route.post('/products/entry', (req,res,next) => {
    const {category_id,sub_category_id,product_name,product_code,brand_id,model_id} = req.body
    if(category_id !== '' && sub_category_id !== '' && product_name !== '' && product_code !== '' && brand_id !== '' && model_id !== '') {
        Products.findAll({where: {product_code}})
            .then(resData => {
                if(resData.length === 0) {
                    Products.create(req.body)
                        .then(resData => {
                            res.status(200).json(resData)
                        })
                        .catch(err => {
                            console.log(err)
                            res.status(404).json({message: 'Something went wrong', err})
                        })
                } else {
                    res.status(200).json({message: 'Product Code Exist'})
                }
            })
    } else {
        res.status(200).json({message: 'All fields required!'})
    }
})

// Delete
route.delete('/products/delete', (req,res,next) => {
    Products.destroy({
        where: {
            id: req.body.id
        }
    })
        .then(resData => {
            console.log(resData)
            res.status(200).json({message: 'Products Has Been Deleted'})
        })
        .catch(err => {
            console.log(err)
            res.status(404).json({message: 'Something went wrong', err})
        })
})

module.exports = route