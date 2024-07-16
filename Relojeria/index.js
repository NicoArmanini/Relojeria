// Importa la función cargarProductos desde el archivo relojeria.js
import { cargarProductos } from './js/relojeria.js';
// Importa la función renderizarProductos desde el archivo productos.js
import { renderizarProductos } from './js/productos.js';

// Ejecuta la función cuando el documento ha terminado de cargar
document.addEventListener('DOMContentLoaded', async () => {
    // Obtiene el elemento del DOM donde se mostrarán los productos
    const contenedorProductos = document.getElementById('id-productos');
    // Obtiene el elemento del DOM donde se mostrará la lista del carrito
    const listaCarrito = document.getElementById('lista-carrito');
    // Obtiene el elemento del DOM donde se mostrará el total del carrito
    const totalCarrito = document.getElementById('total-carrito');
    // Inicializa el array para almacenar los productos del carrito
    const carrito = [];

    // Carga los productos llamando a la función cargarProductos y espera a que termine
    const productos = await cargarProductos();
    // Llama a la función renderizarProductos para mostrar los productos en el contenedor
    renderizarProductos(productos, contenedorProductos, carrito, listaCarrito, totalCarrito);
});