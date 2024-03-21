function isAdmin(req, res, next) {
    const error = "Sem permissão para realizar esta requisição!";
    const admin = req.user.user_type.includes("admin");
    if (!admin) {
        res.status(403).json({error});
    }
    next()
}

module.exports = isAdmin;