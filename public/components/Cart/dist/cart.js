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
        return "\n    <div class=\"cart-container\">\n        <div class=\"row\">\n            <div class=\"col-md-8 cart-inPage\">\n                <div class=\"title\">\n                    <div class=\"row\">\n                        <div class=\"col\"><h4><b>Shopping Cart</b></h4></div>\n                        <div class=\"col align-self-center text-right text-muted\">" + totalItems + " items</div>\n                    </div>\n                </div>    \n                " + renderProductsInCart(products_1) + "\n                <div class=\"back-to-shop\">\n                <a href=\"../index.html\" class=\"text-muted\">&leftarrow; Back to shop</a>\n        </div>\n            <div class=\"col-md-4 summary\">\n                <div><h5><b>Summary</b></h5></div>\n                <hr>\n                <div class=\"row\">\n                    <div class=\"col\">ITEMS " + totalItems + "</div>\n                    <div class=\"col text-right\">$ " + totalPrice + "</div>\n                </div>\n                <form>\n                    <p>SHIPPING</p>\n                    <select id=\"delivery-options\">\n                        <option value=\"5\" class=\"text-muted\">Standard-Delivery- $5.00 - $ " + (totalPrice + 5).toFixed(2) + " - 14-20 Days</option>\n                        <option value=\"10\" class=\"text-muted\">Express-Delivery- $10.00 $ " + (totalPrice + 10).toFixed(2) + " - 2-7 Days</option>\n                    </select>\n                    <p>APPLY DISCOUNT CODE</p>\n                    <input id=\"code\" placeholder=\"Enter your code\">\n                </form>\n                <div class=\"row\" >\n                    <div class=\"col\">TOTAL PRICE</div>\n                <div class=\"col text-right\" id=\"total-price\">" + totalPrice + "</div>\n                </div>\n                <button class=\"btn\">CHECKOUT</button>\n            </div>\n        </div>\n    </div>";
    }
    catch (e) {
        console.error(e);
        return "";
    }
}
function renderProductsInCart(products) {
    var aggregatedProducts = products.reduce(function (acc, current) {
        var product = current.product, quantity = current.quantity;
        if (acc[product._id]) {
            acc[product._id].quantity += quantity;
        }
        else {
            acc[product._id] = { product: product, quantity: quantity };
        }
        return acc;
    }, {});
    var uniqueProducts = Object.values(aggregatedProducts);
    return uniqueProducts
        .map(function (_a) {
        var product = _a.product, quantity = _a.quantity;
        return "\n     <div class=\"cartPage-container\">\n    <div class=\"row border-top border-bottom\" id=\"product-" + product._id + "\">\n        <div class=\"row main align-items-center\">\n            <div class=\"col-2\">\n                <img class=\"img-fluid\" src=\"" + product.image + "\" alt=\"" + product.name + "\">\n            </div>\n            <div class=\"col\">\n                <div class=\"row\">" + product.name + "</div>\n            </div>\n            <div class=\"col\">\n                <a id=\"decrease-qty-" + product._id + "\" class=\"decrease-qty\">-</a>\n                <span class=\"border\">" + quantity + "</span>\n                <a id=\"increase-qty-" + product._id + "\" class=\"increase-qty\">+</a>\n            </div>\n            <div class=\"col\">\n                $ " + product.price + " * " + quantity + "\n            </div>\n            <div class=\"col\">\n                $ " + (product.price * quantity).toFixed(2) + " \n                <i class=\"close fa-solid fa-x\" id=remove-" + product._id + "></i>\n            </div>\n        </div>\n    </div>\n</div>\n                ";
    })
        .join("");
}
function fetchCartProducts() {
    return __awaiter(this, void 0, Promise, function () {
        var response, cart, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 3, , 4]);
                    return [4 /*yield*/, fetch("http://localhost:3000/api/cart/get-cart")];
                case 1:
                    response = _a.sent();
                    if (!response.ok) {
                        throw new Error("Failed to fetch products");
                    }
                    return [4 /*yield*/, response.json()];
                case 2:
                    cart = _a.sent();
                    renderCartPage(cart);
                    return [3 /*break*/, 4];
                case 3:
                    error_1 = _a.sent();
                    console.error("Error fetching cart products:", error_1);
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    });
}
function renderCartPage(cart) {
    return __awaiter(this, void 0, Promise, function () {
        var cartContainer;
        return __generator(this, function (_a) {
            try {
                cartContainer = document.querySelector("#main");
                if (!cartContainer)
                    throw new Error("Cart container not found!");
                cartContainer.innerHTML = renderCart(cart);
                handleUpdateCart(cart.products);
                // await updateTotalPrice();
            }
            catch (error) {
                console.error("Error rendering cart page:", error);
            }
            return [2 /*return*/];
        });
    });
}
// document.addEventListener("DOMContentLoaded", () => {
var cartIcon = document.getElementById("cart-icon");
if (cartIcon) {
    cartIcon.addEventListener("click", function () {
        fetchCartProducts();
    });
}
else {
    console.error("Cart icon not found!");
}
// });
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
function handleUpdateCart(products) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            products.forEach(function (product) {
                try {
                    var decreaseElement = document.getElementById("decrease-qty-" + product.product._id);
                    if (!decreaseElement)
                        throw new Error("Product " + product.product._id + " not found");
                    var increaseElement = document.getElementById("increase-qty-" + product.product._id);
                    if (!increaseElement)
                        throw new Error("Product " + product.product._id + " not found");
                    var removeElement = document.getElementById("remove-" + product.product._id);
                    if (!removeElement)
                        throw new Error("Product " + product.product._id + " not found");
                    decreaseElement === null || decreaseElement === void 0 ? void 0 : decreaseElement.addEventListener("click", function () {
                        return fetchCartAndUpdate(product, "decrease");
                    });
                    increaseElement === null || increaseElement === void 0 ? void 0 : increaseElement.addEventListener("click", function () {
                        return fetchCartAndUpdate(product, "increase");
                    });
                    removeElement === null || removeElement === void 0 ? void 0 : removeElement.addEventListener("click", function () {
                        return fetchCartAndUpdate(product, "remove");
                    });
                }
                catch (error) {
                    console.error(error);
                }
            });
            return [2 /*return*/];
        });
    });
}
function fetchCartAndUpdate(products, action) {
    return __awaiter(this, void 0, void 0, function () {
        var productId, response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    productId = products.product._id;
                    return [4 /*yield*/, fetch("http://localhost:3000/api/cart/update-cart", {
                            method: "PATCH",
                            headers: { "Content-Type": "application/json" },
                            body: JSON.stringify({ productId: productId, action: action })
                        })];
                case 1:
                    response = _a.sent();
                    if (!response)
                        throw new Error("Failed to fetch cart");
                    return [4 /*yield*/, fetchCartProducts()];
                case 2:
                    _a.sent();
                    showCartItemsCount();
                    return [2 /*return*/];
            }
        });
    });
}
;
