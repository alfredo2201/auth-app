import Usuario from "../models/Usuario.js";
import bcrypt from "bcryptjs";
import { generarJWT } from "../helpers/jwt.js";

export const crearUsuario = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    //Validar correo distinto
    const usuario = await Usuario.findOne({ email });
    if (usuario) {
        return res.status(400).json({
        ok: false,
        msg: "Usuario ya existe con ese email",
      });
    }
    //Crear usuario con modelo
    const dbUser = new Usuario(req.body);
    //Encryp
    const salt = bcrypt.genSaltSync(10);

    dbUser.password = bcrypt.hashSync(password, salt);
    //Generar token

    const token = await generarJWT(dbUser.id, name);

    //Crear en db
    await dbUser.save();

    //Respuesta
    res.status(201).json({
      ok: true,
      uuid: dbUser.id,
      name: dbUser.name,
      email:dbUser.email,
      msg: "Usuario creado",
      token: token,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "Por favor hable con el administrador",
    });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const usuario = await Usuario.findOne({ email });
    if (!usuario) {
         return res.status(400).json({
          ok: false,
          msg: "Credenciales no son validas",
        });
      }

    //Confirmar password
    const validPassword = bcrypt.compare(password,usuario.password)
    if(!validPassword){
        return res.status(400).json({
            ok: false,
            msg: "Credenciales no son validas",
          });
    }

    const token = await generarJWT(usuario.id, usuario.name);

    res.json({
        ok: true,
        uuid: usuario.id,
        name: usuario.name,
        email:usuario.email,
        token: token,
      });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      ok: false,
      msg: "Por favor hable con el administrador",
    });

  }
};

export const renovarToken = async (req, res,next) => {
    const { uuid, name }  = req
    const dbUser = await Usuario.findById(uuid)
    const token = await generarJWT(uuid,dbUser.name)
    res.status(201).json({
        ok: true,
        msj: "token valido",
        uuid:uuid,
        name: name,
        email: dbUser.email,
        token
      });
};
