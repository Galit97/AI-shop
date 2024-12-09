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
function renderAddProduct() {
    return "\n      <div class=\"AddProduct\" id=\"AddProduct\">\n          <h2 class=\"AddProduct-title\">Add Product</h2>\n          <form id=\"AddProductForm\">\n            <input type=\"text\" id=\"name\" name=\"name\" placeholder=\"Name\" required />\n            <input type=\"text\" id=\"description\" name=\"description\" placeholder=\"Description\" required />\n            <label for=\"category\">Select a Category:</label>\n            <select name=\"category\" id=\"category\" required>\n                <option value=\"\">-- Select category --</option>\n            </select>\n           <input type=\"number\" id=\"price\" name=\"price\" placeholder=\"Price\" required />\n           <input type=\"number\" id=\"quantity\" name=\"quantity\" placeholder=\"quantity\" required />\n           <label for=\"inStock\">In Stock:</label>\n           <select id=\"inStock\" name=\"in Stock\">\n                <option value=\"yes\">Yes</option>\n                <option value=\"no\">No</option>\n          </select>\n       </select>\n        <button type=\"submit\" id=\"AddProductButton\">Add Product</button>\n              </form>\n        </div>\n      </div>\n    ";
}
;
function handleFormAddProduct() {
    var form = document.getElementById('AddProductForm');
    if (form) {
        form.addEventListener('submit', function (event) {
            event.preventDefault();
            var formData = new FormData(form);
            var productData = {
                name: formData.get('name'),
                description: formData.get('description'),
                category: formData.get('category'),
                price: parseFloat(formData.get('price')),
                quantity: parseInt(formData.get('quantity'), 10),
                inStock: formData.get('inStock') === 'yes',
                inSale: formData.get('onSale') === 'yes',
                comments: formData.get('comments'),
                rating: parseInt(formData.get('rating'), 10)
            };
            console.log('Product Data:', productData);
            addProduct(productData);
        });
    }
    else {
        console.error('Add Product form not found');
    }
}
function addProduct(productData) {
    return __awaiter(this, void 0, void 0, function () {
        var response, result, error, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 6, , 7]);
                    return [4 /*yield*/, fetch('http://localhost:3000/api/products/add-product', {
                            method: 'POST',
                            headers: { 'Content-Type': 'application/json' },
                            body: JSON.stringify(productData)
                        })];
                case 1:
                    response = _a.sent();
                    if (!response.ok) return [3 /*break*/, 3];
                    return [4 /*yield*/, response.json()];
                case 2:
                    result = _a.sent();
                    console.log('Product added successfully:', result);
                    alert('Product added successfully!');
                    return [3 /*break*/, 5];
                case 3: return [4 /*yield*/, response.json()];
                case 4:
                    error = _a.sent();
                    alert("Error: " + error.message);
                    _a.label = 5;
                case 5: return [3 /*break*/, 7];
                case 6:
                    error_1 = _a.sent();
                    console.error('Error adding product:', error_1);
                    return [3 /*break*/, 7];
                case 7: return [2 /*return*/];
            }
        });
    });
}
function render() {
    var container = document.getElementById('AddProduct');
    if (container) {
        container.innerHTML += renderAddProduct();
        handleFormAddProduct();
    }
    else {
        console.error('Root container not found!');
    }
}
render();
