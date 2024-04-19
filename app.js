const productContainer = document.querySelector(".Products");
const addedItems = document.querySelector(".items");
const ShoppingCart = document.querySelector(".shopping-cart");
const userAddeedItems = document.querySelector(".added-products");
const productsTitle = document.querySelector(".products-title");
const closeuserAddedItems = document.querySelector(".fa-xmark");
const SearchItems = document.querySelector("#search-bar");
let addedProducts = 0;
const fetchProducts = async () => {
  try {
    const response = await fetch("https://dummyjson.com/products");
    const products = await response.json();

    const items = products.products;
    console.log(items);

    UserSearchItems(items);

    if (!items || items.length === 0) {
      alert("No products to display");
      return;
    }

    items.forEach((item) => {
      const card = document.createElement("div");
      card.classList.add("card");

      const image = document.createElement("img");
      image.classList.add("productsimages");
      image.src = item.thumbnail;

      const crateDescription = document.createElement("p");
      crateDescription.classList.add("products-description");
      crateDescription.textContent = item.description;
      const createPrice = document.createElement("span");
      createPrice.style.color = "#2ecc71";
      createPrice.textContent = `$${item.price}`;
      const createBrand = document.createElement("h3");
      createBrand.innerText = item.brand;
      createBrand.style.marginTop = "10px";
      createBrand.style.color = "#353b48";
      const addToCartBtn = document.createElement("button");
      addToCartBtn.textContent = "Add to cart";
      addToCartBtn.classList.add("addtocart");
      addToCartBtn.addEventListener("click", () => {
        addedItems.textContent = ++addedProducts;
        ShoppingItems(item.title, item.thumbnail, item.price, item.brand);
        userAddeedItems.classList.add("show-added-products");
      });
      card.appendChild(image);
      card.appendChild(addToCartBtn);
      productContainer.appendChild(card);
      card.appendChild(crateDescription);
      card.appendChild(createPrice);
      card.appendChild(createBrand);
    });
  } catch (error) {
    console.log("Error fetching products:", error);
  }
};

const ShoppingItems = (title, productsimage, price) => {
  const createTitle = document.createElement("h6");
  const createImg = document.createElement("img");
  const createQuantity = document.createElement("input");
  const createCartPrice = document.createElement("span");
  createCartPrice.innerText = `$${price}`;

  const createRemoveBtn = document.createElement("button");
  createRemoveBtn.innerText = "x";
  createRemoveBtn.classList.add("Removebtn");
  createQuantity.classList.add("Quantity");
  createQuantity.type = "number";
  createQuantity.value = "1";

  createRemoveBtn.addEventListener("click", () => {
    addedItems.textContent = --addedProducts;
    createImg.remove();
    createTitle.remove();
    createQuantity.remove();
    createRemoveBtn.remove();
    createCartPrice.remove();
  });
  createImg.src = productsimage;
  createImg.classList.add("added-products-info-img");
  createTitle.innerText = title;
  userAddeedItems.appendChild(createTitle);
  userAddeedItems.appendChild(createImg);
  userAddeedItems.appendChild(createQuantity);
  userAddeedItems.appendChild(createRemoveBtn);
  userAddeedItems.appendChild(createCartPrice);
};
closeuserAddedItems.addEventListener("click", () => {
  userAddeedItems.classList.remove("show-added-products");
});

const UserSearchItems = (userSearchItems) => {
  SearchItems.addEventListener("input", (e) => {
    const userInput = e.target.value.trim().toLowerCase(); // Get the user input and convert it to lowercase
    const filteredItems = userSearchItems.filter((item) =>
      item.title.toLowerCase().includes(userInput)
    ); // Filter products based on title matching the user input

    // Clear the existing products before displaying the filtered ones
    productContainer.innerHTML = "";

    if (filteredItems.length > 0) {
      filteredItems.forEach((item) => {
        const card = document.createElement("div");
        card.classList.add("card");
        const image = document.createElement("img");
        image.classList.add("productsimages");
        image.src = item.thumbnail;

        const crateDescription = document.createElement("p");
        crateDescription.classList.add("products-description");
        crateDescription.textContent = item.description;
        const createPrice = document.createElement("span");
        createPrice.style.color = "#2ecc71";
        createPrice.textContent = `$${item.price}`;

        const addToCartBtn = document.createElement("button");
        addToCartBtn.textContent = "Add to cart";
        addToCartBtn.classList.add("addtocart");
        addToCartBtn.addEventListener("click", () => {
          addedItems.textContent = ++addedProducts;
          ShoppingItems(item.title, item.thumbnail, item.price);
          userAddeedItems.classList.add("show-added-products");
        });
        card.appendChild(image);
        card.appendChild(addToCartBtn);
        productContainer.appendChild(card);
        card.appendChild(crateDescription);
        card.appendChild(createPrice);
      });
    } else {
      // If no matching products found, display an error message
      productContainer.innerHTML = "<p>No products found</p>";
    }
  });
};
// initial function call 
fetchProducts();
