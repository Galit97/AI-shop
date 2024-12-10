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
function handleAddCategory(ev) {
    return __awaiter(this, void 0, Promise, function () {
        var formData, name, response, err_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    ev.preventDefault();
                    formData = new FormData(ev.target);
                    name = formData.get("name");
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 6, , 7]);
                    return [4 /*yield*/, fetch("/api/categories/add-category", {
                            method: "POST",
                            headers: { "Content-Type": "application/json" },
                            body: JSON.stringify({ name: name })
                        })];
                case 2:
                    response = _a.sent();
                    if (!response.ok) return [3 /*break*/, 4];
                    console.log("Category added successfully");
                    ev.target.reset();
                    return [4 /*yield*/, fetchAllCategories()];
                case 3:
                    _a.sent();
                    return [3 /*break*/, 5];
                case 4: throw new Error("Failed to add category");
                case 5: return [3 /*break*/, 7];
                case 6:
                    err_1 = _a.sent();
                    console.error("Error adding category:", err_1);
                    return [3 /*break*/, 7];
                case 7: return [2 /*return*/];
            }
        });
    });
}
function fetchAllCategories() {
    return __awaiter(this, void 0, Promise, function () {
        var response, categories, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 3, , 4]);
                    return [4 /*yield*/, fetch("/api/categories/get-all-categories")];
                case 1:
                    response = _a.sent();
                    if (!response.ok)
                        throw new Error("Failed to fetch categories");
                    return [4 /*yield*/, response.json()];
                case 2:
                    categories = _a.sent();
                    renderCategories(categories);
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
function renderCategories(categories) {
    var container = document.getElementById("category-list");
    if (!container)
        return;
    container.innerHTML = "\n        <table>\n            <thead>\n                <tr>\n                    <th>Category Name</th>\n                    <th>Actions</th>\n                </tr>\n            </thead>\n            <tbody>\n                " + categories
        .map(function (category) { return "\n                        <tr id=\"category-" + category._id + "\">\n                            <td>" + category.name + "</td>\n                            <td>\n                                <button onclick=\"handleEditCategory('" + category._id + "')\">Edit</button>\n                                <button onclick=\"handleDeleteCategory('" + category._id + "')\">Delete</button>\n                            </td>\n                        </tr>\n                    "; })
        .join("") + "\n            </tbody>\n        </table>\n    ";
}
function handleDeleteCategory(id) {
    var _a;
    return __awaiter(this, void 0, Promise, function () {
        var response, error_2;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _b.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, fetch("/api/categories/delete-category", {
                            method: "DELETE",
                            headers: { "Content-Type": "application/json" },
                            body: JSON.stringify({ id: id })
                        })];
                case 1:
                    response = _b.sent();
                    if (response.ok) {
                        (_a = document.getElementById("category-" + id)) === null || _a === void 0 ? void 0 : _a.remove();
                    }
                    else {
                        throw new Error("Failed to delete category");
                    }
                    return [3 /*break*/, 3];
                case 2:
                    error_2 = _b.sent();
                    console.error("Error deleting category:", error_2);
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    });
}
function handleEditCategory(id) {
    return __awaiter(this, void 0, Promise, function () {
        var name, response, error_3;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    name = prompt("Enter new category name:");
                    if (!name)
                        return [2 /*return*/];
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 6, , 7]);
                    return [4 /*yield*/, fetch("/api/categories/edit-category", {
                            method: "PATCH",
                            headers: { "Content-Type": "application/json" },
                            body: JSON.stringify({ id: id, name: name })
                        })];
                case 2:
                    response = _a.sent();
                    if (!response.ok) return [3 /*break*/, 4];
                    return [4 /*yield*/, fetchAllCategories()];
                case 3:
                    _a.sent();
                    return [3 /*break*/, 5];
                case 4: throw new Error("Failed to edit category");
                case 5: return [3 /*break*/, 7];
                case 6:
                    error_3 = _a.sent();
                    console.error("Error editing category:", error_3);
                    return [3 /*break*/, 7];
                case 7: return [2 /*return*/];
            }
        });
    });
}
function renderCategoryForm() {
    var container = document.getElementById("category-form-container");
    if (!container)
        return;
    container.innerHTML = "\n        <form id=\"category-form\">\n            <label for=\"name\">Category Name:</label>\n            <input type=\"text\" id=\"name\" name=\"name\" placeholder=\"Enter category name\" required />\n            <button type=\"submit\">Add Category</button>\n        </form>\n    ";
    var form = document.getElementById("category-form");
    if (form)
        form.addEventListener("submit", handleAddCategory);
}
window.onload = function () {
    renderCategoryForm();
    fetchAllCategories();
};
