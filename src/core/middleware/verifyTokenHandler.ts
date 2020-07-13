import jwt from 'jsonwebtoken';
require('dotenv').config();

export const verifyTokenHandler = async (ctx, next) => {
    let token = ctx.headers['authorization'];

    if (token && token.startsWith('Bearer ')) {
        // Remove Bearer from string
        token = token.slice(7, token.length);
    }

    if (token) {
        await jwt.verify(token, process.env.JWT_SECRET, async (err, decoded) => {
            if (err) {
                throw new Error('token_is_not_valid');
            }

            ctx.state.decoded = decoded;
            await next();
        });
    } else {
        throw new Error('token_is_not_supplied');
    }
};