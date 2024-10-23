// Exporta la función agregarAlCarrito para su uso en otros módulos
export function agregarAlCarrito(producto, cantidad, carrito) {
    // Convierte la cantidad a un entero
    cantidad = parseInt(cantidad);
    // Busca si el producto ya existe en el carrito
    const productoExistente = carrito.find(item => item.id === producto.id);
    if (productoExistente) {
        // Si el producto ya existe, incrementa su cantidad
        productoExistente.cantidad += cantidad;
    } else {
        // Si el producto no existe, lo añade al carrito con la cantidad especificad
        carrito.push({ ...producto, cantidad });
    }
    // Retorna el carrito actualizado
    return carrito;
}

// Exporta la función actualizarCarrito para su uso en otros módulos
export function actualizarCarrito(carrito, listaCarrito, totalCarrito) {
    // Limpia el contenido actual de la lista del carrito
    listaCarrito.innerHTML = '';
    // Inicializa el total del carrito
    let total = 0;
    // Itera sobre cada item en el carrito
    carrito.forEach((item, index) => {
        // Crea un nuevo elemento de lista para cada producto en el carrito
        const li = document.createElement('li');
        // Calcula el subtotal del producto (precio * cantidad)
        const subtotal = item.precio * item.cantidad;
        // Establece el contenido HTML del elemento de lista
        li.innerHTML = `
            <span>${item.nombre}</span>
            <span>Precio Unitario: $${item.precio.toFixed(2)}</span>
            <span>Cantidad: ${item.cantidad}</span>
            <span>Subtotal: $${subtotal.toFixed(2)}</span>
            <button class="eliminar-producto">Eliminar</button>
        `;
        // Añade un evento al botón de eliminar para eliminar el producto del carrito
        li.querySelector('.eliminar-producto').addEventListener('click', () => {
            carrito.splice(index, 1); // Elimina el producto del carrito
            actualizarCarrito(carrito, listaCarrito, totalCarrito); // Actualiza la vista del carrito
        });
        // Añade el elemento de lista al contenedor de la lista del carrito
        listaCarrito.appendChild(li);
        // Suma el subtotal al total del carrito
        total += subtotal;
        
    });
    // Actualiza el texto del total del carrito
    
    totalCarrito.textContent = total.toFixed(2);
}
