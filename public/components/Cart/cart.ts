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
            <div class="col-md-8 cart">
                <div class="title">
                    <div class="row">
                        <div class="col"><h4><b>Shopping Cart</b></h4></div>
                        <div class="col align-self-center text-right text-muted">${totalItems} items</div>
                    </div>
                </div>    
                ${products.map((product) => `
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
                `).join('')}
                <div class="back-to-shop">
                    <a href="#">&leftarrow;</a><span class="text-muted">Back to shop</span>
                </div>
            </div>
            <div class="col-md-4 summary">
                <div><h5><b>Summary</b></h5></div>
                <hr>
                <div class="row">
                    <div class="col">ITEMS ${totalItems}</div>
                    <div class="col text-right">€ ${totalPrice}</div>
                </div>
                <form>
                    <p>SHIPPING</p>
                    <select><option class="text-muted">Standard-Delivery- €5.00</option></select>
                    <p>GIVE CODE</p>
                    <input id="code" placeholder="Enter your code">
                </form>
                <div class="row" style="border-top: 1px solid rgba(0,0,0,.1); padding: 2vh 0;">
                    <div class="col">TOTAL PRICE</div>
                    <div class="col text-right">€ ${(parseFloat(totalPrice) + 5).toFixed(2)}</div>
                </div>
                <button class="btn">CHECKOUT</button>
            </div>
        </div>
    </div>`;
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
    const cartContainer = document.querySelector('#cartPage');
    if (cartContainer) {
        cartContainer.innerHTML = renderCart(products);
        cartContainer.style.display = 'block';
    } else {
        console.error('Cart container not found!');
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
