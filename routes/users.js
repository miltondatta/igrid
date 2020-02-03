const fs = require('fs');
const multer = require('multer')
const bcrypt = require('bcryptjs')
const express = require('express')
const db = require('../config/db');
const jwt = require('jsonwebtoken')
const Users = require('../models/user')
const UserLoginLogs = require('../models/userloginlog')

const saltRounds = 10
const router = express.Router();

let storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/images')
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' +file.originalname )
    }
})
let upload =  multer({
    storage: storage,
    fileFilter: (req, file, cb) => {
        if (!file.originalname.match(/\.(jpg|jpeg|png|doc|docx|pdf)$/)) {
            return cb(new Error('Only .png, .jpg, .jpeg, .doc, .docx, .pdf format allowed!'));

        }
        cb(null, true);
    }
}).single('file')

// Get All Users
router.get('/users', (req,res,next) => {
  Users.findAll({attributes: ['id', 'image', 'address', 'pin', 'firstName', 'lastName', 'userType', 'email', 'userStatus', 'phone_number', 'is_verified']})
      .then(data => {res.send(data)})
      .catch(err => {console.log(err); res.status(404).send(err)})
})

// Create User
router.post('/users/register', (req,res,next) => {
  const userData = req.body
    console.log(userData,20)
  const userEmail = userData.email
  const userPass = userData.password
  Users.findAll({where: {email: userEmail}})
      .then(data => {
            if(data.length !== 0){
              res.status(404).json({message: 'User already exist'})
            } else {
              bcrypt.hash(userPass.toString(), saltRounds, (err, hash) => {
                if (err) {console.log(err,28)}
                else{
                  const hasedPass = {...userData, password: hash}
                  Users.create(hasedPass)
                       .then(data => {
                          res.status(200).json({"message": "User Created Successfully"})
                        })
                        .catch(err => {console.log(err,35)})
                }
              })
            }
        })
        .catch(err => {
          console.log(err)
        })
})

// Login Users
router.post('/users/login', (req,res,next) => {
    console.log(req.ip, 70)
    // let user_ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress
    // let user_ip = req.body.ip
    let user_ip = req.ip
    let date = new Date().toLocaleDateString()
    let time = new Date().toLocaleTimeString()

  const userData = req.body
  const userEmail = userData.email
  const userPass = userData.password.toString()
  Users.findAll({where: {email: userEmail}})
       .then(data => {
         if(data.length === 0){res.status(400).json({message: "User Doesn't Exist"})}
         else{
          const passFromDB = data[0].dataValues.password.toString()
          console.log(typeof passFromDB)
          bcrypt.compare(userPass, passFromDB, function(err, resData) {
              if(err){console.log(err)}
              else{

                if(resData){
                  const id = data[0].dataValues.id
                  const userName = data[0].dataValues.firstName + " " + data[0].dataValues.lastName
                  const email = data[0].dataValues.email
                  const userType = data[0].dataValues.userType
                  const phone_number = data[0].dataValues.phone_number
                  const pin = data[0].dataValues.pin
                  const address = data[0].dataValues.address
                  const image = data[0].dataValues.image
                  const payload = {id, userName, email, phone_number, pin, address, image, userType}
                  const token = jwt.sign({
                    exp: Math.floor(Date.now() / 1000) + (60 * 60),
                    data: payload
                  }, 'secret');


                  const userLogs = {user_ip, user_id: data[0].dataValues.id, time, date}
                  UserLoginLogs.create(userLogs)
                  res.status(200).json({token: token})
                } else {
                  res.status(400).json({message: "Password Didn't Match"})
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
         res.json({message: err})
       })
})

// Update Users
router.put('/users/update/:id', (req,res,next) => {
    upload(req, res, function (err) {
        if (err instanceof multer.MulterError) {
            return res.status(500).json(err)
        } else if (err) {
            return res.status(500).json(err)
        }
        const {firstName, lastName, phone_number, email, pin, address} = req.body
        let sendData = {
            firstName,
            lastName,
            phone_number,
            email,
            pin,
            address,
            image: req.file.filename
        }
        Users.findAll({where: {email: sendData.email}})
            .then(data => {
                if (data.length > 1) {
                    res.status(200).json({message: 'Email Taken'})
                } else {
                    if (fs.existsSync('public/images/' + data[0].dataValues.image)) {
                        fs.unlink('public/images/' + data[0].dataValues.image, (err) => {
                            if (err) throw err;
                            console.log('successfully deleted /tmp/hello');
                        });
                    }
                    Users.update({...sendData}, {where: {id: req.params.id}})
                        .then(data => {
                            res.json(data)
                        })
                        .catch(err => {
                            res.status(404).json({message: 'Something went wrong'})
                        })
                }
            })
    })
})

// Update Password
router.put('/users/password-reset/:id', (req,res,next) => {
    console.log(req.body, 175)
  const {oldPassword, newPassword,confirmPassword} = req.body
  Users.findAll({where: {id: req.params.id}})
       .then(data => {
         if(data.length === 0){res.status(400).json({message: `User Doesn't exist`})}
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
                              res.json({message: err})
                            })
                    }
                  })
                } else{
                  res.status(400).json({message: `Password Didn't Match`})
                }
              } else {
                res.status(400).json({message: "Wrong Password"})
              }
            }
        })}
       })
})

// User Login Logs
router.get('/user-login-logs', async (req, res, next) => {
    const [results, metadata] = await db.query('SELECT "UserLoginLogs"."user_ip","UserLoginLogs"."date","UserLoginLogs"."time","Users"."firstName","Users"."lastName" FROM "UserLoginLogs"  JOIN "Users" ON "UserLoginLogs"."user_id" = "Users"."id"')
    res.status(200).json(results)
})


module.exports = router 