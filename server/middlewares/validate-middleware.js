const validate = (schema) => async (req, res, next) => {
    try {
        const parseBody = await schema.parseAsync(req.body);
        req.body = parseBody;
        return next();
    } catch (err) {
        const status = 422;
        const message = "Fill the input properly";
        
        let extraDetails = "An error occurred";
        if (err.errors && err.errors.length > 0) {
            extraDetails = err.errors[0].message;
        }

        const error = {
            status,
            message,
            extraDetails,
        };
        next(error);
    }
};

module.exports = validate;