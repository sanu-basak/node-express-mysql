const { authJwt } = require("../middleware");
const controller = require("../controllers/user.controller");
const { verifyToken } = require("../middleware/authJwt");

module.exports = (app) => {
    app.use(function(req,res,next){
        res.header(
            "Access-Control-Access-Headers",
            "x-access-token,Origin,Content-Type,Accept"
        );

        next();
    });

    app.get("api/test/all",controller.allAccess);
    app.get("api/test/user",[
        authJwt.verifyToken
    ],controller.userDashboard);
    app.get("api/test/mod",[
        authJwt.verifyToken,
        authJwt.isModerator
    ],controller.moderatorDashbaord);
    app.get("api/test/admin",[
        authJwt.verifyToken,
        authJwt.isAdmin
    ],controller.adminDashboard);
}