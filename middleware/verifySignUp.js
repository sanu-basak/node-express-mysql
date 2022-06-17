const db = require('../models');
const ROLES = db.ROLES;
const User = db.user;

checkDuplicateUsernameOrEmail = (req,res,next) => {
    //Check Username
    User.findOne({
        where : {
            username : req.body.username
        }
    }).then(user => {
        if(user){
            res.status(400).send({
                message : "Failed ! Username already in use"
            });

            return;
        }

        //Check Email
        User.findOne({
            where : {
                email : req.body.email
            }
        }).then(user => {
            if(user){
                res.status(400).send({
                    message : "Failed ! Email already in use"
                })
                return;
            }
            next();

        })

        
    })
}

checkRolesExisted = (req,res,next) => {
    if(req.body.roles){
        for(let i=0;i< req.body.roles.length; i++){
            if(!ROLES.includes(req.body.roles[i])){
                res.status(400).send({
                    message : "Failed ! Roles not exists"
                });
                return;
            }
        }
    }
    next();
}

const verifySignUp = {
    checkDuplicateUsernameOrEmail : checkDuplicateUsernameOrEmail,
    checkRolesExisted             : checkRolesExisted
}

module.exports = verifySignUp;