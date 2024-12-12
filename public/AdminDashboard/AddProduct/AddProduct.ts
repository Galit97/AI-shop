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
      image: formData.get("image") as File,
  };

  console.log("djjd", formData);
  try {
      const response = await fetch("http://localhost:3000/api/products/add-product", {
          method: "POST",
        //   headers: { "Content-Type": "application/json" },
          body: formData,
      });

      console.log(response);

      if (response.ok) {
          console.log("Product added successfully");
          (ev.target as HTMLFormElement).reset();
      } else {
          throw new Error("Failed to add product");
      }
  } catch (err) {
      console.error("Error adding product:", err);
  }
};


// function renderProducts(products: any[]): void {
//   const container = document.getElementById("product-list");
//   if (!container) return;

//   container.innerHTML = `
//       <table>
//           <thead>
//               <tr>
//                   <th>Product Name</th>
//                   <th>Description</th>
//                   <th>Category</th>
//                   <th>Price</th>
//                   <th>Quantity</th>
//                   <th>In Stock</th>
//                   <th>Actions</th>
//               </tr>
//           </thead>
//           <tbody>
//               ${products
//                   .map(
//                       (product) => `
//                       <tr id="product-${product._id}">
//                           <td>${product.name}</td>
//                           <td>${product.description}</td>
//                           <td>${product.category?.name || "Uncategorized"}</td>
//                           <td>${product.price}</td>
//                           <td>${product.quantity}</td>
//                           <td>${product.inStock ? "Yes" : "No"}</td>
//                           <td>
//                               <button onclick="handleEditProduct('${product._id}')">Edit</button>
//                               <button onclick="handleDeleteProduct('${product._id}')">Delete</button>
//                           </td>
//                       </tr>
//                   `
//                   )
//                   .join("")}
//           </tbody>
//       </table>
//   `;
// }



function renderProductForm(): void {
  const container = document.getElementById("product-form-container");
  if (!container) return;

  container.innerHTML = `
     <div id="product-form-container">
  <form id="product-form">
    <h1>Add Product</h1>
    <label for="name">Product Name:</label>
    <input type="text" id="name" name="name" placeholder="Enter product name" required />

    <label for="description">Description:</label>
    <textarea id="description" name="description" placeholder="Enter description" required></textarea>

    <label for="category">Category:</label>
    <select id="category" name="category" required>
        <option value="">-Select category-</option>
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
</div>

  `;

  const form = document.getElementById("product-form") as HTMLFormElement;
  if (form) form.addEventListener("submit", handleAddProduct);
};

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

