const User = require("../models/User");
const bcrypt = require("bcrypt");

module.exports = {
    getUsers: async (req, res) => {
        try {
            const limit = parseInt(req.query.limit) || 10;
            const offset = parseInt(req.query.offset) || 0;
            const users = await User.find({status: true}, "name email img role").limit(limit).skip(offset);
            const total = await User.countDocuments({status: true});
            res.json({
                ok: true,
                total,
                users
            });
        } catch (error) {
            res.status(400).json({ok: false, error});
        }
    },
    addNewUser: async (req, res) => {
        try {
            const body = req.body;
            let newUser = new User({
                name: body.name,
                email: body.email,
                password: bcrypt.hashSync(body.password, 10),
                role: body.role
            });
            const user =await newUser.save();
            res.json({
                ok: true,
                user
            });
        } catch (error) {
            res.status(400).json({ok: false, error});
        }
    },
    updateUser: async (req, res) => {
        try {
            const body = {
                name: req.body.name,
                email: req.body.email,
                password: req.body.password,
                img: req.body.img,
                status: req.body.status
            };
            const id = req.params.id;
            const user = await User.findByIdAndUpdate(id, body, {useFindAndModify: false, new: true});
            res.json({
                ok: true,
                user
            });
        } catch (error) {
            res.status(400).json({ok: false, error});
        }
    },
    deleteUser: async (req, res) => {
        try {
            const id = req.params.id;
            const user = await User.findByIdAndUpdate(id, {status: false}, {useFindAndModify: false, new: true});
            res.json({
                ok: true,
                user
            });
        } catch (error) {
            res.status(400).json({ok: false, error});
        }
    }
};