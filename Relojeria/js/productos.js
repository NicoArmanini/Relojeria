import { agregarAlCarrito } from './carrito.js';

export function renderizarProductos(productos, contenedorProductos) {
    contenedorProductos.innerHTML = '';
    productos.forEach(producto => {
        const divProducto = document.createElement('div');
        divProducto.classList.add('producto');
        
        divProducto.innerHTML = `
            <img src="${producto.imagen}" alt="${producto.nombre}">
            <h4>${producto.nombre}</h4>
            <p class="precio-unitario">$${producto.precio.toFixed(2)}</p>
            <input type="number" class="cantidad" value="1" min="1">
            <button type="button" class="agregar-carrito">Agregar al Carrito</button>
        `;
        
        divProducto.querySelector('.agregar-carrito').addEventListener('click', () => {
            agregarAlCarrito(producto, divProducto.querySelector('.cantidad').value);
        });
        
        contenedorProductos.appendChild(divProducto);
    });
}