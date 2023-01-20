import { Router } from "express";
import { validationRegister } from '../middlewares/auth.middleware.js'
import { crearUsuario,login,renovarToken } from "../controllers/auth.controller.js";
import { validarJWT } from "../middlewares/validar-jwt.js";

const router = Router()


router.post('/new',validationRegister, crearUsuario )

router.post('/',login)

//Validar y revalidar token
router.get('/renew',validarJWT, renovarToken)


export default router;