module.exports = (req, res, next) => {
    try {
        let { isAdmin } = req.user;
        if (isAdmin) {
            next();
        } else return res.status(401).json("Não autorizado!")
    } catch (error) {
        return res.status(401).json("Não autorizado!")
    }
}