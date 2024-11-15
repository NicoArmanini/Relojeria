
// Obtención del contenedor de productos
const container = document.getElementById('container');

// Función para cargar productos desde la API
async function cargarProductosAPI() {
    try {
        const response = await fetch('http://localhost:3000/api/v1/productos');
        if (!response.ok) throw new Error('Error en la solicitud');
        
        const productos = await response.json(); 
        renderizarProductosEnHTML(productos); // Llamar a la función para renderizar los productos en el HTML
    } catch (error) {
        console.error('Hubo un problema con la solicitud:', error);
    }
}

// Función para renderizar productos dentro de la página
function renderizarProductosEnHTML(arregloProductos) {
    let productoHTML = '';
    arregloProductos.forEach((producto) => {
        productoHTML += `
            <div class="producto">
                <img src="${producto.imagen}" alt="${producto.nombre}">
                <h3>${producto.nombre}</h3>
                <p>${producto.precio} $</p>
                <button class="agregar-carrito" data-id="${producto.id}" data-nombre="${producto.nombre}" data-precio="${producto.precio}">Agregar al Carrito</button>
                <input type="number" class="cantidad" data-id="${producto.id}" value="1" min="1">
            </div>`;
    });
    container.innerHTML = productoHTML;

    // Asignar eventos a los botones de "Agregar al carrito"
    document.querySelectorAll('.agregar-carrito').forEach(boton => {
        boton.addEventListener('click', (e) => {
            const productoId = e.target.dataset.id;
            const productoNombre = e.target.dataset.nombre;
            const productoPrecio = e.target.dataset.precio;
            const cantidadInput = document.querySelector(`input[data-id="${productoId}"]`);
            const cantidad = parseInt(cantidadInput.value);

            agregarAlCarrito({ id: productoId, nombre: productoNombre, precio: productoPrecio, cantidad: cantidad });
        });
    });
}

// Función para agregar productos al carrito
function agregarAlCarrito(producto) {
    // Verificar si el producto ya está en el carrito
    const productoExistente = carrito.find(item => item.id === producto.id);
    if (productoExistente) {
        // Si ya existe, actualizar la cantidad
        productoExistente.cantidad += producto.cantidad;
    } else {
        // Si no existe, agregarlo al carrito
        carrito.push(producto);
    }
    
    actualizarCarrito();
}

// Función para actualizar el carrito en la vista
function actualizarCarrito() {
    const listaCarrito = document.getElementById('lista-carrito');
    const totalCarrito = document.getElementById('total-carrito');
    
    // Limpiar el contenido del carrito
    listaCarrito.innerHTML = '';
    
    let total = 0;
    carrito.forEach((producto) => {
        total += producto.precio * producto.cantidad;
        listaCarrito.innerHTML += `
            <li>
                ${producto.nombre} - $${producto.precio} x ${producto.cantidad}
                <button class="eliminar-carrito" data-id="${producto.id}">Eliminar</button>
            </li>`;
    });

    totalCarrito.textContent = total.toFixed(2);

    // Asignar eventos a los botones de "Eliminar"
    document.querySelectorAll('.eliminar-carrito').forEach(boton => {
        boton.addEventListener('click', (e) => {
            const productoId = e.target.dataset.id;
            eliminarDelCarrito(productoId);
        });
    });
}

// Función para eliminar productos del carrito
function eliminarDelCarrito(id) {
    carrito = carrito.filter(producto => producto.id !== id);
    actualizarCarrito();
}

// Inicializar el carrito vacío
let carrito = [];

// Ejecutar la función cuando el documento ha terminado de cargar
document.addEventListener('DOMContentLoaded', () => {
    cargarProductosAPI(); // Cargar los productos desde la API
});
