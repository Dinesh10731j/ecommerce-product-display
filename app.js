const productContainer = document.querySelector(".Products");
const addedItems = document.querySelector(".items");
const ShoppingCart = document.querySelector(".shopping-cart");
const userAddeedItems = document.querySelector(".added-products")

let addedProducts = 0;
const fetchProducts = async () => {
    try {
        const response = await fetch('https://dummyjson.com/products');
        const products = await response.json();
        const items = products.products;

        if (!items || items.length === 0) {
            alert("No products to display.");
            return;
        }

        items.forEach(item => {
            const card = document.createElement("div");
            card.classList.add("card");
            const image = document.createElement("img");
            image.classList.add("productsimages");
            image.src = item.thumbnail;

            const addToCartBtn = document.createElement("button");
            addToCartBtn.textContent = "Add to cart";
            addToCartBtn.classList.add("addtocart");
            addToCartBtn.addEventListener("click", () => {
                addedItems.textContent = ++addedProducts;
                ShoppingItems(item.title)
             
            });
            card.appendChild(image);
            card.appendChild(addToCartBtn);
            productContainer.appendChild(card);
        });
    } catch (error) {
        console.log("Error fetching products:", error);
    }
};


const ShoppingItems  = (title)=>{
    console.log(title)
    userAddeedItems.classList.add("show-added-products")
}


ShoppingCart.addEventListener("click",ShoppingItems);
fetchProducts();
