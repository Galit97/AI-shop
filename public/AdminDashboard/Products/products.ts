interface Product {
    _id: string;
    name: string;
    description: string;
    category: Category | null;
    price: number;
    quantity: number;
    inSale: boolean;
    image: string;
};

interface Category {
    name: string;
}

function renderProductsTable(products: Product[]): void {
    console.log("renderProductsTable");
    const container = document.getElementById("products-table");
    if (!container) throw new Error("products table not found");

  container.innerHTML = `
       <div class="admin-table-container">
            <table class="admin-table">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Description</th>
                        <th>Category</th>
                        <th>Price</th>
                        <th>Quantity</th>
                        <th>In Sale</th>
                    </tr>
                </thead>
                <tbody id="productTableBody">
                      ${products.map((product) => `
                      <tr id="product-${product._id}">
                          <td>${product.name}</td>
                          <td>${product.description}</td>
                          <td>${product.category?.name || "Uncategorized"}</td>
                          <td>${product.price}</td>
                          <td>${product.quantity}</td>
                          <td>
                              <button onclick="handleEditProduct('${product._id}')">Edit</button>
                              <button onclick="handleDeleteProduct('${product._id}')">Delete</button>
                          </td>
                      </tr>
                  `
                  )
                  .join("")}
                </tbody>
    </table>
</div>
    `
};


async function fetchAllProducts(): Promise<void> {
    console.log("Fetching all products");
    try {
        const response = await fetch("http://localhost:3000/api/products/get-all-products");
        if (!response.ok) throw new Error("Failed to fetch products");
  
        const products = await response.json();
        renderProductsTable(products);
    } catch (error) {
        console.error("Error fetching products:", error);
    }
  };
