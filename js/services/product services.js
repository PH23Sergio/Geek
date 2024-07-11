const productList = () =>{
    return fetch("http://localhost:3000/products")
            .then((res) => res.json())
            .catch((err) =>console.log(err));
};

const createProducts = (name, price, image) => {
    return fetch("http://localhost:3000/products", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body:   JSON.stringify({
            name: name, 
            price: image,
            image: image,
        }),
    })
    .then((res) => res.json())
    .catch((err) =>console.log(err));
};
// Función para eliminar un producto
async function deleteProduct(id) {
    try {
      const response = await fetch("http://localhost:3000/products", {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error('Error al eliminar el producto');
      }
      console.log(`Producto con id ${id} eliminado`);
      // Eliminar el producto del DOM
      document.querySelector(`.card[data-id="${id}"]`).remove();
    } catch (error) {
      console.error('Error:', error);
    }
  }
  
  // Agregar evento click a los botones de eliminar
  document.querySelectorAll('.delete-button').forEach(button => {
    button.addEventListener('click', (event) => {
      const card = event.target.closest('.card');
      const productId = card.getAttribute('data-id');
      deleteProduct(productId);
    });
  });
  

export const servicesProducts = {
    productList,
    createProducts,
    deleteProduct,
}