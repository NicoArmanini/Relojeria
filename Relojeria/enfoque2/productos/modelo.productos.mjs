// MVC - Modelo
// Funciones encargadas de comunicarse con la capa de datos
import pool from "../../conexiones/conexion.mjs";


async function modeloObtenerProductos(){
    try{
        const resultado = await pool.query('SELECT * FROM tienda')
        return resultado.rows
    }catch(error){
        throw error
    }
}

async function modeloObtenerProductoID(id){
    try{
        const resultado = await pool.query('SELECT * FROM tienda WHERE id=$1',[id]);
        return resultado.rows
    }catch(error){
        throw error
    }
}

//paso producto en singular porque necesito traer un solo datos 
async function modeloInsertarProducto(producto){
    try{
        //validar siempre los datos pero se hace en el tp4
        const {nombre, precio, imagen} = producto
        const resultado = await pool.query(
            `INSERT INTO 
            productos(nombre, precio, imagen)
            VALUES($1,$2,$3) RETURNING id`, [nombre, precio, imagen]);

        return resultado.rows
    }catch(error){
        throw error
    }
}

export {
    modeloObtenerProductos,
    modeloObtenerProductoID,
    modeloInsertarProducto}