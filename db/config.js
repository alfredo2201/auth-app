import mongoose from "mongoose";

const dbConnection = async()=>{
    try {
        mongoose.connect(process.env.DB_CONNECTION)
        
        console.log('DB Online')

    } catch (error) {
        console.log(error);
        throw new Error('Erro interno del servidor')
    }
}

export default dbConnection