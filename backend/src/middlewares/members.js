
export const validateGetMember = (schema) => {
    return  (req,res,next) => {
        try {
            // console.log(req.params);     
            schema.parse({id: Number(req.params.id)});
            next();
        } catch (error) {
            res.status(400).json({
                error: error.errors.map((err) => err.message),
            });
        }
    }
}