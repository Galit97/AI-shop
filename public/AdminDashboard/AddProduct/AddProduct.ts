async function handleAddProduct(ev: Event): Promise<void> {
  ev.preventDefault();

  const formData = new FormData(ev.target as HTMLFormElement);
  const productData = {
      name: formData.get("name") as string,
      description: formData.get("description") as string,
      category: formData.get("category") as string,
      price: parseFloat(formData.get("price") as string),
      quantity: parseInt(formData.get("quantity") as string, 10),
      inSale: formData.get("inSale") === "no",
  };

  try {
      const response = await fetch("http://localhost:3000/api/products/add-product", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(productData),
      });

      console.log(response);

      if (response.ok) {
          console.log("Product added successfully");
          (ev.target as HTMLFormElement).reset();
        //   await fetchAllProducts();
      } else {
          throw new Error("Failed to add product");
      }
  } catch (err) {
      console.error("Error adding product:", err);
  }
};



async function fetchAllProducts(): Promise<void> {
  try {
      const response = await fetch("http://localhost:3000/api/products/get-all-products");
      if (!response.ok) throw new Error("Failed to fetch products");

      const products = await response.json();
      renderProducts(products);
  } catch (error) {
      console.error("Error fetching products:", error);
  }
}

function renderProducts(products: any[]): void {
  const container = document.getElementById("product-list");
  if (!container) return;

  container.innerHTML = `
      <table>
          <thead>
              <tr>
                  <th>Product Name</th>
                  <th>Description</th>
                  <th>Category</th>
                  <th>Price</th>
                  <th>Quantity</th>
                  <th>In Stock</th>
                  <th>Actions</th>
              </tr>
          </thead>
          <tbody>
              ${products
                  .map(
                      (product) => `
                      <tr id="product-${product._id}">
                          <td>${product.name}</td>
                          <td>${product.description}</td>
                          <td>${product.category?.name || "Uncategorized"}</td>
                          <td>${product.price}</td>
                          <td>${product.quantity}</td>
                          <td>${product.inStock ? "Yes" : "No"}</td>
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
  `;
}

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
          body: JSON.stringify({ id, name, category, description, price, quantity, inStock }),
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

function renderProductForm(): void {
  const container = document.getElementById("product-form-container");
  if (!container) return;

  container.innerHTML = `
      <form id="product-form">
          <label for="name">Product Name:</label>
          <input type="text" id="name" name="name" placeholder="Enter product name" required />

          <label for="description">Description:</label>
          <textarea id="description" name="description" placeholder="Enter description" required></textarea>

          <label for="category">Category:</label>
          <select id="category" name="category" required>
              <option value="">--Select category--</option>
          </select>

          <label for="price">Price:</label>
          <input type="number" id="price" name="price" placeholder="Enter price" required />

          <label for="quantity">Quantity:</label>
          <input type="number" id="quantity" name="quantity" placeholder="Enter quantity" required />

          <label for="inSale">In Sale:</label>
          <select id="inSale" name="inSale">
              <option value="yes">Yes</option>
              <option value="no">No</option>
          </select>

          <label for="image">Product Image:</label>
          <input type="file" id="image" name="image" accept="image/*" />

          <button type="submit">Add Product</button>
      </form>
  `;

  const form = document.getElementById("product-form") as HTMLFormElement;
  if (form) form.addEventListener("submit", handleAddProduct);
};

interface Category {
    name: string;
};

async function fetchCategories(): Promise<void> {
    try {
        console.log("Fetching categories");
        const response = await fetch("/api/categories/get-all-categories");
        if (!response.ok) throw new Error("Failed to fetch categories");
        
        const categories = await response.json();

        const categorySelect = document.getElementById('category') as HTMLSelectElement;
        categorySelect.innerHTML = '<option value="">--Select category--</option>';

        categories.forEach((category: Category) => {
            const option = document.createElement('option');
            option.value = category.name.toLowerCase();
            option.textContent = category.name;
            categorySelect.appendChild(option);
        });
    } catch (error) {
        console.error("Error fetching categories:", error);
    }
}