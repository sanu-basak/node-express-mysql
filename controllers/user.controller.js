exports.allAccess = (req,res) => {
    res.status(200).send({
        message : "Public Content"
    });
}

exports.userDashboard = (req,res) => {
    res.status(200).send({
        message : "User Content"
    });
}

exports.adminDashboard = (req,res) => {
    res.status(200).send({
        message : "Admin Content"
    });
}

exports.moderatorDashbaord = (req,res) => {
    res.status(200).send({
        message : "Moderator Content"
    });
}