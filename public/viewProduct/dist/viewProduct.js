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
function renderProductView(product) {
    return __awaiter(this, void 0, void 0, function () {
        var container, productElement;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    container = document.getElementById("main");
                    if (!container)
                        return [2 /*return*/];
                    container.innerHTML = "\n    <div class=\"product-view\">\n      <div class=\"main-image\">\n        <img src=\"" + product.image + "\" alt=\"" + product.name + "\" class=\"product-image\" />\n      </div>\n      <div class=\"product-details\">\n        <h1 class=\"product-title\">" + product.name + "</h1>\n        <p class=\"product-price\">$ " + product.price + "</p>\n        <p class=\"product-description\">" + product.description + "</p>\n        \n        <div class=\"stars\" id='" + product._id + "'>\n          <span class=\"star\" data-value=\"1\">&#9733;</span>\n          <span class=\"star\" data-value=\"2\">&#9733;</span>\n          <span class=\"star\" data-value=\"3\">&#9733;</span>\n          <span class=\"star\" data-value=\"4\">&#9733;</span>\n          <span class=\"star\" data-value=\"5\">&#9733;</span>\n        </div>\n        \n        <div class=\"product-options\">\n          <label for=\"size\">Size:</label>\n          <select id=\"size\">\n            <option value=\"small\">Small</option>\n            <option value=\"medium\">Medium</option>\n            <option value=\"large\">Large</option>\n          </select>\n          <input type=\"number\" id=\"quantity\" value=\"1\" min=\"1\">\n        </div>\n\n        <button class=\"add-to-cart\" id=\"addToCart-" + product._id + "\">Add to Cart</button>\n\n        <!-- Recommended Products Section -->\n        <div id=\"recommended-products\" class=\"recommended-products\">\n          <h3>You may also like</h3>\n          <div class=\"product-grid\" id=\"recommended-products-list\"></div>\n        </div>\n      </div>\n    </div>\n  ";
                    // Add event listener for add-to-cart button
                    try {
                        productElement = document.getElementById("addToCart-" + product._id);
                        if (!productElement)
                            throw new Error("Product " + product._id + " not found");
                        productElement === null || productElement === void 0 ? void 0 : productElement.addEventListener("click", function () {
                            var quantityInput = document.getElementById("quantity");
                            var quantity = parseInt(quantityInput.value, 10);
                            addToCart(product._id, quantity);
                        });
                    }
                    catch (error) {
                        console.error(error);
                    }
                    // Fetch and display recommended products
                    return [4 /*yield*/, renderRecommendedProducts(product._id)];
                case 1:
                    // Fetch and display recommended products
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    });
}
// Function to render recommended products based on the current product category or similar
function renderRecommendedProducts(currentProductId) {
    return __awaiter(this, void 0, void 0, function () {
        var response, recommendedProducts, filteredRecommended, recommendedProductsList, error_1;
        var _this = this;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 3, , 4]);
                    return [4 /*yield*/, fetch("/api/products/get-recommended-products")];
                case 1:
                    response = _a.sent();
                    if (!response.ok)
                        throw new Error("Failed to fetch recommended products");
                    return [4 /*yield*/, response.json()];
                case 2:
                    recommendedProducts = _a.sent();
                    filteredRecommended = recommendedProducts.filter(function (product) { return product._id !== currentProductId; });
                    recommendedProductsList = document.getElementById("recommended-products-list");
                    if (!recommendedProductsList)
                        return [2 /*return*/];
                    recommendedProductsList.innerHTML = filteredRecommended
                        .map(function (product) { return "\n        <div class=\"product-card\">\n          <div id=\"product-" + product._id + "\">\n            <img src=\"" + product.image + "\" alt=\"" + product.name + "\" class=\"product-image\" />\n            <h3 class=\"product-name\">" + product.name + "</h3>\n            <p class=\"product-price\">$" + product.price + "</p>\n          </div>\n          <button class=\"button-more\" id=\"addToCart-" + product._id + "\">\n            <i class=\"icon fa-solid fa-cart-shopping\"></i> Add to cart\n          </button>\n        </div>\n      "; })
                        .join("");
                    // Add event listeners for each recommended product
                    filteredRecommended.forEach(function (product) {
                        var productElement = document.getElementById("product-" + product._id);
                        if (productElement) {
                            productElement.addEventListener("click", function () { return __awaiter(_this, void 0, void 0, function () {
                                var clientId;
                                return __generator(this, function (_a) {
                                    switch (_a.label) {
                                        case 0:
                                            renderProductView(product);
                                            return [4 /*yield*/, getClientId()];
                                        case 1:
                                            clientId = _a.sent();
                                            setInteraction(clientId, product._id, "view", 1);
                                            ratingStars();
                                            return [2 /*return*/];
                                    }
                                });
                            }); });
                        }
                        var addToCartButton = document.getElementById("addToCart-" + product._id);
                        if (addToCartButton) {
                            addToCartButton.addEventListener("click", function () {
                                addToCart(product._id, 1);
                            });
                        }
                    });
                    return [3 /*break*/, 4];
                case 3:
                    error_1 = _a.sent();
                    console.error("Error fetching recommended products:", error_1);
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    });
}
// Function to add a product to the cart
function addToCart(productId, quantity) {
    return __awaiter(this, void 0, void 0, function () {
        var response, data;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, fetch("http://localhost:3000/api/cart/add-to-cart", {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({ productId: productId, quantity: quantity })
                    })];
                case 1:
                    response = _a.sent();
                    if (!response.ok) return [3 /*break*/, 3];
                    return [4 /*yield*/, response.json()];
                case 2:
                    data = _a.sent();
                    showCartItemsCount();
                    setInteraction(data.clientId, productId, "addToCart", 3);
                    _a.label = 3;
                case 3: return [2 /*return*/];
            }
        });
    });
}
// Function to get client ID (for interaction tracking)
function getClientId() {
    return __awaiter(this, void 0, Promise, function () {
        var response, data;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, fetch("http://localhost:3000/api/clients/get-client")];
                case 1:
                    response = _a.sent();
                    return [4 /*yield*/, response.json()];
                case 2:
                    data = _a.sent();
                    return [2 /*return*/, data.clientId];
            }
        });
    });
}
// Function to handle product ratings
function ratingStars() {
    var _this = this;
    var stars = document.querySelectorAll('.star');
    stars.forEach(function (star) {
        star.addEventListener('click', function (event) { return __awaiter(_this, void 0, void 0, function () {
            var clickedStar, productId, rating, allStars, clientId;
            var _a, _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        clickedStar = event.target;
                        productId = (_a = clickedStar.closest('.stars')) === null || _a === void 0 ? void 0 : _a.id;
                        rating = clickedStar.getAttribute('data-value');
                        if (!(productId && rating)) return [3 /*break*/, 2];
                        allStars = (_b = clickedStar.closest('.stars')) === null || _b === void 0 ? void 0 : _b.querySelectorAll('.star');
                        allStars === null || allStars === void 0 ? void 0 : allStars.forEach(function (star) {
                            if (parseInt(star.getAttribute('data-value') || '0') <= parseInt(rating)) {
                                star.classList.add('selected');
                            }
                            else {
                                star.classList.remove('selected');
                            }
                        });
                        return [4 /*yield*/, getClientId()];
                    case 1:
                        clientId = _c.sent();
                        setRating(clientId, productId, parseInt(rating));
                        _c.label = 2;
                    case 2: return [2 /*return*/];
                }
            });
        }); });
    });
}
// Function to set interaction data (views, ratings, etc.)
function setInteraction(clientId, productId, type, score) {
    return __awaiter(this, void 0, void 0, function () {
        var response, e_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, fetch('http://localhost:3000/api/interaction/set-interaction', {
                            method: 'POST',
                            headers: { 'Content-Type': 'application/json' },
                            body: JSON.stringify({ clientId: clientId, productId: productId, type: type, score: score })
                        })];
                case 1:
                    response = _a.sent();
                    return [3 /*break*/, 3];
                case 2:
                    e_1 = _a.sent();
                    console.error(e_1);
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    });
}
// Function to submit the product rating
function setRating(clientId, productId, rating) {
    return __awaiter(this, void 0, void 0, function () {
        var response, e_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, fetch('http://localhost:3000/api/rating/add-rating', {
                            method: 'POST',
                            headers: { 'Content-Type': 'application/json' },
                            body: JSON.stringify({ clientId: clientId, productId: productId, rating: rating })
                        })];
                case 1:
                    response = _a.sent();
                    setInteraction(clientId, productId, "rating", rating);
                    return [3 /*break*/, 3];
                case 2:
                    e_2 = _a.sent();
                    console.error(e_2);
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    });
}
