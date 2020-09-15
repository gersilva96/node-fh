const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

module.exports = {
    login: async (req, res) => {
        try {
            const user = await User.findOne({email: req.body.email});
            if (user == undefined) {
                return res.status(400).json({
                    ok: false,
                    error: {
                        message: "El usuario no existe"
                    }
                });
            }
            const correctCredentials = await bcrypt.compare(req.body.password, user.password);
            if (!correctCredentials) {
                return res.status(400).json({
                    ok: false,
                    error: {
                        message: "Contraseña incorrecta"
                    }
                });
            }
            const token = jwt.sign({
                user
            }, process.env.SECRET_KEY, {expiresIn: process.env.EXPIRATION_TOKEN});
            res.json({
                ok: true,
                token
            });
        } catch (error) {
            res.status(500).json({ok: false, error});
        }
    }
}