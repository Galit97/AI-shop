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
    showCartItemsCount();
  }

}

function openLoginPopup() {
  const loginPopup = document.getElementById("loginPopup");
}
