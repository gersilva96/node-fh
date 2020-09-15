module.exports = (req, res, next) => {
    const user = req.user;
    if (user.role !== "ADMIN_ROLE") {
        return res.status(401).json({
            ok: false,
            error: {
                message: "El usuario no es administrador"
            }
        });
    }
    next();
};