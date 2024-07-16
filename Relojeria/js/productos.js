// Importa las funciones agregarAlCarrito y actualizarCarrito desde el archivo carrito.js
import { agregarAlCarrito, actualizarCarrito } from './carrito.js';

// Exporta la función renderizarProductos para su uso en otros módulos
export function renderizarProductos(productos, contenedorProductos, carrito, listaCarrito, totalCarrito) {
    // Limpia el contenido actual del contenedor de productos
    contenedorProductos.innerHTML = '';
    
    // Itera sobre cada producto en la lista de productos
    productos.forEach(producto => {
        // Crea un nuevo elemento div para cada producto
        const divProducto = document.createElement('div');
        // Añade la clase 'producto' al elemento div
        divProducto.classList.add('producto');

        // Establece el contenido HTML del elemento div con los detalles del producto
        divProducto.innerHTML = `
            <img src="${producto.imagen}" alt="${producto.nombre}">
            <h4>${producto.nombre}</h4>
            <p class="precio-unitario">$${producto.precio.toFixed(2)}</p>
            <input type="number" class="cantidad" value="1" min="1">
            <button type="button" class="agregar-carrito">Agregar al Carrito</button>
        `;

        // Añade un evento al botón de agregar al carrito
        divProducto.querySelector('.agregar-carrito').addEventListener('click', () => {
            // Obtiene la cantidad del input asociado al producto
            const cantidad = divProducto.querySelector('.cantidad').value;
            // Añade el producto al carrito
            agregarAlCarrito(producto, cantidad, carrito);
            // Actualiza la vista del carrito
            actualizarCarrito(carrito, listaCarrito, totalCarrito);
        });

        // Añade el elemento div al contenedor de productos
        contenedorProductos.appendChild(divProducto);
    });
}
