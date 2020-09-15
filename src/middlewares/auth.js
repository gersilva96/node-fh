const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
    const token = req.get("access_token");
    jwt.verify(token, process.env.SECRET_KEY, (error, decoded) => {
        if (error) {
            return res.status(401).json({
                ok: false,
                error: {
                    message: "Token inválido"
                }
            });
        }
        req.user = decoded.user;
        next();
    });
};