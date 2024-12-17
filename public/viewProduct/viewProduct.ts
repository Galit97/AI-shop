interface category{
  id: string,
  name: string,
}

interface Product{
    id: string;
    name: string;
    description: string;
    category: Category | null;
    price: number;
    quantity: number;
    inSale: boolean;
    image: string;
};


function renderProductView(product: Product) {
    const container = document.getElementById("viewProduct");
    if (!container) return;
    console.log("product", product);
    container.innerHTML = `
        <div class="product-view">
            <div class="main-image">
                 <img src="${product.image}" alt="${product.name}" class="product-image" />
            </div>
            <div class="product-details">
              <h1 class="product-title">${product.name}</h1>
              <p class="product-price">$ ${product.price}</p>
              <p class="product-description">${product.description}</p>
              <div class="product-options">
                <label for="size">Size:</label>
                <select id="size">
                  <option value="small">Small</option>
                  <option value="medium">Medium</option>
                  <option value="large">Large</option>
                </select>
                <input type="number" id="quantity" value="1" min="1">
              </div>

              <button class="add-to-cart" onclick="addToCart(${product.id})">Add to Cart</button>
              
            </div>
        </div>
    `
};


function navigateToViewProduct() {
    const queryString = window.location.search;
    const params:any = new URLSearchParams(queryString);

    const viewProductParam = params.get("viewProductParam");
    const mainSection = document.getElementById("main");
    const productViewSection = document.getElementById("viewProduct");
    if(!mainSection || !productViewSection) throw new Error("main section or product section not found");

    if (viewProductParam) {
      mainSection.style.display = "none";
      productViewSection.style.display = "block";

      fetchProduct(viewProductParam);
    };
};

async function fetchProduct(productId: string) {

      try {
          const response = await fetch('http://localhost:3000/api/products/get-product', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({"id": productId}),
          });

      console.log(response);

      const data = await response.json();
      console.log("data", data);

    if (response.ok) {
        console.log('success getting product');
        renderProductView(data.product);
    }} catch (err) {

    }
};

async function addToCart(productId: string) {
    const response = await fetch("http://localhost:3000/api/clients/get-client");
    if (!response.ok) {
        //if client is not connected then show login pop up
    }

    console.log(response); 
};

function openLoginPopup() {
  const queryString = window.location.search;
  const params:any = new URLSearchParams(queryString);

  const loginParam = params.get('loginParam');


  const loginPopup = document.getElementById('loginPopup'); 
  // handleFormLogin();
  if (!loginParam) {
    loginPopup!.style.display = 'none';
  } else {
    loginPopup!.style.display = 'block';
  };
}



navigateToViewProduct();