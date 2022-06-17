
const { verifySignUp } = require('../middleware');
const controller = require('../controllers/auth.controller');

module.exports = function(app){
    app.use(function(req,res,next){
        res.header(
            "Access-Control-Access-Headers",
            "x-access-token,Origin,Content-Type ,Accept"
        );
        next();
    });

    app.post("/api/auth/signup",[
        verifySignUp.checkDuplicateUsernameOrEmail,
        verifySignUp.checkRolesExisted
    ],
    controller.signUp);

    app.post("/api/auth/signin",controller.signIn);
}


