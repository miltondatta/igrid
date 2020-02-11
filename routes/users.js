const fs = require('fs')
const multer = require('multer')
const bcrypt = require('bcryptjs')
const express = require('express')
const db = require('../config/db');
const jwt = require('jsonwebtoken')
const Users = require('../models/user')
const nodeMailer = require('nodemailer')
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
  Users.findAll({attributes: ['id', 'image', 'address', 'pin', 'firstName', 'lastName', 'userType', 'email', 'phone_number', 'is_verified']})
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
              res.status(404).json({message: 'User already exist'})
            } else {
              bcrypt.hash(userPass.toString(), saltRounds, (err, hash) => {
                if (err) {console.log(err,28)}
                else{
                  const hasedPass = {...userData, userType: 2, password: hash}
                  Users.create(hasedPass)
                       .then(data => {
                           let transporter = nodeMailer.createTransport({
                               host: 'smtp.gmail.com',
                               port: 465,
                               secure: true,
                               auth: {
                                   // should be replaced with real sender's account
                                   user: 'dummydumbdd77@gmail.com',
                                   pass: 'Dymmy@77'
                               }
                           });
                           let mailOptions = {
                               // should be replaced with real recipient's account
                               from: '"iGrid" <dummydumbdd77@gmail.com>',
                               to: userEmail,
                               subject: 'Test Mail',
                               html: "<h2 style='color: #17a2b8'>Your account is ready. Please contact the admin</h2>"
                           };
                           transporter.sendMail(mailOptions, (error, info) => {
                               if (error) {
                                   return console.log(error);
                               }
                               console.log('Message %s sent: %s', info.messageId, info.response);
                           });
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
    // let user_ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress
    // let user_ip = req.ip
    let user_ip = req.body.ip
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
          bcrypt.compare(userPass, passFromDB, async function(err, resData) {
              if(err){console.log(err)}
              else{
                if(resData){
                    let payload = {}
                    const id = data[0].dataValues.id
                    const userName = data[0].dataValues.firstName + " " + data[0].dataValues.lastName
                    const email = data[0].dataValues.email
                    const userType = data[0].dataValues.userType
                    const phone_number = data[0].dataValues.phone_number;
                    const pin = data[0].dataValues.pin
                    const address = data[0].dataValues.address
                    const image = data[0].dataValues.image

                    if (data[0].dataValues.userType !== 0) {
                        const [results, metadata] = await db.query(`SELECT user_associate_roles.id as location_id, user_roles.id as role_id FROM user_associate_roles JOIN user_roles ON user_roles.id = user_associate_roles.role_id WHERE user_associate_roles.user_id = ${data[0].dataValues.id}`)
                        const location_id = results[0].location_id
                        const role_id = results[0].role_id
                        payload = {id, userName, email, phone_number, pin, address, image, userType, location_id, role_id}
                    } else {
                        payload = {id, userName, email, phone_number, pin, address, image, userType}
                    }

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
            image: req.file.filename ? req.file.filename : 'default.png'
        }
        Users.findAll({where: {email: sendData.email}})
            .then(data => {
                if (data.length > 1) {
                    res.status(200).json({message: 'Email Taken'})
                } else {
                    if (fs.existsSync('public/images/' + data[0].dataValues.image && req.file.filename)) {
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
    const [results, metadata] = await db.query(`SELECT CONCAT(users."firstName", ' ' ,users."lastName") as name, users.email, user_login_logs.user_ip,user_login_logs.date,user_login_logs.time FROM user_login_logs  JOIN users ON user_login_logs.user_id = users."id"`)
    res.status(200).json(results)
})

module.exports = router