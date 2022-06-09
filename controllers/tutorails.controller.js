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

//Get single tutorial
exports.findOne = (req, res) => {
    Tutorial.findById(req.params.id, (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found Tutorial with id ${req.params.id}.`
          });
        } else {
          res.status(500).send({
            message: "Error retrieving Tutorial with id " + req.params.id
          });
        }
      } else res.send(data);
    });
  };

//Find all tutorials
exports.findAll = (req,res) => {
    const title = req.query.title;
    Tutorial.getAll(title,(err,data) => {
        if(err){
            res.status(500).send({
                message : err.message || "Something went wrong"
            });
        }else{
            res.send(data);
        }
    })

};

//Get all published tutorials
exports.findAllPublished = (req, res) => {
    Tutorial.getAllPublished((err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving tutorials."
        });
      else res.send(data);
    });
};

//update tutorial by id
exports.update = (req, res) => {
    // Validate Request
    if (!req.body) {
      res.status(400).send({
        message: "Content can not be empty!"
      });
    }
    console.log(req.body);
    Tutorial.updateById(
      req.params.id,
      new Tutorial(req.body),
      (err, data) => {
        if (err) {
          if (err.kind === "not_found") {
            res.status(404).send({
              message: `Not found Tutorial with id ${req.params.id}.`
            });
          } else {
            res.status(500).send({
              message: "Error updating Tutorial with id " + req.params.id
            });
          }
        } else res.send(data);
      }
    );
  };

exports.delete = (req, res) => {
    Tutorial.remove(req.params.id, (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found Tutorial with id ${req.params.id}.`
          });
        } else {
          res.status(500).send({
            message: "Could not delete Tutorial with id " + req.params.id
          });
        }
      } else res.send({ message: `Tutorial was deleted successfully!` });
    });
};

//delete all tutorial
exports.deleteAll = (req,res) => {
    Tutorial.removeAll((err, data) => {
        if (err)
          res.status(500).send({
            message:
              err.message || "Some error occurred while removing all tutorials."
          });
        else res.send({ message: `All Tutorials were deleted successfully!` });
    });
}

