// Exporta la función cargarProductos para que pueda ser utilizada en otros módulos
export async function cargarProductos() {
    try {
        // Realiza una solicitud GET a la URL especificada para obtener los productos
        const response = await fetch('./productos.json');
        console.log(response);  // Revisa los detalles de la respuesta
        
        // Verifica si la respuesta no es satisfactoria (código de estado no es 2xx)
        if (!response.ok) {
            // Lanza un error si la respuesta no es satisfactoria
            throw new Error('Error al cargar los productos');
        }
        
        // Convierte la respuesta en un objeto JSON
        const data = await response.json();
        // Retorna los productos obtenidos
        return data.productos;

    } catch (error) {
        // Muestra un mensaje de error en la consola en caso de fallo
        console.error('Error:', error);
        
        // Retorna un array vacío si ocurre un error
        return [];
    }
}
