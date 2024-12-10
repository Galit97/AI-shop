function renderDashboard() {
    return "\n       <div class=\"sidebar\" id=\"dashboardContainer\">\n        <ul class=\"sidebar-menu\">\n            <li class=\"sidebar-item active\">\n                <a href=\"#\" data-section=\"products\">\n                    <i class=\"icon\">&#128722;</i> <!-- Shopping cart icon -->\n                    <span>Products</span>\n                </a>\n            </li>\n            <li class=\"sidebar-item\">\n                <a href=\"#\" data-section=\"categories\">\n                    <i class=\"icon\">&#128195;</i> <!-- Folder icon -->\n                    <span>Categories</span>\n                </a>\n            </li>\n            <li class=\"sidebar-item\">\n                <a href=\"#\" data-section=\"clients\">\n                    <i class=\"icon\">&#128100;</i> <!-- User icon -->\n                    <span>Clients</span>\n                </a>\n            </li>\n        </ul>\n       </div>\n    ";
}
function renderCategoryPage() {
    var categoriesSection = document.getElementById("categories");
    if (!categoriesSection)
        return;
    categoriesSection.innerHTML = "\n        <div id=\"category-form-container\"></div>\n        <div id=\"category-list\"></div>\n    ";
    renderCategoryForm();
    fetchAllCategories();
}
function renderProductPage() {
    var productsSection = document.getElementById("products");
    if (!productsSection)
        return;
    productsSection.innerHTML = "\n        <div id=\"product-form-container\"></div>\n        <div id=\"product-list\"></div>\n    ";
    renderProductForm();
    fetchAllProducts();
}
function renderClientPage() {
    var clientsSection = document.getElementById("clients");
    if (!clientsSection)
        return;
    clientsSection.innerHTML = "\n        <div id=\"client-form-container\"></div>\n        <div id=\"client-list\"></div>\n    ";
    renderClientForm();
    fetchAllClients();
}
function handleMenuClick(ev) {
    var _a;
    ev.preventDefault();
    var target = ev.target;
    var sectionId = (_a = target.closest("a")) === null || _a === void 0 ? void 0 : _a.getAttribute("data-section");
    if (!sectionId)
        return;
    var sections = document.querySelectorAll(".page-section");
    sections.forEach(function (section) { return section.classList.add("hidden"); });
    var sectionToShow = document.getElementById(sectionId);
    if (sectionToShow) {
        sectionToShow.classList.remove("hidden");
    }
    if (sectionId === "categories") {
        renderCategoryPage();
    }
    else if (sectionId === "products") {
        renderProductPage();
    }
    else if (sectionId === "clients") {
        renderClientPage();
    }
}
function initializeDashboard() {
    render();
    var menuItems = document.querySelectorAll(".sidebar-menu a");
    menuItems.forEach(function (item) {
        return item.addEventListener("click", handleMenuClick);
    });
    var defaultSection = document.getElementById("products");
    if (defaultSection) {
        defaultSection.classList.remove("hidden");
        renderProductPage();
    }
}
function render() {
    var container = document.getElementById("dashboardContainer");
    if (container) {
        container.innerHTML += renderDashboard();
    }
    else {
        console.error("Root container not found!");
    }
}
initializeDashboard();
