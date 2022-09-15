const jwt = require("jsonwebtoken");

exports.authRequired = (req, res, next) => {
    const authorization = req.headers.authorization;
    if (!authorization) {
        return res.status(402).json({error: "Please login to use this platform"})
    }
    const token =authorization.split(" ")[1]
    if (!token) {
        return res.status(402).json({error:"Please login"});
    }

    const user = jwt.verify(
        token,
        "546a803d81b4ed21d8789605b4d93479cd4998154682c222fe5b850b365dc947"
        );

        req.user = user;
    next();
};