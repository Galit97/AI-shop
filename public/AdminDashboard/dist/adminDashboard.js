function renderDashboard() {
    return "\n         <div class=\"sidebar\" id=\"dashboardContainer\">\n          <div class=\"logo-container\">\n            <img src=\"../images/Ai-shop-logo.png\" alt=\"AI Shop Logo\">\n        </div>\n        <ul class=\"sidebar-menu\">\n            <li class=\"sidebar-item\">\n                <a href=\"?productsParam=products\" data-section=\"products\">\n                    <i class=\"icon fa-solid fa-list\"></i>\n                    <span>Products</span>\n                </a>\n                <ul class=\"submenu hidden\" id=\"productsSubmenu\">\n                    <li class=\"submenu-item\">\n                        <a href=\"#\" data-section=\"all-products\">All Products</a>\n                    </li>\n                    <li class=\"submenu-item\">\n                        <a href=\"#\" data-section=\"add-product\">Add Product</a>\n                    </li>\n                </ul>\n            </li>\n            <li class=\"sidebar-item\">\n                <a href=\"#\" data-section=\"categories\">\n                    <i class=\"icon fa-solid fa-table-cells-large\"></i>\n                    <span>Categories</span>\n                </a>\n            </li>\n            <li class=\"sidebar-item\">\n                <a href=\"#\" data-section=\"clients\">\n                   <i class=\"icon fa-solid fa-user\"></i>\n                    <span>Clients</span>\n                </a>\n            </li>\n            <li class=\"sidebar-item\">\n                <a href=\"#\" data-section=\"home-page\">\n                   <i class=\"icon fa-solid fa-house\"></i>\n                    <span>Home Page</span>\n                </a>\n            </li>\n             <li class=\"sidebar-item\">\n                <a href=\"#\" data-section=\"settings\">\n                   <i class=\"icon fa-solid fa-gear\"></i>\n                    <span>Settings</span>\n                </a>\n            </li>\n        </ul>\n       </div>\n    ";
}
;
function handleMenuClick(ev) {
    var _a;
    ev.preventDefault();
    var target = ev.target;
    var sectionId = (_a = target.closest("a")) === null || _a === void 0 ? void 0 : _a.getAttribute("data-section");
    if (!sectionId)
        return;
    if (sectionId === "products") {
        var submenu = document.getElementById("productsSubmenu");
        if (submenu) {
            submenu.classList.toggle("hidden");
        }
        return;
    }
    var sections = document.querySelectorAll(".page-section");
    sections.forEach(function (section) { return section.classList.add("hidden"); });
    var sectionToShow = document.getElementById(sectionId);
    if (sectionToShow) {
        sectionToShow.classList.remove("hidden");
    }
    if (sectionId === "all-products") {
        renderAllProducts();
    }
    else if (sectionId === "add-product") {
        renderProductPage();
    }
    else if (sectionId === "categories") {
        renderCategoryPage();
    }
    else if (sectionId === "clients") {
        renderClientPage();
    }
    else if (sectionId === "home-page") {
        window.location.href = "/";
    }
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
    var productsSection = document.getElementById("add-product");
    if (!productsSection)
        return;
    productsSection.innerHTML = "\n        <div id=\"product-form-container\"></div>\n\n    ";
    renderProductForm();
    fetchCategories();
}
function renderClientPage() {
    var clientsSection = document.getElementById("clients");
    if (!clientsSection)
        return;
    clientsSection.innerHTML = "\n        <div id=\"client-form-container\"></div>\n        <div id=\"client-list\"></div>\n    ";
    renderClientForm();
    fetchAllClients();
}
;
function renderAllProducts() {
    var productsSection = document.getElementById("all-products");
    if (!productsSection)
        throw new Error('No products list found');
    productsSection.innerHTML = "\n        <div id=\"products-table\"></div>\n    ";
    fetchAllProducts();
    // renderProductsTable();
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
