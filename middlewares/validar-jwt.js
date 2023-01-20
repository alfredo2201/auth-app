import jwt from "jsonwebtoken";

export const validarJWT = (req, res, next) => {
  const token = req.header("x-token");

  if (!token) {
    return res.status(401).json({
      ok: false,
      msj: "error en el token",
    });
  }

  try {
    const { uuid,name } = jwt.verify(token, process.env.SECRET_JWT_SEDD);
    req.uuid = uuid
    req.name = name
  } catch (error) {
    return res.status(401).json({
      ok: false,
      msj: "token no valido",
    });
  }
  next()
};
