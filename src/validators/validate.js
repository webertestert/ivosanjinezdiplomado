function validate(schema, target = 'body') {
    return(req, res, next) =>{
        const data = req[target];
        //p1 verif datos
        if (!data || Object.keys(data).length === 0){
            return res.status(400).json({ message: 'No data found'})
        }

        // paso 2 validar contra el schema con opsiones
        const { error, value } = schema.validate(data, {
            abortEarly: false, // no detener en 1er error
            stripUnknown: true, //eliminar campos not defined

        });
        // paso 3 si hay errores validacion return 400 con msg
        if(error){
            return res.status(400).json({
                message : `Error de validacion en ${target}`,
                errores: error.details.map(err =>err.message)
            })
        }

        // P4 reemplazarl el obj orignal con datos limpios
        req[target] = value;

        // continuar
        next();

    }
}

export default validate