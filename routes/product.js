const db = require('../config/db')
const express = require('express')
const Products = require('../models/asset/products')

const route = express.Router()

// Read
route.get('/products', async (req,res,next) => {
    const [data, metaData] = await db.query(`
        SELECT products.id,product_name, brands.brand, models.model, products.category_id, products.sub_category_id, asset_categories.category_name, asset_sub_categories.sub_category_name, products.product_code, products.brand_id, products.model_id FROM products
          JOIN brands ON products.brand_id = brands.id
          JOIN models ON products.model_id = models.id
          JOIN asset_sub_categories ON products.sub_category_id = asset_sub_categories.id
          JOIN asset_categories ON products.category_id = asset_categories.id
    `)
    if (data.length > 0) {
        res.status(200).json(data)
    } else {
        res.status(200).json()
    }
})

// Read
route.get('/products/specific/:id', (req,res,next) => {
    Products.findAll({attributes: ['id','product_name', 'category_id','sub_category_id','product_code','brand_id','model_id'], where: {sub_category_id: req.params.id}})
        .then(resData => {
            res.status(200).json(resData)
        })
        .catch(err => {
            res.status(200).json({message: 'Something Went Wrong', err})
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
                            res.status(200).json({resData, message: 'Data Saved Successfully', status: true})
                        })
                        .catch(err => {
                            res.status(200).json({message: 'Something went wrong'})
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
                            res.status(200).json({resData, message: 'Data Saved Successfully', status: true})
                        })
                        .catch(err => {
                            console.log(err)
                            res.status(200).json({message: 'Something went wrong', err})
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

            res.status(200).json({message: 'Products Has Been Deleted'})
        })
        .catch(err => {
            console.log(err)
            res.status(200).json({message: 'Something went wrong', err})
        })
})

module.exports = route