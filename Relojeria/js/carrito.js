export const carrito = [];

export function agregarAlCarrito(producto, cantidad) {
    cantidad = parseInt(cantidad);
    const productoExistente = carrito.find(item => item.id === producto.id);
    if (productoExistente) {
        productoExistente.cantidad += cantidad;
    } else {
        carrito.push({ ...producto, cantidad });
    }
    actualizarCarrito();
}

export function eliminarDelCarrito(index) {
    carrito.splice(index, 1);
    actualizarCarrito();
}

export function actualizarCarrito() {
    const listaCarrito = document.getElementById('lista-carrito');
    const totalCarrito = document.getElementById('total-carrito');
    listaCarrito.innerHTML = '';
    let total = 0;
    carrito.forEach((item, index) => {
        const li = document.createElement('li');
        const subtotal = item.precio * item.cantidad;
        li.innerHTML = `
            <span>${item.nombre}</span>
            <span>Precio Unitario: $${item.precio.toFixed(2)}</span>
            <span>Cantidad: ${item.cantidad}</span>
            <span>Subtotal: $${subtotal.toFixed(2)}</span>
            <button class="eliminar-producto">Eliminar</button>
        `;
        li.querySelector('.eliminar-producto').addEventListener('click', () => {
            eliminarDelCarrito(index);
        });
        listaCarrito.appendChild(li);
        total += subtotal;
    });
    totalCarrito.textContent = total.toFixed(2);
}