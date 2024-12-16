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
;
function renderProductView(product) {
    var container = document.getElementById("viewProduct");
    if (!container)
        return;
    console.log("product", product);
    container.innerHTML = "\n        <div class=\"product-view\">\n            <div class=\"main-image\">\n                 <img src=\"" + product.image + "\" alt=\"" + product.name + "\" class=\"product-image\" />\n            </div>\n            <div class=\"product-details\">\n              <h1 class=\"product-title\">" + product.name + "</h1>\n              <p class=\"product-price\">$ " + product.price + "</p>\n              <p class=\"product-description\">" + product.description + "</p>\n              <div class=\"product-options\">\n                <label for=\"size\">Size:</label>\n                <select id=\"size\">\n                  <option value=\"small\">Small</option>\n                  <option value=\"medium\">Medium</option>\n                  <option value=\"large\">Large</option>\n                </select>\n                <input type=\"number\" id=\"quantity\" value=\"1\" min=\"1\">\n              </div>\n\n              <button class=\"add-to-cart\" onclick{}>Add to Cart</button>\n              \n            </div>\n        </div>\n    ";
}
;
function navigateToViewProduct() {
    var queryString = window.location.search;
    var params = new URLSearchParams(queryString);
    var viewProductParam = params.get("viewProductParam");
    var mainSection = document.getElementById("main");
    var productViewSection = document.getElementById("viewProduct");
    if (!mainSection || !productViewSection)
        throw new Error("main section or product section not found");
    if (viewProductParam) {
        mainSection.style.display = "none";
        productViewSection.style.display = "block";
        fetchProduct(viewProductParam);
    }
    ;
}
;
function fetchProduct(productId) {
    return __awaiter(this, void 0, void 0, function () {
        var response, data, err_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    console.log("Fetching Product", productId);
                    console.log("Fetching Product");
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 4, , 5]);
                    return [4 /*yield*/, fetch('http://localhost:3000/api/products/get-product', {
                            method: 'POST',
                            headers: { 'Content-Type': 'application/json' },
                            body: JSON.stringify({ "id": productId })
                        })];
                case 2:
                    response = _a.sent();
                    console.log(response);
                    return [4 /*yield*/, response.json()];
                case 3:
                    data = _a.sent();
                    console.log("data", data);
                    if (response.ok) {
                        console.log('success getting product');
                        renderProductView(data.product);
                    }
                    return [3 /*break*/, 5];
                case 4:
                    err_1 = _a.sent();
                    return [3 /*break*/, 5];
                case 5: return [2 /*return*/];
            }
        });
    });
}
;
function addToCart() {
}
navigateToViewProduct();
