
const relojeria = {
    productos1: [
        {
            id: 1,
            nombre: 'Citizen Sport Automatic',
            imagen: './imagenes/citizen-sportAutomatic.png',     
            precio: 487.50   
        },

        {
            id: 2,
            nombre: 'Omega Constellation',
            imagen: './imagenes/omegaConstellation.avif',     
            precio: 9200.00   
        },

        {
            id: 3,
            nombre: 'Casio MTP-VD03L-1A',
            imagen: './imagenes/casio-VD03L-1A.avif',     
            precio: 60.50  
        },
 
        {
            id: 4,
            nombre: 'Seiko SPB381',
            imagen: './imagenes/seiko-SPB381.png',     
            precio: 1800.00   
        },

        {
            id: 5,
            nombre: 'Valkur Balder',
            imagen: './imagenes/valkur-Balder-removebg-preview.png',     
            precio: 92.90  
        },

        {
            id: 6,
            nombre: 'Tommy Hilfiger Patrick',
            imagen: './imagenes/tommy-Patrick-removebg-preview.png',     
            precio: 190.00   
        },
    ]
}
console.log(relojeria);

document.addEventListener('DOMContentLoaded', () => {
    const contenedorProductos =  document.getElementById('id-productos');
    const carrito = [];
    const listaCarrito = document.getElementById('lista-carrito');
    const totalCarrito = document.getElementById('total-carrito');

    
    function renderizarProductos(productos) {
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
        
        function agregarAlCarrito(producto, cantidad) {
            cantidad = parseInt(cantidad);
            const productoExistente = carrito.find(item => item.id === producto.id);
            if (productoExistente) {
                productoExistente.cantidad += cantidad;
            } else {
                carrito.push({ ...producto, cantidad });
            }
            actualizarCarrito();
        }
        
        function actualizarCarrito() {
            
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
        function eliminarDelCarrito(index) {
            carrito.splice(index, 1);
            actualizarCarrito();
        }

        renderizarProductos(relojeria.productos1, relojeria.productos2, contenedorProductos)
})

