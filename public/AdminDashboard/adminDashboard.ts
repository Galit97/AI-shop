function renderDashboard(): string {
    return `
       <div class="sidebar" id="dashboardContainer">
        <ul class="sidebar-menu">
            <li class="sidebar-item">
                <a href="#" data-section="products">
                    <i class="icon">&#128722;</i> <!-- Shopping cart icon -->
                    <span>Products</span>
                </a>
                <ul class="submenu hidden" id="productsSubmenu">
                    <li class="submenu-item">
                        <a href="#" data-section="all-products">All Products</a>
                    </li>
                    <li class="submenu-item">
                        <a href="#" data-section="add-product">Add Product</a>
                    </li>
                </ul>
            </li>
            <li class="sidebar-item">
                <a href="#" data-section="categories">
                    <i class="icon">&#128195;</i> <!-- Folder icon -->
                    <span>Categories</span>
                </a>
            </li>
            <li class="sidebar-item">
                <a href="#" data-section="clients">
                    <i class="icon">&#128100;</i> <!-- User icon -->
                    <span>Clients</span>
                </a>
            </li>
        </ul>
       </div>
    `;
};


function handleMenuClick(ev: Event): void {
    ev.preventDefault();

    const target = ev.target as HTMLElement;
    const sectionId = target.closest("a")?.getAttribute("data-section");
    if (!sectionId) return;

    if (sectionId === "products") {

        const submenu = document.getElementById("productsSubmenu");
        if (submenu) {
            submenu.classList.toggle("hidden");
        }
        return;
    };

    const sections = document.querySelectorAll(".page-section");
    sections.forEach((section) => section.classList.add("hidden"));

    const sectionToShow = document.getElementById(sectionId);
    if (sectionToShow) {
        sectionToShow.classList.remove("hidden");
    }

    if (sectionId === "add-product") {
        renderProductPage();
    } else if (sectionId === "products") {
        
    } else if (sectionId === "categories") {
        renderCategoryPage();
    }
};



function renderCategoryPage(): void {
    const categoriesSection = document.getElementById("categories");
    if (!categoriesSection) return;

    categoriesSection.innerHTML = `
        <div id="category-form-container"></div>
        <div id="category-list"></div>
    `;

    renderCategoryForm();
    fetchAllCategories();
}

function renderProductPage(): void {
    const productsSection = document.getElementById("add-product");
    if (!productsSection) return;

    productsSection.innerHTML = `
        <div id="product-form-container"></div>
        <div id="product-list"></div>
    `;

    renderProductForm();
    fetchCategories();  
    fetchAllProducts();  
};


function initializeDashboard(): void {
    render();

    const menuItems = document.querySelectorAll(".sidebar-menu a");
    menuItems.forEach((item) =>
        item.addEventListener("click", handleMenuClick)
    );

    const defaultSection = document.getElementById("products");
    if (defaultSection) {
        defaultSection.classList.remove("hidden");
        renderProductPage();
    }
}

function render() {
    const container = document.getElementById("dashboardContainer");
    if (container) {
        container.innerHTML += renderDashboard();
    } else {
        console.error("Root container not found!");
    }
}

initializeDashboard();
