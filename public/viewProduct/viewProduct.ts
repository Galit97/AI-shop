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
}

function renderProductView(product: Product) {
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

              <button class="add-to-cart" id="addToCart-${product._id}"">Add to Cart</button>
              
            </div>
        </div>
    `;

  try {
    const productElement = document.getElementById(`addToCart-${product._id}`);
    if (!productElement) throw new Error(`Product ${product._id} not found`);
    productElement?.addEventListener("click", () => {
      const quantityInput = document.getElementById(
        "quantity"
      ) as HTMLInputElement;
      const quantity = parseInt(quantityInput.value, 10);
      addToCart(product._id, quantity);
    });
  } catch (error) {
    console.error(error);
  }
}

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
        console.log(`Product ${productId} rated with ${rating} stars`, clientId, parseInt(rating));
        setRating(clientId, productId, parseInt(rating));
      }
    });
  });
}

async function setInteraction (clientId: string, productId: string, type: string, score: number) {
  try{
    const response = await fetch('http://localhost:3000/api/interaction/set-interaction', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({clientId, productId, type: type, score: score}),
  });
  

  } catch (e) {
    console.error(e);
  }
};

async function setRating(clientId: string, productId: string, rating: number) {
  try{
    const response = await fetch('http://localhost:3000/api/rating/add-rating', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({clientId, productId, rating: rating}),
  });
  setInteraction(clientId, productId, "rating", rating);

  } catch (e) {
    console.error(e);
  }
}

