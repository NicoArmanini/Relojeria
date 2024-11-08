import express from 'express'
import rutasCrud from './enfoque2/usuarios/rutasCRUD.mjs'
import { controladorObtenerProducto, controladorObtenerProductos } from './enfoque2/productos/controlador.productos.mjs'

const app = express()
//primero traigo el front
app.use(express.static('www'))
//despues uso la importacion
app.use(rutasCrud)


const rutasCRUD = express.Router()
//parsear datos enviados al cliente
rutasCRUD.use('/api/v1', express.json())

rutasCRUD.get('/api/v1/productos', controladorObtenerProductos)
rutasCRUD.get('/api/v1/productos/:id', controladorObtenerProducto)

app.listen(3000)