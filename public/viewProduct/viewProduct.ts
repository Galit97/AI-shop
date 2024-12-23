interface Category {
  id: string;
  name: string;
}

interface Product {
  _id: string;
  name: string;
  description: string;
  category: Category | null;
  price: number;
  quantity: number;
  inSale: boolean;
  image: string;
  isRecommended: boolean; // Added to handle recommended status
}

async function renderProductView(product: Product) {
  const container = document.getElementById("main");
  if (!container) return;

  container.innerHTML = `
    <div class="product-view">
      <div class="main-image">
        <img src="${product.image}" alt="${product.name}" class="product-image" />
      </div>
      <div class="product-details">
        <h1 class="product-title">${product.name}</h1>
        <p class="product-price">$ ${product.price}</p>
        <p class="product-description">${product.description}</p>
        
        <div class="stars" id='${product._id}'>
          <span class="star" data-value="1">&#9733;</span>
          <span class="star" data-value="2">&#9733;</span>
          <span class="star" data-value="3">&#9733;</span>
          <span class="star" data-value="4">&#9733;</span>
          <span class="star" data-value="5">&#9733;</span>
        </div>
        
        <div class="product-options">
          <label for="size">Size:</label>
          <select id="size">
            <option value="small">Small</option>
            <option value="medium">Medium</option>
            <option value="large">Large</option>
          </select>
          <input type="number" id="quantity" value="1" min="1">
        </div>

        <button class="add-to-cart" id="addToCart-${product._id}">Add to Cart</button>

        <!-- Recommended Products Section -->
        <div id="recommended-products" class="recommended-products">
          <h3>You may also like</h3>
          <div class="product-grid" id="recommended-products-list"></div>
        </div>
      </div>
    </div>
  `;

  // Add event listener for add-to-cart button
  try {
    const productElement = document.getElementById(`addToCart-${product._id}`);
    if (!productElement) throw new Error(`Product ${product._id} not found`);
    productElement?.addEventListener("click", () => {
      const quantityInput = document.getElementById("quantity") as HTMLInputElement;
      const quantity = parseInt(quantityInput.value, 10);
      addToCart(product._id, quantity);
    });
  } catch (error) {
    console.error(error);
  }

  // Fetch and display recommended products
  await renderRecommendedProducts(product._id);
}

// Function to render recommended products based on the current product category or similar
async function renderRecommendedProducts(currentProductId: string) {
  try {
    const response = await fetch("/api/products/get-recommended-products"); // Update this endpoint as necessary
    if (!response.ok) throw new Error("Failed to fetch recommended products");
    
    const recommendedProducts = await response.json();

    // Filter out the current product from recommended products
    const filteredRecommended = recommendedProducts.filter(
      (product: Product) => product._id !== currentProductId
    );

    // Render the recommended products in the page
    const recommendedProductsList = document.getElementById("recommended-products-list");
    if (!recommendedProductsList) return;

    recommendedProductsList.innerHTML = filteredRecommended
      .map((product: Product) => `
        <div class="product-card">
          <div id="product-${product._id}">
            <img src="${product.image}" alt="${product.name}" class="product-image" />
            <h3 class="product-name">${product.name}</h3>
            <p class="product-price">$${product.price}</p>
          </div>
          <button class="button-more" id="addToCart-${product._id}">
            <i class="icon fa-solid fa-cart-shopping"></i> Add to cart
          </button>
        </div>
      `)
      .join("");

    // Add event listeners for each recommended product
    filteredRecommended.forEach((product: Product) => {
      const productElement = document.getElementById(`product-${product._id}`);
      if (productElement) {
        productElement.addEventListener("click", async () => {
          renderProductView(product);
          const clientId = await getClientId();
          setInteraction(clientId, product._id, "view", 1);
          ratingStars();
        });
      }

      const addToCartButton = document.getElementById(`addToCart-${product._id}`);
      if (addToCartButton) {
        addToCartButton.addEventListener("click", () => {
          addToCart(product._id, 1);
        });
      }
    });
  } catch (error) {
    console.error("Error fetching recommended products:", error);
  }
}

// Function to add a product to the cart
async function addToCart(productId: string, quantity: number) {
  const response = await fetch("http://localhost:3000/api/cart/add-to-cart", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ productId, quantity }),
  });
  if (response.ok) {
    const data = await response.json();
    showCartItemsCount();
    setInteraction(data.clientId, productId, "addToCart", 3);
  } 
}

// Function to get client ID (for interaction tracking)
async function getClientId(): Promise<string> {
  const response = await fetch("http://localhost:3000/api/clients/get-client");
  const data = await response.json();
  return data.clientId;
}

// Function to handle product ratings
function ratingStars() {
  const stars = document.querySelectorAll('.star');
  stars.forEach((star: Element) => {
    star.addEventListener('click', async (event: Event) => {
      const clickedStar = event.target as HTMLElement;
      const productId = clickedStar.closest('.stars')?.id;
      const rating = clickedStar.getAttribute('data-value');
  
      if (productId && rating) {
        const allStars = clickedStar.closest('.stars')?.querySelectorAll('.star');
        allStars?.forEach((star) => {
          if (parseInt(star.getAttribute('data-value') || '0') <= parseInt(rating)) {
            star.classList.add('selected');
          } else {
            star.classList.remove('selected');
          }
        });
        const clientId = await getClientId();
        setRating(clientId, productId, parseInt(rating));
      }
    });
  });
}

// Function to set interaction data (views, ratings, etc.)
async function setInteraction(clientId: string, productId: string, type: string, score: number) {
  try {
    const response = await fetch('http://localhost:3000/api/interaction/set-interaction', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ clientId, productId, type, score }),
    });
  } catch (e) {
    console.error(e);
  }
}

// Function to submit the product rating
async function setRating(clientId: string, productId: string, rating: number) {
  try {
    const response = await fetch('http://localhost:3000/api/rating/add-rating', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ clientId, productId, rating }),
    });
    setInteraction(clientId, productId, "rating", rating);
  } catch (e) {
    console.error(e);
  }
}
