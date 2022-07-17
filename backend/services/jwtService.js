const jwt = require('jsonwebtoken');
// static sign(payload, expiry = '1y', secret = JWT_SECRET) {
//     return jwt.sign(payload, secret, { expiresIn: expiry });
// }

class JwtService {
    static sign(payload, expiry = '1y', secret = process.env.ACCESS_SECRET) {
        const token = jwt.sign(payload, secret, { expiresIn: expiry });

        return token;
    }

    static verify(token, secret = process.env.ACCESS_SECRET) {
        return jwt.verify(token, secret)
    }
}

module.exports = JwtService;