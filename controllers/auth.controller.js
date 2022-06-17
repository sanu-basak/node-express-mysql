const db = require("../models");
const config = require("../config/auth.config");
const User = db.user;
const Role = db.role;
const Op = db.Sequelize.Op;

var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");

exports.signUp = (req,res) => {
    //Save user to database
    User.create({
        username : req.body.username,
        email : req.body.email,
        password : bcrypt.hashSync(req.body.password,8)
    }).then(user => {
        if(req.body.roles){
            Role.findAll({
                where : {
                    name : {
                        [Op.or] : req.body.roles
                    }
                }
            }).then(roles => {
                user.setRoles(roles).then(() => {
                    res.status(201).send({
                        message : "User successfully created"
                    });
                });
            });
        }else{
            user.setRoles(1).then(() => {
                res.status(201).send({
                    message : "User successfully created"
                });
            })
           
        }
    }).catch( err => {
        res.status(500).send({
            message : err.message
        });
    })
}  

exports.signIn = (req,res) => {
    User.findOne({
        where : {
            username : req.body.username
        }
    }).then(user => {
        if(!user){
            res.status(404).send({
                message : "User not found"
            });

            return;
        }

        var isPasswordValid = bcrypt.compareSync(req.body.password,user.password);

        if(!isPasswordValid){
            res.status(401).send({
                message : "Password not matched"
            });

            return;
        }

        var token = jwt.sign({id:user.id},config.secret,{
            expiresIn : 86400
        })

        var authorities = [];

        user.getRoles().then(roles => {
            for (let i = 0; i < roles.length; i++) {
                authorities.push("ROLE_" + roles[i].name.toUpperCase());
            }
        });

        res.status(200).send({
            id : user.id,
            username : user.username,
            email : user.email,
            roles : authorities,
            accessToken : token
        });

        return;
    }).catch(err => {
        res.status(500).send({
            message : err.message
        });
    })
}