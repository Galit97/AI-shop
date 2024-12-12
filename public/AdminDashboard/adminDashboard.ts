function renderDashboard(): string {
    return `
         <div class="sidebar" id="dashboardContainer">
          <div class="logo-container">
            <img src="../images/Ai-shop-logo.png" alt="AI Shop Logo">
        </div>
        <ul class="sidebar-menu">
            <li class="sidebar-item">
                <a href="?productsParam=products" data-section="products">
                    <i class="icon fa-solid fa-list"></i>
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
                    <i class="icon fa-solid fa-table-cells-large"></i>
                    <span>Categories</span>
                </a>
            </li>
            <li class="sidebar-item">
                <a href="#" data-section="clients">
                   <i class="icon fa-solid fa-user"></i>
                    <span>Clients</span>
                </a>
            </li>
            <li class="sidebar-item">
                <a href="#" data-section="home-page">
                   <i class="icon fa-solid fa-house"></i>
                    <span>Home Page</span>
                </a>
            </li>
             <li class="sidebar-item">
                <a href="#" data-section="settings">
                   <i class="icon fa-solid fa-gear"></i>
                    <span>Settings</span>
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
    }

    const sections = document.querySelectorAll(".page-section");
    sections.forEach((section) => section.classList.add("hidden"));

    const sectionToShow = document.getElementById(sectionId);
    if (sectionToShow) {
        sectionToShow.classList.remove("hidden");
    }


    if (sectionId === "all-products") {
        renderAllProducts();
    } else if (sectionId === "add-product") {
        renderProductPage(); 
    } else if (sectionId === "categories") {
        renderCategoryPage();
    } else if (sectionId === "clients") {
        renderClientPage(); 
    } else if (sectionId === "home-page") {
        window.location.href = "/"; 
    }
}

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

    `;

    renderProductForm();  
    fetchCategories()
}

function renderClientPage(): void {
    const clientsSection = document.getElementById("clients");
    if (!clientsSection) return;

    clientsSection.innerHTML = `
        <div id="client-form-container"></div>
        <div id="client-list"></div>
    `;
    
    renderClientForm();  
    fetchAllClients();
};

function renderAllProducts () {
    const productsSection = document.getElementById("all-products");
    if (!productsSection) throw new Error('No products list found');

    productsSection.innerHTML = `
        <div id="products-table"></div>
    `;
    fetchAllProducts();
    // renderProductsTable();
    
}



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
