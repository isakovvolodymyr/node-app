import * as HttpStatus from "http-status-codes";

export const errorHandler = async (ctx, next) => {
    try {
        await next();
    } catch (err) {
        ctx.status = err.status || HttpStatus.INTERNAL_SERVER_ERROR;
        ctx.body = {
            data: {
                errors: {
                    message: err.message
                }
            }
        };
        ctx.app.emit('error', err, ctx);
    }
};