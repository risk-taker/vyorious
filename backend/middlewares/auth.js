const JwtService = require("../services/jwtService");


const auth = async (req, res, next) => {
    const { accessToken } = req.cookies;

    try {
        const { _id, type } = JwtService.verify(accessToken);
        const user = {
            _id,
            type
        }
        req.user = user;
        next();
    } catch (err) {
        return res.json(err.message);
    }
}

module.exports = auth;