const res = require('express/lib/response');
const sql = require('./db.js');
//Constructor
const Tutorial = function(tutorial){
    this.title = tutorial.title,
    this.description = tutorial.description,
    this.published = tutorial.published
}

Tutorial.create = (newTutorial,result) => {
    sql.query('INSERT INTO tutorials SET ?',newTutorial, (err,res) => {
        if(err){
            console.log('Error - ',err);
            result(err,null);
            return;
        }
        console.log('Tutorial Created',{ id:res.insertId, ...newTutorial })
        result(null,{id:res.insertId,...newTutorial});
           
    });
}

module.exports = Tutorial;