var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
;
function renderProductsTable(products) {
    console.log("renderProductsTable");
    var container = document.getElementById("products-table");
    if (!container)
        throw new Error("products table not found");
    container.innerHTML = "\n       <div class=\"admin-table-container\" id=\"admin-table-container\">\n    <table class=\"admin-table\" id=\"admin-table\">\n        <thead>\n            <tr>\n                <th>Name</th>\n                <th>Category</th>\n                <th>Description</th>\n                <th>Price</th>\n                <th>Stock</th>\n                <th>In Sale</th>\n                <th>Actions</th>\n            </tr>\n        </thead>\n        <tbody id=\"productTableBody\">\n            " + products.map(function (product) {
        var _a;
        return "\n            <tr id=\"product-" + product._id + "\">\n                <td>" + product.name + "</td>\n                <td>" + (((_a = product.category) === null || _a === void 0 ? void 0 : _a.name) || "Uncategorized") + "</td>\n                <td>\n                    <span class=\"description-preview\">" + (product.description.length > 120 ? product.description.slice(0, 120) + '...' : product.description) + "</span>\n                    " + (product.description.length > 100 ? '<a href="#" class="read-more">...</a>' : '') + "\n                    <span class=\"full-description\" style=\"display:none;\">" + product.description + "</span>\n                </td>\n                <td>$ " + product.price + "</td>\n                <td>" + product.quantity + "</td>\n                <td>" + (product.inSale ? "in sale" : "-") + "</td>\n                <td>\n                    <button onclick=\"handleEditProduct('" + product._id + "')\">\n                        <i class=\"fa-regular fa-pen-to-square\"></i>\n                    </button>\n                    <button onclick=\"handleDeleteProduct('" + product._id + "')\">\n                        <i class=\"fa-solid fa-trash\"></i>\n                    </button>\n                </td>\n            </tr>\n            ";
    }).join("") + "\n        </tbody>\n    </table>\n</div>\n\n    ";
}
;
function fetchAllProducts() {
    return __awaiter(this, void 0, Promise, function () {
        var response, products, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    console.log("Fetching all products");
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 4, , 5]);
                    return [4 /*yield*/, fetch("http://localhost:3000/api/products/get-products")];
                case 2:
                    response = _a.sent();
                    if (!response.ok)
                        throw new Error("Failed to fetch products");
                    return [4 /*yield*/, response.json()];
                case 3:
                    products = _a.sent();
                    renderProductsTable(products);
                    return [3 /*break*/, 5];
                case 4:
                    error_1 = _a.sent();
                    console.error("Error fetching products:", error_1);
                    return [3 /*break*/, 5];
                case 5: return [2 /*return*/];
            }
        });
    });
}
;
function handleDeleteProduct(id) {
    var _a;
    return __awaiter(this, void 0, Promise, function () {
        var response, error_2;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _b.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, fetch("/api/products/delete-product", {
                            method: "DELETE",
                            headers: { "Content-Type": "application/json" },
                            body: JSON.stringify({ id: id })
                        })];
                case 1:
                    response = _b.sent();
                    // deletePopup();
                    if (response.ok) {
                        (_a = document.getElementById("product-" + id)) === null || _a === void 0 ? void 0 : _a.remove();
                        console.log("Product deleted successfully");
                    }
                    else {
                        throw new Error("Failed to delete product");
                    }
                    return [3 /*break*/, 3];
                case 2:
                    error_2 = _b.sent();
                    console.error("Error deleting product:", error_2);
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    });
}
;
//   function deletePopup() {
//     const container = document.getElementById("products-table");
//     if (!container) throw new Error("products table not found");
//     container.innerHTML = `
//         <div id="deletePopup" class="popup">
//             <div class="popup-content">
//                  <p>Are you sure you want to delete this item?</p>
//                 <div class="popup-actions">
//                     <button id="confirmDelete" class="popup-btn confirm">Yes</button>
//                     <button id="cancelDelete" class="popup-btn cancel">No</button>
//                 </div>
//             </div>
//         </div>
//     `
//   };
function handleEditProductField(id, fieldName) {
    var _this = this;
    var element = document.getElementById(fieldName + "-" + id);
    if (!element)
        return;
    element.contentEditable = "true";
    element.focus();
    element.addEventListener("blur", function () { return __awaiter(_this, void 0, void 0, function () {
        var value;
        var _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    value = fieldName === "price" || fieldName === "quantity"
                        ? parseFloat(element.innerText)
                        : fieldName === "inStock"
                            ? element.innerText.trim().toLowerCase() === "true"
                            : element.innerText.trim();
                    element.contentEditable = "false";
                    return [4 /*yield*/, updateProduct(id, (_a = {}, _a[fieldName] = value, _a))];
                case 1:
                    _b.sent();
                    return [2 /*return*/];
            }
        });
    }); }, { once: true });
}
function updateProduct(id, updatedFields) {
    return __awaiter(this, void 0, void 0, function () {
        var response, errorMessage, error_3;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 5, , 6]);
                    return [4 /*yield*/, fetch("/api/products/edit-product", {
                            method: "PATCH",
                            headers: { "Content-Type": "application/json" },
                            body: JSON.stringify(__assign({ id: id }, updatedFields))
                        })];
                case 1:
                    response = _a.sent();
                    if (!!response.ok) return [3 /*break*/, 3];
                    return [4 /*yield*/, response.text()];
                case 2:
                    errorMessage = _a.sent();
                    console.error("Failed to update product. Server response:", errorMessage);
                    throw new Error("Failed to update product");
                case 3: return [4 /*yield*/, fetchAllProducts()];
                case 4:
                    _a.sent();
                    return [3 /*break*/, 6];
                case 5:
                    error_3 = _a.sent();
                    console.error("Error updating product:", error_3);
                    return [3 /*break*/, 6];
                case 6: return [2 /*return*/];
            }
        });
    });
}
