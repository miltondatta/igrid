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

// Get All Users
router.get('/users/options', (req,res,next) => {
    Users.findAll({attributes: ['id', 'firstName', 'lastName']})
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
                res.status(200).json({message: 'User already exist'})
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
            if(data.length === 0){res.status(200).json({message: "User Doesn't Exist"})}
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
                            const phone_number = data[0].dataValues.phone_number;
                            const pin = data[0].dataValues.pin
                            const address = data[0].dataValues.address
                            const image = data[0].dataValues.image

                            let location_id = null;
                            let userType    = null;


                            const [results, metadata] = await db.query(`SELECT user_associate_roles.location_id as location_id, user_associate_roles.role_id as role_id FROM user_associate_roles WHERE user_associate_roles.user_id = ${data[0].dataValues.id}`)
                            if(results.length > 0) {
                                 location_id = results[0].location_id
                                 userType    = results[0].role_id
                            }
                            payload = {id, userName, email, phone_number, pin, address, image, userType, role_id: results[0].role_id, location_id}

                            const token = jwt.sign({
                                exp: Math.floor(Date.now() / 1000) + (8 * 60 * 60),
                                data: payload
                            }, 'secret');
                            const userLogs = {user_ip, user_id: data[0].dataValues.id, time, date}
                            UserLoginLogs.create(userLogs)
                            res.status(200).json({token: token, status: true, message: 'Login Success!'})
                        } else {
                            res.status(200).json({message: "Password Didn't Match"})
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
router.put('/users/update/:id', (req,res) => {
    upload(req, res, function (err) {
        if (err instanceof multer.MulterError) {
            return res.status(500).json(err)
        } else if (err) {
            return res.status(500).json(err)
        }

        const {firstName, lastName, phone_number, email, pin, address} = req.body;
        const file_name = req.file ? req.file.filename : 'default.png';

        let sendData = {
            firstName,
            lastName,
            phone_number,
            email,
            pin,
            address,
            image: file_name
        };

        Users.findOne({where: {id: req.params.id}})
            .then(data => {
                const {dataValues} = data;
                if(Object.keys(dataValues).length < 1) return res.status(400).json({message: 'User Profile didn\'t found!'});

                if (fs.existsSync('public/images/' + dataValues.image && dataValues.image !== file_name)) {
                    fs.unlink('public/images/' + dataValues.dataValues.image, (err) => {
                        if (err) throw err;
                        console.log('successfully deleted /tmp/hello');
                    });
                }

                Users.update(sendData, {where: {id: req.params.id}})
                    .then(() => {
                        return res.status(200).json({message: 'User Profile updated Successfully!'});
                    })
                    .catch(err => {
                        console.error(err);
                        res.status(200).json({message: 'Something went wrong'});
                    })
            })
    })
});

// Update Password
router.put('/users/password-reset/:id', (req,res) => {
    const {oldPassword, newPassword,confirmPassword} = req.body;
    Users.findAll({where: {id: req.params.id}})
        .then(data => {
            if(data.length === 0){res.status(400).json({message: `User Doesn't exist`})}
            else {
                const passFromDB = data[0].dataValues.password.toString();
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
                                res.status(400).json({message: `New Password and Confirm Password Didn\'t Match`})
                            }
                        } else {
                            res.status(400).json({message: "Old Password Didn't Match"})
                        }
                    }
                })}
        })
});

// User Login Logs
router.get('/user-login-logs', async (req, res, next) => {
    const [results] = await db.query(`SELECT users.id,
                                               CONCAT(users."firstName", ' ', users."lastName") as name,
                                               users.email,
                                               users.address,
                                               users.phone_number,
                                               user_login_logs.user_ip,
                                               user_login_logs.date,
                                               user_login_logs.time
                                        FROM user_login_logs
                                                 JOIN users ON user_login_logs.user_id = users."id"`);
    res.status(200).json(results);
});

// User Login Logs By Credential
router.post('/user-login-logs/by/credential', async (req, res) => {
    try{
        const {from_date, to_date} = req.body;
        const [results] = await db.query(`SELECT users.id,
                                           CONCAT(users."firstName", ' ', users."lastName") as name,
                                           users.email,
                                           users.address, 
                                           users.phone_number,
                                           user_login_logs.user_ip,
                                           user_login_logs.date,
                                           user_login_logs.time
                                    FROM user_login_logs
                                             JOIN users ON user_login_logs.user_id = users.id
                                    where user_login_logs.date between '${from_date}' and
                                            '${to_date}'`);
        res.status(200).json(results);
    } catch (err) {
        console.error(err.message);
        return res.status(500).json({err});
    }
});

// Get All User By Id
router.get('/user/:id', (req,res) => {
    Users.findOne({attributes: ['address', 'firstName', 'lastName', 'email', 'phone_number', 'pin'], where: {id: req.params.id}})
        .then(data => res.status(200).json(data))
        .catch(err => {console.log(err); res.status(404).send(err)})
});

module.exports = router;