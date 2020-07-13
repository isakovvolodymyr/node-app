import jwt from 'jsonwebtoken';
require('dotenv').config();

export const socketVerifyTokenHandler = async (socket, next) => {
    if (socket.handshake.query && socket.handshake.query.token) {
        jwt.verify(socket.handshake.query.token, process.env.JWT_SECRET, function (err, decoded) {
            if (err) {
                throw new Error('token_is_not_valid');
            }

            socket.decoded = decoded;
            next();
        });
    } else {
        throw new Error('token_is_not_found');
    }
};