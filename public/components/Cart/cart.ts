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

const products: Product[] = [];

function renderCart(products: Product[]): string {
    const totalItems = products.reduce((acc, product) => acc + product.quantity, 0);
    const totalPrice = products.reduce((acc, product) => acc + product.price * product.quantity, 0).toFixed(2);

    return `
    <div class="cart-container">
        <div class="row">
            <div class="col-md-8 cart-inPage">
                <div class="title">
                    <div class="row">
                        <div class="col"><h4><b>Shopping Cart</b></h4></div>
                        <div class="col align-self-center text-right text-muted">${totalItems} items</div>
                    </div>
                </div>    
                ${renderProductsInCart(products)}
        <div class="back-to-shop">
  <a href="../index.html" class="text-muted">&leftarrow; Back to shop</a>
</div>
            <div class="col-md-4 summary">
                <div><h5><b>Summary</b></h5></div>
                <hr>
                <div class="row">
                    <div class="col">ITEMS ${totalItems}</div>
                    <div class="col text-right">$ ${totalPrice}</div>
                </div>
                <form>
                    <p>SHIPPING</p>
                    <select id="delivery-options">
  <option value="5" class="text-muted">Standard-Delivery- $5.00 - 14-20 Days</option>
  <option value="10" class="text-muted">Express-Delivery- $10.00 - 2-7 Days</option>
</select>
                    <p>APPLY DISCOUNT CODE</p>
                    <input id="code" placeholder="Enter your code">
                </form>
                <div class="row" style="border-top: 1px solid rgba(0,0,0,.1); padding: 2vh 0;">
                    <div class="col">TOTAL PRICE</div>
<div class="col text-right" id="total-price">${" "}</div>
                </div>
                <button class="btn">CHECKOUT</button>
            </div>
        </div>
    </div>`;
}

function renderProductsInCart(products: Product[]): string {
    return products.map(product => `
     <div class="cartPage-container">
    <div class="row border-top border-bottom" id="product-${product._id}">
        <div class="row main align-items-center">
            <div class="col-2">
                <img class="img-fluid" src="${product.image}" alt="${product.name}">
            </div>
            <div class="col">
                <div class="row text-muted">${product.category?.name || "Uncategorized"}</div>
                <div class="row">${product.name}</div>
            </div>
            <div class="col">
                <a href="#" class="decrease-qty">-</a>
                <span class="border">${product.quantity}</span>
                <a href="#" class="increase-qty">+</a>
            </div>
            <div class="col">
                € ${(product.price * product.quantity).toFixed(2)} 
                <span class="close">&#10005;</span>
            </div>
        </div>
    </div>
</div>
                `).join('')
}

async function fetchCartProducts(): Promise<void> {
    console.log("Fetching cart products");
    try {
        const response = await fetch("http://localhost:3000/api/cart/get-cart");
        if (!response.ok) {
            throw new Error("Failed to fetch products");
        }
        const cartProducts = await response.json();
  
        renderCartPage(cartProducts);
    } catch (error) {
        console.error("Error fetching cart products:", error);
    }
}

function renderCartPage(products: Product[]): void {
    try {


        const cartContainer = document.querySelector('#product-list') as HTMLElement;
        if (!cartContainer) throw new Error('Cart container not found!');
        console.log(renderCart(products))
        cartContainer.innerHTML = renderCart(products);
        cartContainer.style.display = 'block';

    } catch (error) {
        console.error("Error rendering cart page:", error);

    }
}

function showCart(): void {
    fetchCartProducts();
}

document.addEventListener('DOMContentLoaded', () => {
    const cartIcon = document.getElementById('cart-icon');
    if (cartIcon) {
        cartIcon.addEventListener('click', () => {
            showCart();
        });
    } else {
        console.error('Cart icon not found!');
    }
});



/// Delivery options 
async function fetchTotalPrice(): Promise<number> {
    try {
      const response = await fetch("/api/cart/total"); 
      if (!response.ok) {
        throw new Error("Failed to fetch total price");
      }
      const data: CartData = await response.json();
      return data.totalPrice;
    } catch (error) {
      console.error("Error fetching total price:", error);
      return 5; 
    }
  }
  
  async function updateTotalPrice(): Promise<void> {
    const deliveryOptions = document.getElementById("delivery-options") as HTMLSelectElement | null;
    const totalPriceElement = document.querySelector(".col.text-right") as HTMLElement | null;
  
    if (!deliveryOptions || !totalPriceElement) return;
  
    try {
      const baseTotalPrice = await fetchTotalPrice();
  
      const deliveryCost: number = parseFloat(deliveryOptions.value) || 0;
      const updatedPrice: string = (baseTotalPrice + deliveryCost).toFixed(2);
  
      totalPriceElement.textContent = `$ ${updatedPrice}`;
    } catch (error) {
      console.error("Error updating total price:", error);
    }
  }
  
  const deliveryOptions = document.getElementById("delivery-options") as HTMLSelectElement | null;
  if (deliveryOptions) {
    deliveryOptions.addEventListener("change", updateTotalPrice);
  }
  
  updateTotalPrice();
