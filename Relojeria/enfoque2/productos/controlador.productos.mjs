// MVC - Controlador
// Funciones encargadas de conectar el modelo con las vistas
// Es un intermediario entre ambas capas
import { modeloInsertarProducto, modeloModificarProducto, modeloObtenerProductoID, modeloObtenerProductos, modeloEliminarProducto} from "./modelo.productos.mjs";

//LECTURA, GET
async function controladorObtenerProductos(req, res){
    try {
        const datos = await modeloObtenerProductos() 
        res.status(200).json(datos)  
    } catch (error) {
        res.status(500).json({ mensaje: 'Error en el servidor'});
    }
}

async function controladorObtenerProducto(req, res){
    try {
        const {id} = req.params
        const datos = await modeloObtenerProductoID(id) 
        if (datos.length > 0) {
            res.status(200).json(datos)
        } else {
            res.status(404).json({mensaje: 'Error en el servidor'})
        }
    } catch (error) {
        res.status(500).json({mensaje: 'Error en el servidor'})
    }
}

//ESCRITURA POST
async function controladorInsertarProductos(req, res){
    try {
        // const {nombre, descripcion, precio, categoria, disponibilidad, imagen} = req.body
        const producto = {
            ...req.body
        }
        const datos = await modeloInsertarProducto(producto) 
        res.status(200).json(datos)  
    } catch (error) {
        res.status(500).json(error)
    }
}

// Actualizar un producto en controlador.productos
async function controladorModificarProductos(req, res) {
    try {
        const id = req.params.id;
        const producto = { ...req.body };
        const datos = await modeloModificarProducto(id, producto);
        if (datos) {
            res.status(200).json(datos);
        } else {
            res.status(404).json({ mensaje: 'Producto no encontrado' });
        }
    } catch (error) {
        res.status(500).json({ mensaje: 'Error en el servidor' });
    }
}

// Eliminar un producto en controlador.productos
async function controladorEliminarProducto(req, res) {
    try {
        const id = req.params.id;
        await modeloEliminarProducto(id);
        res.status(204).send(); 
    } catch (error) {
        res.status(500).json({ mensaje: 'Error en el servidor' });
    }
}


export {
    controladorObtenerProducto,
    controladorObtenerProductos,
    controladorInsertarProductos,
    controladorModificarProductos,
    controladorEliminarProducto}
