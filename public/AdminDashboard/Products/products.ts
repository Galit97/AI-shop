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
       <div class="admin-table-container" id="admin-table-container">
    <table class="admin-table" id="admin-table">
        <thead>
            <tr>
                <th>Name</th>
                <th>Category</th>
                <th>Description</th>
                <th>Price</th>
                <th>Stock</th>
                <th>In Sale</th>
                <th>Actions</th>
            </tr>
        </thead>
        <tbody id="productTableBody">
            ${products.map((product) => `
            <tr id="product-${product._id}">
                <td>${product.name}</td>
                <td>${product.category?.name || "Uncategorized"}</td>
                <td>
                    <span class="description-preview">${product.description.length > 120 ? product.description.slice(0, 120) + '...' : product.description}</span>
                    ${product.description.length > 100 ? '<a href="#" class="read-more">...</a>' : ''}
                    <span class="full-description" style="display:none;">${product.description}</span>
                </td>
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
            `).join("")}
        </tbody>
    </table>
</div>

    `
};


async function fetchAllProducts(): Promise<void> {
    console.log("Fetching all products");
    try {
        const response = await fetch("http://localhost:3000/api/products/get-products");
        if (!response.ok) {throw new Error("Failed to fetch products");}
        
        
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
  };


//   function deletePopup() {
//     const container = document.getElementById("products-table");
//     if (!container) throw new Error("products table not found");

//     container.innerHTML = `
//         <div id="deletePopup" class="popup">
//             <div class="popup-content">
//                  <p>Are you sure you want to delete this item?</p>
//                 <div class="popup-actions">
//                     <button id="confirmDelete" class="popup-btn confirm">Yes</button>
//                     <button id="cancelDelete" class="popup-btn cancel">No</button>
//                 </div>
//             </div>
//         </div>
//     `
//   };
  
function handleEditProductField(id: string, fieldName: string) {
    const element = document.getElementById(`${fieldName}-${id}`);
    if (!element) return;

    element.contentEditable = "true";
    element.focus();

    element.addEventListener(
        "blur",
        async () => {
            const value =
                fieldName === "price" || fieldName === "quantity"
                    ? parseFloat(element.innerText)
                    : fieldName === "inStock"
                    ? element.innerText.trim().toLowerCase() === "true"
                    : element.innerText.trim();
            element.contentEditable = "false";

            await updateProduct(id, { [fieldName]: value });
        },
        { once: true }
    );
}

async function updateProduct(id: string, updatedFields: Partial<any>) {
    try {
        const response = await fetch(`/api/products/edit-product`, {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ id, ...updatedFields }),
        });

        if (!response.ok) {
            const errorMessage = await response.text();
            console.error("Failed to update product. Server response:", errorMessage);
            throw new Error("Failed to update product");
        }

        await fetchAllProducts();
    } catch (error) {
        console.error("Error updating product:", error);
    }
}


