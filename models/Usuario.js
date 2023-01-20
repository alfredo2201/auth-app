import { model, Model,Schema } from "mongoose";

const UsuarioSchema = Schema({
    name:{
        type:String,
        require:true
    },
    email:{
        type:String,
        require:true,
        unique:true
    },
    password:{
        type:String,
        require:true
    }
})

const Usuario = model('Usuarios',UsuarioSchema)
export default Usuario