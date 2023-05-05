const jwt = require('jsonwebtoken');
require('dotenv').config();
const SECRET = process.env.SECRET;

exports.generateAccessToken = (role,email) => {
    return jwt.sign({role,email},SECRET,{expiresIn: '36000s' })
}