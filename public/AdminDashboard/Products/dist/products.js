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
function fetchCategories() {
    return __awaiter(this, void 0, Promise, function () {
        var response, categories, categorySelect_1, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 3, , 4]);
                    console.log("Fetching categories");
                    return [4 /*yield*/, fetch("/api/categories/get-all-categories")];
                case 1:
                    response = _a.sent();
                    if (!response.ok)
                        throw new Error("Failed to fetch categories");
                    return [4 /*yield*/, response.json()];
                case 2:
                    categories = _a.sent();
                    categorySelect_1 = document.getElementById('category');
                    if (categorySelect_1) {
                        categorySelect_1.innerHTML = '<option value="">Select category</option>';
                        categories.forEach(function (category) {
                            var option = document.createElement('option');
                            option.value = category._id;
                            option.textContent = category.name;
                            categorySelect_1.appendChild(option);
                        });
                    }
                    else {
                        console.error("Category select element not found");
                    }
                    return [3 /*break*/, 4];
                case 3:
                    error_1 = _a.sent();
                    console.error("Error fetching categories:", error_1);
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    });
}
function renderProductsTable(products) {
    var container = document.getElementById("products-table");
    if (!container)
        throw new Error("Products table not found");
    container.innerHTML = "\n        <div class=\"admin-table-container\" id=\"admin-table-container\">\n            <table class=\"admin-table\" id=\"admin-table\">\n                <thead>\n                    <tr>\n                        <th>Name</th>\n                        <th>Category</th>\n                        <th>Description</th>\n                        <th>Price</th>\n                        <th>Stock</th>\n                        <th>In Sale</th>\n                        <th>Actions</th>\n                    </tr>\n                </thead>\n                <tbody id=\"productTableBody\">\n                    " + products.map(function (product) {
        var _a;
        return "\n                        <tr id=\"product-" + product._id + "\">\n                            <td>\n                                <span class=\"view\">" + product.name + "</span>\n                                <span class=\"edit hidden\"><input type=\"text\" value=\"" + product.name + "\"></span>\n                            </td>\n                            <td><span class=\"view\">" + (((_a = product.category) === null || _a === void 0 ? void 0 : _a.name) || "Uncategorized") + "</span></td>\n                            <td>\n                                <span class=\"view\">" + product.description + "</span>\n                                <span class=\"edit hidden\"><textarea>" + product.description + "</textarea></span>\n                            </td>\n                            <td>\n                                <span class=\"view\">$ " + product.price + "</span>\n                                <span class=\"edit hidden\"><input type=\"number\" value=\"" + product.price + "\"></span>\n                            </td>\n                            <td>\n                                <span class=\"view\">" + product.quantity + "</span>\n                                <span class=\"edit hidden\"><input type=\"number\" value=\"" + product.quantity + "\"></span>\n                            </td>\n                            <td>" + (product.inSale ? "In Sale" : "-") + "</td>\n                            <td>\n                               <button class=\"edit-btn\" onclick=\"handleEditProduct('" + product._id + "')\">\n                               <i class=\"fa-regular fa-pen-to-square\"></i>\n                               </button>\n                               <button class=\"save-btn\" onclick=\"saveProductChanges('" + product._id + "')\">\n                               <i class=\"fa-regular fa-floppy-disk\"></i>\n                               </button>\n                                <button onclick=\"handleDeleteProduct('" + product._id + "')\">\n                                    <i class=\"fa-solid fa-trash\"></i>\n                                </button>\n                            </td>\n                        </tr>\n                    ";
    }).join("") + "\n                </tbody>\n            </table>\n        </div>\n    ";
}
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
function handleEditProduct(productId) {
    return __awaiter(this, void 0, Promise, function () {
        var row, viewElements, editElements, editButton, saveButton, nameField, descriptionField, priceField, quantityField, inSaleField;
        return __generator(this, function (_a) {
            row = document.getElementById("product-" + productId);
            if (!row) {
                console.error("Row for product with ID " + productId + " not found");
                return [2 /*return*/];
            }
            viewElements = row.querySelectorAll(".view");
            editElements = row.querySelectorAll(".edit");
            editButton = row.querySelector(".edit-btn");
            saveButton = row.querySelector(".save-btn");
            if (!editButton || !saveButton) {
                console.error("Edit or save button not found");
                return [2 /*return*/];
            }
            viewElements.forEach(function (el) { return el.classList.toggle("hidden"); });
            editElements.forEach(function (el) { return el.classList.toggle("hidden"); });
            editButton.classList.toggle("hidden");
            saveButton.classList.toggle("hidden");
            nameField = row.querySelector("td:nth-child(1) .view");
            descriptionField = row.querySelector("td:nth-child(3) .view");
            priceField = row.querySelector("td:nth-child(4) .view");
            quantityField = row.querySelector("td:nth-child(5) .view");
            inSaleField = row.querySelector("td:nth-child(6) .view");
            // No need to fetch categories, as the category will no longer be editable
            if (nameField && descriptionField && priceField && quantityField) {
                nameField.innerHTML = "<input type=\"text\" value=\"" + nameField.innerText.trim() + "\">";
                descriptionField.innerHTML = "<textarea>" + descriptionField.innerText.trim() + "</textarea>";
                priceField.innerHTML = "<input type=\"number\" value=\"" + priceField.innerText.trim() + "\">";
                quantityField.innerHTML = "<input type=\"number\" value=\"" + quantityField.innerText.trim() + "\">";
                inSaleField.innerHTML = "<input type=\"checkbox\" " + (inSaleField.innerText.trim() === 'In Sale' ? 'checked' : '') + ">";
            }
            return [2 /*return*/];
        });
    });
}
function saveProductChanges(productId) {
    var _a, _b, _c, _d, _e;
    return __awaiter(this, void 0, Promise, function () {
        var row, updatedName, updatedDescription, updatedPrice, updatedQuantity, updatedInSale, updatedProduct, response, errorMessage, error_3;
        return __generator(this, function (_f) {
            switch (_f.label) {
                case 0:
                    row = document.getElementById("product-" + productId);
                    if (!row)
                        return [2 /*return*/];
                    updatedName = (_a = row.querySelector("td:nth-child(1) .edit input")) === null || _a === void 0 ? void 0 : _a.value;
                    updatedDescription = (_b = row.querySelector("td:nth-child(3) .edit textarea")) === null || _b === void 0 ? void 0 : _b.value;
                    updatedPrice = (_c = row.querySelector("td:nth-child(4) .edit input")) === null || _c === void 0 ? void 0 : _c.value;
                    updatedQuantity = (_d = row.querySelector("td:nth-child(5) .edit input")) === null || _d === void 0 ? void 0 : _d.value;
                    updatedInSale = (_e = row.querySelector("td:nth-child(6) .edit input")) === null || _e === void 0 ? void 0 : _e.checked;
                    if (!updatedName || !updatedPrice || !updatedQuantity) {
                        console.error("Name, price, and quantity are required.");
                        return [2 /*return*/];
                    }
                    updatedProduct = {
                        id: productId,
                        updates: {
                            name: updatedName,
                            description: updatedDescription,
                            price: parseFloat(updatedPrice),
                            quantity: parseInt(updatedQuantity, 10),
                            inSale: updatedInSale
                        }
                    };
                    _f.label = 1;
                case 1:
                    _f.trys.push([1, 6, , 7]);
                    return [4 /*yield*/, fetch("/api/products/edit-product", {
                            method: "PATCH",
                            headers: { "Content-Type": "application/json" },
                            body: JSON.stringify(updatedProduct)
                        })];
                case 2:
                    response = _f.sent();
                    if (!!response.ok) return [3 /*break*/, 4];
                    return [4 /*yield*/, response.text()];
                case 3:
                    errorMessage = _f.sent();
                    throw new Error("Failed to update product: " + errorMessage);
                case 4:
                    console.log("Product updated successfully");
                    return [4 /*yield*/, fetchAllProducts()];
                case 5:
                    _f.sent();
                    return [3 /*break*/, 7];
                case 6:
                    error_3 = _f.sent();
                    console.error("Error saving product changes:", error_3);
                    return [3 /*break*/, 7];
                case 7: return [2 /*return*/];
            }
        });
    });
}
function fetchAllProducts() {
    return __awaiter(this, void 0, Promise, function () {
        var response, products, error_4;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 3, , 4]);
                    return [4 /*yield*/, fetch("/api/products/get-products")];
                case 1:
                    response = _a.sent();
                    if (!response.ok)
                        throw new Error("Failed to fetch products");
                    return [4 /*yield*/, response.json()];
                case 2:
                    products = _a.sent();
                    console.log("Products", products);
                    renderProductsTable(products);
                    return [3 /*break*/, 4];
                case 3:
                    error_4 = _a.sent();
                    console.error("Error fetching products:", error_4);
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    });
}
fetchAllProducts();
