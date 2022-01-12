const { verifySignUp } = require("../middlewares");
const controller = require("../controllers/auth.controller");

module.exports = function (app) {
    app.use(function (req, res, next) {
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "Origin, x-access-token, Content-Type, Accept");
        next();
    });

    app.post(
        "/api/auth/signup",
        [
            verifySignUp.checkDuplicateUsernameOrEmail,
            verifySignUp.checkPasswords,
            verifySignUp.checkRolesExisted
        ],
        controller.signup
    );

    app.post("/api/auth/signin", controller.signin);

    app.delete(
        "/api/users/:id", 
        [
            verifySignUp.checkPasswords,
            controller.delete
        ]);
};