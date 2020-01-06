const bcrypt = require('bcrypt')
const express = require('express')
const jwt = require('jsonwebtoken')
const Users = require('../models/user')

const saltRounds = 10
const router = express.Router();


// Get All Users
router.get('/users', (req,res,next) => {
  Users.findAll({attributes: ['id', 'firstName','password', 'lastName', 'userType', 'email', 'userStatus', 'phone_number', 'is_verified']})
      .then(data => {res.send(data)})
      .catch(err => {console.log(err); res.status(404).send(err)})
})

// Create User
router.post('/users/register', (req,res,next) => {
  const userData = req.body
  const userEmail = userData.email
  const userPass = userData.password
  Users.findAll({where: {email: userEmail}})
      .then(data => {
            if(data.length !== 0){
              res.status(404).json({error: 'User already exist'})
            } else {
              bcrypt.hash(userPass.toString(), saltRounds, (err, hash) => {
                if (err) {console.log(err)}
                else{
                  const hasedPass = {...userData, password: hash}
                  Users.create(hasedPass)
                       .then(data => {
                          res.status(200).json({"message": "User Created Successfully"})
                        })
                        .catch(err => {console.log(err)})
                }
              })
            }
        })
        .catch(err => {
          console.log(err)
        })
})

// LoginComponent Users
router.post('/users/login', (req,res,next) => {
  const userData = req.body
  const userEmail = userData.email
  const userPass = userData.password.toString()
  console.log(userEmail, 51)
  Users.findAll({where: {email: userEmail}})
       .then(data => {
         if(data.length === 0){res.status(200).json({error: "User Doesn't Exist"})}
         else{
          const passFromDB = data[0].dataValues.password.toString()
          console.log(typeof passFromDB)
          bcrypt.compare(userPass, passFromDB, function(err, resData) {
              if(err){console.log(err)}
              else{
                console.log(resData)
                if(resData){
                  const id = data[0].dataValues.id
                  const userName = data[0].dataValues.firstName + " " + data[0].dataValues.lastName
                  const email = data[0].dataValues.email
                  const phone_number = data[0].dataValues.phone_number
                  const payload = {id, userName, email, phone_number}
                  const token = jwt.sign({
                    exp: Math.floor(Date.now() / 1000) + (60 * 60),
                    data: payload
                  }, 'secret');
                  res.status(200).json({token: token})
                } else {
                  res.status(400).json({error: "Password Didn't Match"})
                }
              }
          });
         }
       })
})

// Disable Users
router.put('/users/disable/:id', (req,res,next) => {
  Users.update({userStatus: false}, {where: {id: req.params.id}})
       .then(data => {
         res.json(data)
       })
       .catch(err => {
         res.json({error: err})
       })
})

// Update Users
router.put('/users/update/:id', (req,res,next) => {
  const {firstName, lastName, phone_number, email} = req.body
  Users.findAll({where: {email: email}})
       .then(data => {
         if(data.length > 1){res.status(200).json({error: 'Email Taken'})}
         else {
          Users.update({
            firstName,
            lastName,
            phone_number,
            email
            }, {where: {id: req.params.id}})
                .then(data => {
                  res.json(data)
                })
                .catch(err => {
                  res.json({error: err})
                })
         }
       })
})

// Update Password
router.put('/users/password-reset/:id', (req,res,next) => {
  const {oldPassword, newPassword,confirmPassword} = req.body
  Users.findAll({where: {id: req.params.id}})
       .then(data => {
         if(data.length === 0){res.status(200).json({error: `User Doesn't exist`})}
         else {
          const passFromDB = data[0].dataValues.password.toString()
          bcrypt.compare(oldPassword.toString(), passFromDB, function(err, resData) {
            if(err){console.log(err)}
            else{
              if(resData){
                if(newPassword === confirmPassword){
                  bcrypt.hash(newPassword.toString(), saltRounds, (err, hash) => {
                    if (err) {console.log(err)}
                    else{
                      Users.update({
                        password: hash,
                        }, {where: {id: req.params.id}})
                            .then(data => {
                              res.json({message: "Password Changed Successfully"})
                            })
                            .catch(err => {
                              res.json({error: err})
                            })
                    }
                  })
                } else{
                  res.status(200).json({error: `Password Didn't Match`})
                }
              } else {
                res.status(200).json({error: "Wrong Password"})
              }
            }
        })}
       })
})


module.exports = router 