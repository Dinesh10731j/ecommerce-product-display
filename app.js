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
        console.log(products)
        const items = products.products;
        console.log(items);

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

            const crateDescription = document.createElement("p");
            crateDescription.classList.add("products-description")
            crateDescription.textContent = item.description;
            const createPrice = document.createElement("span");
            createPrice.textContent = `$${item.price}`;

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
            card.appendChild(crateDescription);
            card.appendChild(createPrice);
        });
    } catch (error) {
        console.log("Error fetching products:", error);
    }
};


const ShoppingItems  = (title,productsimage)=>{
const createTitle = document.createElement("h6");
const createImg = document.createElement("img");
const createQuantity = document.createElement("input");

const createRemoveBtn = document.createElement("button");
createRemoveBtn.innerText="x";
createRemoveBtn.classList.add("Removebtn")
createQuantity.classList.add("Quantity")
createQuantity.type = "number"; 
createQuantity.value="1";

createRemoveBtn.addEventListener("click",()=>{
    addedItems.textContent = --addedProducts;
   createImg.remove();
  createTitle.remove();
  createQuantity.remove();
  createRemoveBtn.remove();
})
createImg.src = productsimage;
createImg.classList.add("added-products-info-img")
createTitle.innerText = title;
userAddeedItems.appendChild(createTitle);
userAddeedItems.appendChild(createImg);
userAddeedItems.appendChild(createQuantity);
userAddeedItems.appendChild(createRemoveBtn);

}
closeuserAddedItems.addEventListener("click",()=>{
    userAddeedItems.classList.remove("show-added-products"); 
});

fetchProducts();
