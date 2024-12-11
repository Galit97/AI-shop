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
    _id: string;
    name: string;
};

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
                        <th>Category</th>
                        <th>Description</th>
                        <th>Price</th>
                        <th>Stock</th>
                        <th>In Sale</th>
                    </tr>
                </thead>
                <tbody id="productTableBody">
                      ${products.map((product) => `
                      <tr id="product-${product._id}">
                          <td>${product.name}</td>
                          <td>${product.category?.name || "Uncategorized"}</td>
                          <td>${product.description}</td>
                          <td>$ ${product.price}</td>
                          <td>${product.quantity}</td>
                          <td>${product.inSale ? "in sale" : "-"}</td>
                          <td>
                            <button onclick="handleEditProduct('${product._id}')">
                                <i class="fa-regular fa-pen-to-square"></i>
                            </button>
                            <button onclick="handleDeleteProduct('${product._id}')">
                                <i class="fa-solid fa-trash"></i>
                            </button>
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
        const response = await fetch("http://localhost:3000/api/products/get-products");
        if (!response.ok) throw new Error("Failed to fetch products");
        
        const products = await response.json();
        renderProductsTable(products);
    } catch (error) {
        console.error("Error fetching products:", error);
    }
  };


  async function handleDeleteProduct(id: string): Promise<void> {
    try {
        const response = await fetch("/api/products/delete-product", {
            method: "DELETE",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ id }),
        });
  
        if (response.ok) {
            document.getElementById(`product-${id}`)?.remove();
            console.log("Product deleted successfully");
        } else {
            throw new Error("Failed to delete product");
        }
    } catch (error) {
        console.error("Error deleting product:", error);
    }
  }
  
  async function handleEditProduct(id: string): Promise<void> {
    const name = prompt("Enter new product name:");
    if (!name) return;
  
    const description = prompt("Enter new product description:");
    if (!description) return;
  
    const price = parseFloat(prompt("Enter new product price:") || "0");
    const quantity = parseInt(prompt("Enter new product quantity:") || "0", 10);
    const inStock = confirm("Is the product in stock?");
  
    try {
        const response = await fetch("/api/products/edit-product", {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ id, name, category, Image, description, price, quantity, inStock }),
        });
  
        if (response.ok) {
            console.log("Product edited successfully"); 
            await fetchAllProducts();
        } else {
            throw new Error("Failed to edit product");
        }
    } catch (error) {
        console.error("Error editing product:", error);
    }
  }
