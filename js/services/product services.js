
const productList = () => {
  return fetch("https://geek-hazel.vercel.app")
      .then((res) => res.json())
      .catch((err) => console.log(err));
};

const createProducts = (name, price, image) => {
  return fetch("https://geek-hazel.vercel.app", {
      method: "POST",
      headers: {
          "Content-Type": "application/json",
      },
      body: JSON.stringify({
          name, 
          price, 
          image,
      }),
  })
  .then((res) => res.json())
  .catch((err) => console.log(err));
};

const deleteProduct = (id) => {
  return fetch(`https://geek-hazel.vercel.app/${id}`, {
      method: "DELETE",
  })
  .then((res) => {
      if (!res.ok) {
          throw new Error('Error al eliminar el producto');
      }
  })
  .catch((err) => console.log(err));
};

export const servicesProducts = {
  productList,
  createProducts,
  deleteProduct,
};
