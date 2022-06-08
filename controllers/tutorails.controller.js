const Tutorial = require('../models/tutorial.model.js');

exports.create = (req,res) => {
    //validate request
    if(!req.body){
        res.status(400).send({
            message : "Content cannot be empty"
        });
    }

    //create tutorail
    const tutorail = new Tutorial({
        title : req.body.title,
        description : req.body.description,
        published : req.body.published || false
    })

    //save tutorail into the database
    Tutorial.create(tutorail,(err,data) => {
        if(err){
            res.status(500).send({
                message : err.message || "Something went wrong"
            })
        }else{
            res.send(data)
        }
    });
}