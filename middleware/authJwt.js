const jwt = require('jsonwebtoken');
const config = require('../config/auth.config.js');
const db = require('../models');
const User = db.user;

verifyToken = (req,res,next) => {
    let token = req.headers['x-access-token'];

    if(!token){
        res.status(403).send({
            message : "No token provided"
        });
    }

    jwt.verify(token,config.secret,(err,decoded) => {
        if(err){
            return res.status(401).send({
                message : "Unauthorized"
            });
        }

        req.userId = decoded.id;

        next();
    });
}

isAdmin = (req,res,next) => {
    User.findByPk(req.userId).then(user => {
        user.getRoles().then(roles => {
            for(let i = 0; i < roles.length ; i++){
                if(roles[i].name == 'admin'){
                    next();
                    return;
                }
            }

            res.status(403).send({
                message : "Admin role required"
            });

            return;
        });
    });
}

isModerator = (req,res,next) => {
    User.findByPk(req.userId).then(user => {
        user.getRoles().then(roles => {
            for(let i=0;i< roles.length ; i++){
                if(roles[i].name == "moderator"){
                    next();
                    return;
                }
            }

            res.status(403).send({
                message : "Moderator role is required"
            });

            return;
        })
    })
}

isModeratorOrAdmin = (req,res,next) => {
    User.findByPk(req.userId).then(user => {
        user.getRoles().then(roles => {
            for(let i=0; i< roles.length ; i++){
                if(roles[i].name == "admin"){
                    next();
                    return;
                }
            }

            for(let i=o; i< roles.length ; i++){
                if(roles[i].name == "moderator"){
                    next();
                    return;
                }
            }

            res.status(403).send({
                message : "Admin or moderator role required"
            });
        });
    });
}

const authJwt = {
    verifyToken : verifyToken,
    isAdmin : isAdmin,
    isModerator : isModerator,
    isModeratorOrAdmin : isModeratorOrAdmin
}

module.exports = authJwt;
