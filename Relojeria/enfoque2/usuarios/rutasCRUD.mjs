import express from 'express'
import { controladorObtenerProducto, controladorObtenerProductos, controladorInsertarProductos, controladorModificarProductos, controladorEliminarProducto} from '../productos/controlador.productos.mjs'

const rutasCRUD = express.Router()
//parsear datos enviados al cliente
rutasCRUD.use('/api/v1', express.json())

// obtener productos

rutasCRUD.get('/api/v1/productos', controladorObtenerProductos)
rutasCRUD.get('/api/v1/productos/:id', controladorObtenerProducto)
rutasCRUD.post('/api/v1/productos', controladorInsertarProductos)
rutasCRUD.put('/api/v1/productos/:id', controladorModificarProductos)
rutasCRUD.delete('/api/v1/productos/:id', controladorEliminarProducto);

export default rutasCRUD
