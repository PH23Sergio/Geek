import { servicesProducts } from "../services/product services.js";

const productContainer = document.querySelector("[data-product]");
const form = document.querySelector("[data-form]");

function createCard(name, price, image, id) {
    const card = document.createElement("div");
    card.classList.add("card");

    card.innerHTML = `
        <div class="img-container">
            <img src="${image}" alt="${name}">
        </div>
        <div class="card-container--info">
            <p>${name}</p>
            <div class="card-container--value">
                <p>${price}</p>
                <button class="delete-button" data-id="${id}">
                    <img src="/img/Vector.svg" alt="boton eliminar">
                </button>
            </div>
        </div>
    `;

    const deleteButton = card.querySelector(".delete-button");
    deleteButton.addEventListener("click", handleDelete);

    return card;
}

const render = async () => {
    try {
        const listProducts = await servicesProducts.productList();
        listProducts.forEach((product) => {
            productContainer.appendChild(
                createCard(product.name, product.price, product.image, product.id)
            );
        });
    } catch (error) {
        console.log(error);
    }
};

const handleDelete = async (event) => {
    const button = event.target.closest(".delete-button");
    const productId = button.getAttribute("data-id");
    try {
        await servicesProducts.deleteProduct(productId);
        button.closest(".card").remove();
    } catch (error) {
        console.log("Error al eliminar el producto", error);
        alert("Error al eliminar el producto");
    }
};

form.addEventListener("submit", async (event) => {
    event.preventDefault();
    const name = document.querySelector("[data-name]").value;
    const price = document.querySelector("[data-price]").value;
    const image = document.querySelector("[data-image]").value;

    try {
        const newProduct = await servicesProducts.createProducts(name, price, image);
        productContainer.appendChild(createCard(newProduct.name, newProduct.price, newProduct.image, newProduct.id));
    } catch (error) {
        console.log("Error al crear el producto", error);
    }
});

render();
