const productContainer = document.querySelector(".Products");
const addedItems = document.querySelector(".items");
const ShoppingCart = document.querySelector(".shopping-cart");
const userAddeedItems = document.querySelector(".added-products");
const productsTitle = document.querySelector(".products-title");
const closeuserAddedItems = document.querySelector(".fa-xmark");
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
                ShoppingItems(item.title,item.thumbnail);
                userAddeedItems.classList.add("show-added-products");
             
            });
            card.appendChild(image);
            card.appendChild(addToCartBtn);
            productContainer.appendChild(card);
        });
    } catch (error) {
        console.log("Error fetching products:", error);
    }
};


const ShoppingItems  = (title,productsimage)=>{
const createTitle = document.createElement("h6");
const createImg = document.createElement("img");
createImg.src = productsimage;
createImg.classList.add("added-products-info-img")
createTitle.innerText = title;
userAddeedItems.appendChild(createTitle);
userAddeedItems.appendChild(createImg)
}
closeuserAddedItems.addEventListener("click",()=>{
    userAddeedItems.classList.remove("show-added-products"); 
});

fetchProducts();
