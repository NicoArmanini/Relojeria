import express from 'express'
import rutasCrud from './enfoque2/usuarios/rutasCRUD.mjs'

const app = express()
//primero traigo el front
app.use(express.static('www'))
//despues uso la importacion
app.use(rutasCrud)

app.listen(3000)