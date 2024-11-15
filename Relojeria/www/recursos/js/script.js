const apiURL = 'http://localhost:3000/api/v1/productos';

// Cargar todos los productos al inicio
async function cargarProductos() {
    try {
        const response = await fetch(apiURL);
        if (!response.ok) throw new Error('Error al obtener productos');
        const productos = await response.json();

        const container = document.getElementById('productosContainer');
        container.innerHTML = '';

        productos.forEach(producto => {
            container.innerHTML += `
                <div id="producto-${producto.id}">
                    <p><strong>ID:</strong> ${producto.id}</p>
                    <p><strong>Nombre:</strong> ${producto.nombre}</p>
                    <p><strong>Precio:</strong> $${producto.precio}</p>
                    <img src="${producto.imagen}" alt="${producto.nombre}" width="100">
                    <button onclick="eliminarProducto(${producto.id})">Eliminar</button>
                </div>
            `;
        });
    } catch (error) {
        console.error('Error al cargar productos:', error);
    }
}

async function buscarProducto() {
    const id = document.getElementById('searchId').value;

    if (!id) {
        alert('Por favor, ingresa un ID');
        return;
    }

    try {
        const response = await fetch(`${apiURL}/${id}`);
        if (!response.ok) {
            if (response.status === 404) {
                document.getElementById('searchResult').innerText = 'Producto no encontrado';
                document.getElementById('modificarSeccion').style.display = 'none';
                return;
            }
            throw new Error('Error al buscar el producto');
        }

        const [producto] = await response.json();

        document.getElementById('searchResult').innerHTML = `
            <p><strong>ID:</strong> ${producto.id}</p>
            <p><strong>Nombre:</strong> ${producto.nombre}</p>
            <p><strong>Precio:</strong> $${producto.precio}</p>
            <img src="${producto.imagen}" alt="${producto.nombre}" width="100">
        `;
        document.getElementById('modificarSeccion').style.display = 'block';
        document.getElementById('modNombre').value = producto.nombre;
        document.getElementById('modPrecio').value = producto.precio;
        document.getElementById('modImagen').value = producto.imagen.replace('/recursos/imagenes/', '');
    } catch (error) {
        console.error('Error al buscar producto:', error);
    }
}

// Eliminar un producto por ID
async function eliminarProducto(id) {
    if (!confirm(`¿Estás seguro de eliminar el producto con ID ${id}?`)) return;

    try {
        const response = await fetch(`${apiURL}/${id}`, { method: 'DELETE' });
        if (response.status === 204) {
            alert(`Producto con ID ${id} eliminado correctamente.`);
            document.getElementById(`producto-${id}`).remove();
        } else if (response.status === 404) {
            alert('Producto no encontrado.');
        } else {
            throw new Error('Error al eliminar el producto');
        }
    } catch (error) {
        console.error('Error al eliminar producto:', error);
    }
}

// Crear un nuevo producto
async function crearProducto() {
    const nombre = document.getElementById('nuevoNombre').value;
    const precio = document.getElementById('nuevoPrecio').value;
    const imagen = document.getElementById('nuevoImagen').value; // Nombre del archivo, por ejemplo, "producto1.jpg"

    if (!nombre || !precio || !imagen) {
        alert('Todos los campos son obligatorios.');
        return;
    }

    try {
        const response = await fetch(apiURL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ nombre, precio, imagen }),
        });

        if (response.ok) {
            alert('Producto creado exitosamente.');
            cargarProductos();
        } else {
            throw new Error('Error al crear el producto');
        }
    } catch (error) {
        console.error('Error al crear producto:', error);
    }
}

// Modificar un producto existente
async function modificarProducto() {
    const id = document.getElementById('searchId').value;
    const nombre = document.getElementById('modNombre').value;
    const precio = document.getElementById('modPrecio').value;
    const imagen = document.getElementById('modImagen').value;

    if (!nombre || !precio || !imagen) {
        alert('Todos los campos son obligatorios.');
        return;
    }

    try {
        const response = await fetch(`${apiURL}/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ nombre, precio, imagen }),
        });

        if (response.ok) {
            alert('Producto modificado correctamente.');
            cargarProductos();
        } else if (response.status === 404) {
            alert('Producto no encontrado.');
        } else {
            throw new Error('Error al modificar el producto');
        }
    } catch (error) {
        console.error('Error al modificar producto:', error);
    }
}

// Inicializar
window.onload = cargarProductos;
