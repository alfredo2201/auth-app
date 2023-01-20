import {check, validationResult } from 'express-validator';

const validationRegister = async(req, res, next) =>{
    await check('name', 'El nombre es obligatorio').isLength({max: 30}).isString().run(req);
    await check('email', 'El email es obligatorio').isLength({max: 30}).isEmail().isString().run(req);
    await check('password','La contraseña es obligatoria').isLength({max: 150, min: 6}).run(req);
    enviaRespuestaError(validationResult(req),res,next)
}

const validationLogin = async(req, res, next) =>{
    await check('email', 'El email es obligatorio').isLength({max: 30}).isEmail().isString().run(req);
    await check('password','La contraseña es obligatoria').isLength({max: 150, min: 6}).run(req);
    enviaRespuestaError(validationResult(req),res,next)
}

const validationToken = async(req, res, next) =>{
    await check('email', 'El email es obligatorio').isLength({max: 30}).isEmail().isString().run(req);
    await check('password','La contraseña es obligatoria').isLength({max: 150, min: 6}).run(req);    
    enviaRespuestaError(validationResult(req),res,next)
}

const enviaRespuestaError = ( result, res,next) =>{
    if(!result.isEmpty()){
        return res.status(400).send(result);
    }
    next();
}

export {
    validationRegister,
    validationLogin,
    validationToken
}