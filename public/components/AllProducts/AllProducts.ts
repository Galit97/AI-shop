document.addEventListener("DOMContentLoaded", async () => {
    await fetchCategories();
    await fetchAllProducts();
    setupEventListeners();
});

let allProducts: any[] = [];

async function fetchAllProducts(): Promise<void> {
    try {
        const response = await fetch("/api/products/get-products");
        if (!response.ok) throw new Error("Failed to fetch products");

        allProducts = await response.json();
        renderPage();
        renderProducts(allProducts);
    } catch (error) {
        console.error("Error fetching products:", error);
    }
}

function renderPage(): void {
    const appContainer = document.getElementById("main");
    if (!appContainer) return;

    appContainer.innerHTML = `
        <div id="filter-sort-controls">
            <select id="category" name="category">
              <option value="">-Select category-</option>
            </select>
            <select id="sort-filter">
                <option value="default">Sort By</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="name-asc">Name: A to Z</option>
                <option value="name-desc">Name: Z to A</option>
            </select>
        </div>

        <div id="product-list"></div>
    `;
}

function renderProducts(products: any[]): void {
    const container = document.getElementById("product-list");
    if (!container) return;

    container.innerHTML = `
        <div class="product-grid">
            ${products
                .map(
                    (product) => `
                    <div class="product-card" id="product-${product._id}">
                        <img src="${product.image}" alt="${product.name}" class="product-image" />
                        <h3 class="product-name">${product.name}</h3>
                        <p class="product-price">$${product.price}</p>
                        <p class="product-description">${product.description}</p>
                    </div>
                `
                )
                .join("")}
        </div>
    `;
}

interface Category {
    name: string;
    _id: string;
};

async function fetchCategories(): Promise<void> {
    try {
        console.log("Fetching categories");
        const response = await fetch("/api/categories/get-all-categories");
        if (!response.ok) throw new Error("Failed to fetch categories");
        
        const categories = await response.json();

        const categorySelect = document.getElementById('category') as HTMLSelectElement;
        categorySelect.innerHTML = '<option value="">-Select category-</option>';

        categories.forEach((category: Category) => {
            const option = document.createElement('option');
            option.value = category._id;
            option.textContent = category.name;
            categorySelect.appendChild(option);
        });
    } catch (error) {
        console.error("Error fetching categories:", error);
    }
}

function filterByCategory(category: string): void {
    const filteredProducts =
        category === "all"
            ? allProducts
            : allProducts.filter((product) => product.category === category);

    renderProducts(filteredProducts);
}

function sortProducts(criteria: string): void {
    const sortedProducts = [...allProducts];

    switch (criteria) {
        case "price-asc":
            sortedProducts.sort((a, b) => a.price - b.price);
            break;
        case "price-desc":
            sortedProducts.sort((a, b) => b.price - a.price);
            break;
        case "name-asc":
            sortedProducts.sort((a, b) => a.name.localeCompare(b.name));
            break;
        case "name-desc":
            sortedProducts.sort((a, b) => b.name.localeCompare(a.name));
            break;
        default:
            return;
    }

    renderProducts(sortedProducts);
}

function setupEventListeners(): void {
    const categoryFilter = document.getElementById("category") as HTMLSelectElement; 
    const sortFilter = document.getElementById("sort-filter") as HTMLSelectElement;

    if (categoryFilter) {
        categoryFilter.addEventListener("change", (event) => {
            const category = (event.target as HTMLSelectElement).value;
            filterByCategory(category);
        });
    }

    if (sortFilter) {
        sortFilter.addEventListener("change", (event) => {
            const criteria = (event.target as HTMLSelectElement).value;
            sortProducts(criteria);
        });
    }
}
