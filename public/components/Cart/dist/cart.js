var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var products = [];
function renderCart(cart) {
    try {
        if (!cart || !cart.products)
            throw new Error("cart is missing");
        var totalItems = cart.products.reduce(function (acc, product) { return acc + product.quantity; }, 0);
        var totalPrice = cart.total;
        var products_1 = cart.products;
        return "\n    <div class=\"cart-container\">\n        <div class=\"row\">\n            <div class=\"col-md-8 cart-inPage\">\n                <div class=\"title\">\n                    <div class=\"row\">\n                        <div class=\"col\"><h4><b>Shopping Cart</b></h4></div>\n                        <div class=\"col align-self-center text-right text-muted\">" + totalItems + " items</div>\n                    </div>\n                </div>    \n                " + renderProductsInCart(products_1) + "\n                <div class=\"back-to-shop\">\n                <a href=\"../index.html\" class=\"text-muted\">&leftarrow; Back to shop</a>\n        </div>\n            <div class=\"col-md-4 summary\">\n                <div><h5><b>Summary</b></h5></div>\n                <hr>\n                <div class=\"row\">\n                    <div class=\"col\">ITEMS " + totalItems + "</div>\n                    <div class=\"col text-right\">$ " + totalPrice + "</div>\n                </div>\n                <form>\n                    <p>SHIPPING</p>\n                    <select id=\"delivery-options\">\n  <option value=\"5\" class=\"text-muted\">Standard-Delivery- $5.00 - 14-20 Days</option>\n  <option value=\"10\" class=\"text-muted\">Express-Delivery- $10.00 - 2-7 Days</option>\n</select>\n                    <p>APPLY DISCOUNT CODE</p>\n                    <input id=\"code\" placeholder=\"Enter your code\">\n                </form>\n                <div class=\"row\" >\n                    <div class=\"col\">TOTAL PRICE</div>\n                <div class=\"col text-right\" id=\"total-price\">" + totalPrice + "</div>\n                </div>\n                <button class=\"btn\">CHECKOUT</button>\n            </div>\n        </div>\n    </div>";
    }
    catch (e) {
        console.error(e);
        return "";
    }
}
function renderProductsInCart(products) {
    console.log("in renderProduct", products);
    return products
        .map(function (_a) {
        var product = _a.product, quantity = _a.quantity;
        return "\n     <div class=\"cartPage-container\">\n    <div class=\"row border-top border-bottom\" id=\"product-" + product._id + "\">\n        <div class=\"row main align-items-center\">\n            <div class=\"col-2\">\n                <img class=\"img-fluid\" src=\"" + product.image + "\" alt=\"" + product.name + "\">\n            </div>\n            <div class=\"col\">\n                <div class=\"row\">" + product.name + "</div>\n            </div>\n            <div class=\"col\">\n                <a href=\"#\" class=\"decrease-qty\">-</a>\n                <span class=\"border\">" + quantity + "</span>\n                <a href=\"#\" class=\"increase-qty\">+</a>\n            </div>\n            <div class=\"col\">\n                $ " + product.price + " * " + quantity + "\n            </div>\n            <div class=\"col\">\n                $ " + (product.price * quantity).toFixed(2) + " \n                <i class=\"close fa-solid fa-x\"></i>\n            </div>\n        </div>\n    </div>\n</div>\n                ";
    })
        .join("");
}
function fetchCartProducts() {
    return __awaiter(this, void 0, Promise, function () {
        var response, cartContainer, cart, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    console.log("Fetching cart products");
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 4, , 5]);
                    return [4 /*yield*/, fetch("http://localhost:3000/api/cart/get-cart")];
                case 2:
                    response = _a.sent();
                    if (!response.ok) {
                        cartContainer = document.querySelector("#main");
                        cartContainer.innerHTML = "\n      <h1>You must register first</h1>\n      <a href=\"?registerParam=register\"><h1>Register</h1></a>\n  ";
                        cartContainer.style.display = "flex"; // הפוך את הקונטיינר לגמיש
                        cartContainer.style.flexDirection = "column"; // שנה את כיוון הסידור לעמודה
                        cartContainer.style.justifyContent = "center"; // יישור אנכי
                        cartContainer.style.alignItems = "center"; // יישור אופקי
                        cartContainer.style.height = "100vh"; // גובה כל המסך
                        cartContainer.style.textAlign = "center"; // יישור טקסט
                        cartContainer.style.margin = "0"; // הסר מרווחים חיצוניים
                        cartContainer.style.gap = "20px"; // הוסף מרווחים בין האלמנטים
                        return [2 /*return*/];
                    }
                    return [4 /*yield*/, response.json()];
                case 3:
                    cart = _a.sent();
                    renderCartPage(cart);
                    return [3 /*break*/, 5];
                case 4:
                    error_1 = _a.sent();
                    console.error("Error fetching cart products:", error_1);
                    return [3 /*break*/, 5];
                case 5: return [2 /*return*/];
            }
        });
    });
}
function renderCartPage(cart) {
    try {
        var cartContainer = document.querySelector("#main");
        if (!cartContainer)
            throw new Error("Cart container not found!");
        cartContainer.innerHTML = renderCart(cart);
    }
    catch (error) {
        console.error("Error rendering cart page:", error);
    }
}
function showCart() {
    fetchCartProducts();
}
document.addEventListener("DOMContentLoaded", function () {
    var cartIcon = document.getElementById("cart-icon");
    if (cartIcon) {
        cartIcon.addEventListener("click", function () {
            showCart();
        });
    }
    else {
        console.error("Cart icon not found!");
    }
});
/// Delivery options
function fetchTotalPrice() {
    return __awaiter(this, void 0, Promise, function () {
        var response, data, error_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 3, , 4]);
                    return [4 /*yield*/, fetch("/api/cart/total")];
                case 1:
                    response = _a.sent();
                    if (!response.ok) {
                        throw new Error("Failed to fetch total price");
                    }
                    return [4 /*yield*/, response.json()];
                case 2:
                    data = _a.sent();
                    return [2 /*return*/, data.totalPrice];
                case 3:
                    error_2 = _a.sent();
                    console.error("Error fetching total price:", error_2);
                    return [2 /*return*/, 5];
                case 4: return [2 /*return*/];
            }
        });
    });
}
function updateTotalPrice() {
    return __awaiter(this, void 0, Promise, function () {
        var deliveryOptions, totalPriceElement, baseTotalPrice, deliveryCost, updatedPrice, error_3;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    deliveryOptions = document.getElementById("delivery-options");
                    totalPriceElement = document.querySelector(".col.text-right");
                    if (!deliveryOptions || !totalPriceElement)
                        return [2 /*return*/];
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, fetchTotalPrice()];
                case 2:
                    baseTotalPrice = _a.sent();
                    deliveryCost = parseFloat(deliveryOptions.value) || 0;
                    updatedPrice = (baseTotalPrice + deliveryCost).toFixed(2);
                    totalPriceElement.textContent = "$ " + updatedPrice;
                    return [3 /*break*/, 4];
                case 3:
                    error_3 = _a.sent();
                    console.error("Error updating total price:", error_3);
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    });
}
var deliveryOptions = document.getElementById("delivery-options");
if (deliveryOptions) {
    deliveryOptions.addEventListener("change", updateTotalPrice);
}
updateTotalPrice();
