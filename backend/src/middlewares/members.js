
export const validateGetMember = (schema) => {
    return  (req,res,next) => {
        try {
            // console.log(req.params);     
            schema.parse({id: Number(req.params.id)});
            next();
        } catch (error) {
            res.status(400).json({
                timestamp: new Date().toLocaleString(),
                success: false,
                status_code: "02",
                message: "Invalid input data",
                errors: error.errors.map((err) =>({ message: `${err.message}` })),
            });
        }
    }
}

export const validateCreMember = (schema) => {
    return(req,res,next)=>{

        try {
            schema.parse(req.body)           
            next();
        } catch (error) {
            console.log(error)
            res.status(400).json({
                timestamp: new Date().toLocaleString(),
                success: false,
                stCode: "-4",
                errors: error.errors.map((err) =>({ message: `${err.message}` })),

            });
        }
        
    }
}

export const validateUpdateMember = (schema) => {
    return(req,res,next)=>{

        try {
            schema.parse({
                id: Number(req.params.id),
                nombre: req.body.nombre
            });           
            next();
        } catch (error) {
            console.log(error)
            res.status(400).json({
                timestamp: new Date().toLocaleString(),
                success: false,
                stCode: "-4",
                errors: error.errors.map((err) =>({ message: `${err.message}` })),

            });
        }
        
    }
}