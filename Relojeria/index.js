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

    // Obtener el formulario de compra y escuchar el evento de envío
    const formularioCompra = document.getElementById('formulario-compra');
    formularioCompra.addEventListener('submit', (event) => {
    event.preventDefault(); // Prevenir el envío del formulario por defecto

    let total = 0;
    // Crear un array con los detalles de cada producto en el carrito
    const detallesCarrito = carrito.map(producto => ({
        nombre: producto.nombre,
        cantidad: producto.cantidad,
        precioUnitario: producto.precio,
        subtotal: (producto.precio * producto.cantidad).toFixed(2), // Calcular el precio total por producto
        precioFinal: total += (producto.precio * producto.cantidad) // Inicializo un variable en 0 para que luego a la misma se le sumen todos los subtotales y generar el precio final
    }));

    // Convertir los detalles del carrito a JSON y asignarlo a un campo oculto en el formulario
    document.getElementById('carrito-datos').value = JSON.stringify(detallesCarrito);

    // Crear un objeto con todos los datos de la compra
    const datosCompra = {
        carrito: detallesCarrito // Incluir los detalles del carrito en el objeto de datos de compra
    };

    // Mostrar la confirmación de la compra en la misma página
    mostrarConfirmacionCompra(datosCompra);

     // Enviar el formulario
     setTimeout(() => {
        formularioCompra.submit();
    }, 10000); // 20000 milisegundos = 20 segundos
    });

    
   // Función para mostrar la confirmación de la compra dentro del dialog
    function mostrarConfirmacionCompra(datosCompra) {
    const confirmacionDiv = document.createElement('div');
    confirmacionDiv.innerHTML = `
        <h2>Compra Confirmada</h2>
        <h6>Esta ventana desaparecera luego de 15 segundos</h6><br>
        <h3>Detalles del Carrito</h3>
        <ul>
            ${datosCompra.carrito.map(item => `
                <span><b>Nombre:</b> ${item.nombre}</span><br>
                <span><b>Precio Unitario:</b> $${item.precioUnitario.toFixed(2)}</span><br>
                <span><b>Cantidad:</b> ${item.cantidad}</span><br>
                <span><b>Subtotal:</b> $${item.subtotal}</span><br>
                <span><b>Precio Final: $${item.precioFinal}</b></span><br><br>
            `).join('')}
        </ul>
    `;

    // Obtener el dialog de confirmación
    const dialogConfirmacion = document.getElementById('myDialog-respuesta');
    // Limpiar contenido previo del dialog
    dialogConfirmacion.innerHTML = '';
    // Agregar el contenido de confirmación al dialog
    dialogConfirmacion.appendChild(confirmacionDiv);
    
    // Mostrar el dialog de confirmación
    dialogConfirmacion.showModal();
     // Cerrar el dialog después de 20 segundos
     setTimeout(() => {
        dialogConfirmacion.close();
    }, 15000); //  20000 milisegundos = 20 segundos
    }

});
