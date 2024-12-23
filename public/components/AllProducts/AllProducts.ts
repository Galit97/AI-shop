document.addEventListener("DOMContentLoaded", async () => {
  await fetchAllProducts();
  setupEventListeners();
  await fetchCategories();
});

let allProducts: any[] = [];

async function fetchAllProducts(): Promise<void> {
  try {
    const response = await fetch("/api/products/get-products");
    if (!response.ok) throw new Error("Failed to fetch products");

    const recommendedProductsResponse = await fetch("/api/products/get-recommended-products");
    if (!recommendedProductsResponse.ok) throw new Error("Failed to fetch recommended products");

    
    const products = await response.json(); 
    const recommendedProducts = await recommendedProductsResponse.json();


    const combinedProducts = [
      ...recommendedProducts.map((product: any) => ({ ...product, isRecommended: true })),
      ...products.map((product: any) => ({ ...product, isRecommended: false })), 
    ];

    const allProducts = combinedProducts.filter(
      (product, index, self) =>
        index === self.findIndex((p) => p._id === product._id)
    );

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
            <select id="categorySection" name="category">
              <option value="">Select category</option>
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
                <div class="product-card">
                     <div  id="product-${product._id}">
                        <img src="${product.image}" alt="${product.name}" class="product-image" />
                        <h3 class="product-name">${product.name}</h3>
                        <div class="description-container"><p class="product-description">${product.description}</p></div>
                        <div class="bottom-section">  
                           <i class="icon fa-solid fa-circle-chevron-down"></i>
                           <p class="product-price">$${product.price}</p>
                        </div>
                    </div>
                         <button class="button-more" id="addToCart-${product._id}"><i class="icon fa-solid fa-cart-shopping"></i> Add to cart</button>
                    
                    </div>
                `
              )
              .join("")}
        </div>
    `;

  products.forEach((product) => {
    try {
      const productElement = document.getElementById(`product-${product._id}`);
      if (!productElement) throw new Error(`Product ${product._id} not found`);
      productElement?.addEventListener("click", async () => {
        renderProductView(product)
        const clientId = await getClientId();
        setInteraction(clientId, product._id, "view", 1);
        ratingStars();
    });
    } catch (error) {
      console.error(error);
    }

    try {
      const productElement = document.getElementById(
        `addToCart-${product._id}`
      );
      if (!productElement) throw new Error(`Product ${product._id} not found`);
      productElement?.addEventListener("click", () => {
        addToCart(product._id, 1);
      });
    } catch (error) {
      console.error(error);
    }
  });
}

async function getClientId(): Promise<string> {
    const response = await fetch("http://localhost:3000/api/clients/get-client");

    const data = await response.json();
    console.log((data.clientId).toString())
    return data.clientId
} 

interface Category {
  name: string;
  _id: string;
}

async function fetchCategories(): Promise<void> {
  try {
    const response = await fetch("/api/categories/get-all-categories");
    if (!response.ok) throw new Error("Failed to fetch categories");

    const categories = await response.json();

    const categorySelect = document.getElementById(
      "categorySection"
    ) as HTMLSelectElement;
    if (!categorySelect) throw new Error("no category selected");

    categorySelect.innerHTML = '<option value="">Select category</option>';

    categories.forEach((category: Category) => {
      const option = document.createElement("option");
      option.value = category._id;
      option.textContent = category.name;
      categorySelect.appendChild(option);
    });

    categorySelect.addEventListener("change", (event) => {
      const selectedCategory = (event.target as HTMLSelectElement).value;
      console.log(selectedCategory);
      filterByCategory(selectedCategory);
    });
  } catch (error) {
    console.error("Error fetching categories:", error);
  }
}

function filterByCategory(categoryId: string): void {
  //todo - FIX THE ISSUE OF FILTER THE PRODUCT (DOM ISSUE)
  const filteredProducts =
    categoryId === "all" || categoryId === ""
      ? allProducts
      : allProducts.filter((product) => product.category._id === categoryId);

  renderProducts(filteredProducts);
}

function filterBySearch(productName: string): void {
  try {
    const filteredProducts = allProducts.filter((product) =>
      product.name.toLowerCase().includes(productName.toLowerCase())
    );
    renderProducts(filteredProducts);
  } catch (error) {
    console.error("Error filtering products:", error);
  }
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
  const categoryFilter = document.getElementById(
    "category"
  ) as HTMLSelectElement;
  const sortFilter = document.getElementById(
    "sort-filter"
  ) as HTMLSelectElement;

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
