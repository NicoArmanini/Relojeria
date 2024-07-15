import { relojeria } from './relojeria.js';
import { renderizarProductos } from './productos.js';

document.addEventListener('DOMContentLoaded', () => {
    const contenedorProductos = document.getElementById('id-productos');
    const listaCarrito = document.getElementById('lista-carrito');
    const totalCarrito = document.getElementById('total-carrito');

    renderizarProductos(relojeria.productos1, contenedorProductos);
});