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
function renderCart(products) {
    var totalItems = products.reduce(function (acc, product) { return acc + product.quantity; }, 0);
    var totalPrice = products.reduce(function (acc, product) { return acc + product.price * product.quantity; }, 0).toFixed(2);
    return "\n    <div class=\"cart-container\">\n        <div class=\"row\">\n            <div class=\"col-md-8 cart\">\n                <div class=\"title\">\n                    <div class=\"row\">\n                        <div class=\"col\"><h4><b>Shopping Cart</b></h4></div>\n                        <div class=\"col align-self-center text-right text-muted\">" + totalItems + " items</div>\n                    </div>\n                </div>    \n                " + products.map(function (product) {
        var _a;
        return "\n                    <div class=\"row border-top border-bottom\" id=\"product-" + product._id + "\">\n                        <div class=\"row main align-items-center\">\n                            <div class=\"col-2\">\n                                <img class=\"img-fluid\" src=\"" + product.image + "\" alt=\"" + product.name + "\">\n                            </div>\n                            <div class=\"col\">\n                                <div class=\"row text-muted\">" + (((_a = product.category) === null || _a === void 0 ? void 0 : _a.name) || "Uncategorized") + "</div>\n                                <div class=\"row\">" + product.name + "</div>\n                            </div>\n                            <div class=\"col\">\n                                <a href=\"#\" class=\"decrease-qty\">-</a>\n                                <span class=\"border\">" + product.quantity + "</span>\n                                <a href=\"#\" class=\"increase-qty\">+</a>\n                            </div>\n                            <div class=\"col\">\n                                \u20AC " + (product.price * product.quantity).toFixed(2) + " \n                                <span class=\"close\">&#10005;</span>\n                            </div>\n                        </div>\n                    </div>\n                ";
    }).join('') + "\n                <div class=\"back-to-shop\">\n                    <a href=\"#\">&leftarrow;</a><span class=\"text-muted\">Back to shop</span>\n                </div>\n            </div>\n            <div class=\"col-md-4 summary\">\n                <div><h5><b>Summary</b></h5></div>\n                <hr>\n                <div class=\"row\">\n                    <div class=\"col\">ITEMS " + totalItems + "</div>\n                    <div class=\"col text-right\">\u20AC " + totalPrice + "</div>\n                </div>\n                <form>\n                    <p>SHIPPING</p>\n                    <select><option class=\"text-muted\">Standard-Delivery- \u20AC5.00</option></select>\n                    <p>GIVE CODE</p>\n                    <input id=\"code\" placeholder=\"Enter your code\">\n                </form>\n                <div class=\"row\" style=\"border-top: 1px solid rgba(0,0,0,.1); padding: 2vh 0;\">\n                    <div class=\"col\">TOTAL PRICE</div>\n                    <div class=\"col text-right\">\u20AC " + (parseFloat(totalPrice) + 5).toFixed(2) + "</div>\n                </div>\n                <button class=\"btn\">CHECKOUT</button>\n            </div>\n        </div>\n    </div>";
}
function fetchCartProducts() {
    return __awaiter(this, void 0, Promise, function () {
        var response, cartProducts, error_1;
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
                        throw new Error("Failed to fetch products");
                    }
                    return [4 /*yield*/, response.json()];
                case 3:
                    cartProducts = _a.sent();
                    renderCartPage(cartProducts);
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
function renderCartPage(products) {
    var cartContainer = document.querySelector('#cartPage');
    if (cartContainer) {
        cartContainer.innerHTML = renderCart(products);
        cartContainer.style.display = 'block';
    }
    else {
        console.error('Cart container not found!');
    }
}
function showCart() {
    fetchCartProducts();
}
document.addEventListener('DOMContentLoaded', function () {
    var cartIcon = document.getElementById('cart-icon');
    if (cartIcon) {
        cartIcon.addEventListener('click', function () {
            showCart();
        });
    }
    else {
        console.error('Cart icon not found!');
    }
});
