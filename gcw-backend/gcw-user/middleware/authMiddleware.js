const jwt = require('jsonwebtoken');

const checkUser = (req, res, next) => {
    const token = req.cookies.jwt;
    if (token) {
        jwt.verify(token, 'gcw-secret', async(err, decodedToken) => {
            if (err) {
                res.json({ message: "Unauthorized client" });
            } else {
                req.userId = decodedToken.id;
                req.userType = decodedToken.userType;
                next();
            }
        })
    } else {
        res.json({ message: "User needs to login" });
    }
}

module.exports = checkUser;