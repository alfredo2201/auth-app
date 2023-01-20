import express from "express";
import cors from "cors";
import router from "./routes/auth.route.js";
import * as dotenv from "dotenv";
import dbConnection from "./db/config.js";
import path from 'path';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);

const __dirname = path.dirname(__filename);
dotenv.config();
const app = express();

//Base de datos
await dbConnection();


//Directorio publico
app.use(express.static('public'))

app.use(cors());

app.use(express.json());

app.use("/api/auth",router);

//Manejar demas rutas
app.get('*', (req,res )=>{
  res.sendFile(path.resolve( __dirname,'public/index.html'));
})

app.listen(4000, () => {
  console.log(`Servidor corriendo en puerto ${process.env.PORT}`);
});
