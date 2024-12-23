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

interface Cart {
  products: { product: Product; quantity: number }[];
  total: number;
}

const products: Product[] = [];

function renderCart(cart: Cart): string {
  try {
    if (!cart || !cart.products) throw new Error("cart is missing");

    const totalItems = cart.products.reduce(
      (acc, product) => acc + product.quantity,
      0
    );

    const totalPrice = cart.total;
    const products = cart.products;

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
                        <option value="5" class="text-muted">Standard-Delivery- $5.00 - $ ${(
                          totalPrice + 5
                        ).toFixed(2)} - 14-20 Days</option>
                        <option value="10" class="text-muted">Express-Delivery- $10.00 $ ${(
                          totalPrice + 10
                        ).toFixed(2)} - 2-7 Days</option>
                    </select>
                    <p>APPLY DISCOUNT CODE</p>
                    <input id="code" placeholder="Enter your code">
                </form>
                <div class="row" >
                    <div class="col">TOTAL PRICE</div>
                <div class="col text-right" id="total-price">${totalPrice}</div>
                </div>
                <button class="btn">CHECKOUT</button>
            </div>
        </div>
    </div>`;
  } catch (e) {
    console.error(e);
    return ``;
  }
}

function renderProductsInCart(
  products: { product: Product; quantity: number }[]
): string {

   const aggregatedProducts = products.reduce(
    (acc: { [key: string]: { product: Product; quantity: number } }, current) => {
      const { product, quantity } = current;

      if (acc[product._id]) {
        acc[product._id].quantity += quantity;
      } else {
        acc[product._id] = { product, quantity };
      }
      return acc;
    },
    {}
  );
  const uniqueProducts = Object.values(aggregatedProducts);
  return uniqueProducts
    .map(
      ({ product, quantity }) => `
     <div class="cartPage-container">
    <div class="row border-top border-bottom" id="product-${product._id}">
        <div class="row main align-items-center">
            <div class="col-2">
                <img class="img-fluid" src="${product.image}" alt="${
        product.name
      }">
            </div>
            <div class="col">
                <div class="row">${product.name}</div>
            </div>
            <div class="col">
                <a id="decrease-qty-${product._id}" class="decrease-qty">-</a>
                <span class="border">${quantity}</span>
                <a id="increase-qty-${product._id}" class="increase-qty">+</a>
            </div>
            <div class="col">
                $ ${product.price} * ${quantity}
            </div>
            <div class="col">
                $ ${(product.price * quantity).toFixed(2)} 
                <i class="close fa-solid fa-x" id=remove-${product._id}></i>
            </div>
        </div>
    </div>
</div>
                `
    )
    .join("");
}

async function fetchCartProducts(): Promise<void> {
  try {
    const response = await fetch("http://localhost:3000/api/cart/get-cart");
    if (!response.ok) {
      throw new Error("Failed to fetch products");
    }
    const cart = await response.json();

    renderCartPage(cart);
  } catch (error) {
    console.error("Error fetching cart products:", error);
  }
}

async function renderCartPage(cart: Cart): Promise<void> {
  try {
    const cartContainer = document.querySelector("#main") as HTMLElement;
    if (!cartContainer) throw new Error("Cart container not found!");

    cartContainer.innerHTML = renderCart(cart);

    handleUpdateCart(cart.products);
    // await updateTotalPrice();
  } catch (error) {
    console.error("Error rendering cart page:", error);
  }
}

// document.addEventListener("DOMContentLoaded", () => {
  const cartIcon = document.getElementById("cart-icon");
  if (cartIcon) {
    cartIcon.addEventListener("click", () => {
      fetchCartProducts();
    });
  } else {
    console.error("Cart icon not found!");
  }
// });


async function fetchTotalPrice(): Promise<number> {
  try {
    const response = await fetch("/api/cart/total");
    if (!response.ok) {
      throw new Error("Failed to fetch total price");
    }
    const data = await response.json();
    return data.totalPrice;
  } catch (error) {
    console.error("Error fetching total price:", error);
    return 5;
  }
}

async function handleUpdateCart(
  products: { product: Product; quantity: number }[]
) {
  products.forEach((product) => {
    try {
      const decreaseElement = document.getElementById(
        `decrease-qty-${product.product._id}`
      );
      if (!decreaseElement)
        throw new Error(`Product ${product.product._id} not found`);

      const increaseElement = document.getElementById(
        `increase-qty-${product.product._id}`
      );
      if (!increaseElement)
        throw new Error(`Product ${product.product._id} not found`);

      const removeElement = document.getElementById(
        `remove-${product.product._id}`
      );
      if (!removeElement)
        throw new Error(`Product ${product.product._id} not found`);

      decreaseElement?.addEventListener("click", () =>
        fetchCartAndUpdate(product, "decrease")
      );

      increaseElement?.addEventListener("click", () =>
        fetchCartAndUpdate(product, "increase")
      );

      removeElement?.addEventListener("click", () =>
        fetchCartAndUpdate(product, "remove")
      );
    } catch (error) {
      console.error(error);
    }
  });
}

async function fetchCartAndUpdate(
  products: { product: Product; quantity: number },
  action: string
) {
  const productId = products.product._id;

  const response = await fetch("http://localhost:3000/api/cart/update-cart", {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ productId, action }),
  });

  if (!response) throw new Error("Failed to fetch cart");

  await fetchCartProducts();
  showCartItemsCount();
};

