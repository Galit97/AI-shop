interface Product {
    _id: string;
    name: string;
    description: string;
    category: Category | null;
    price: number;
    quantity: number;
    inSale: boolean;
    image: string;
}

interface Category {
    _id: string;
    name: string;
}

async function fetchCategories(): Promise<void> {
    try {
        console.log("Fetching categories");
        const response = await fetch("/api/categories/get-all-categories");
        if (!response.ok) throw new Error("Failed to fetch categories");

        const categories = await response.json();
        const categorySelect = document.getElementById('category') as HTMLSelectElement;
        
        if (categorySelect) {
            categorySelect.innerHTML = '<option value="">Select category</option>';
            categories.forEach((category: Category) => {
                const option = document.createElement('option');
                option.value = category._id;
                option.textContent = category.name;
                categorySelect.appendChild(option);
            });
        } else {
            console.error("Category select element not found");
        }
    } catch (error) {
        console.error("Error fetching categories:", error);
    }
}

function renderProductsTable(products: Product[]): void {

    const container = document.getElementById("products-table");
    if (!container) throw new Error("Products table not found");

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
                    ${products.map(product => `
                        <tr id="product-${product._id}">
                            <td>
                                <span class="view">${product.name}</span>
                                <span class="edit hidden"><input type="text" value="${product.name}"></span>
                            </td>
                            <td><span class="view">${product.category?.name || "Uncategorized"}</span></td>
                            <td>
                                <span class="view">${product.description}</span>
                                <span class="edit hidden"><textarea>${product.description}</textarea></span>
                            </td>
                            <td>
                                <span class="view">$ ${product.price}</span>
                                <span class="edit hidden"><input type="number" value="${product.price}"></span>
                            </td>
                            <td>
                                <span class="view">${product.quantity}</span>
                                <span class="edit hidden"><input type="number" value="${product.quantity}"></span>
                            </td>
                            <td>${product.inSale ? "In Sale" : "-"}</td>
                            <td>
                               <button class="edit-btn" onclick="handleEditProduct('${product._id}')">
                               <i class="fa-regular fa-pen-to-square"></i>
                               </button>
                               <button class="save-btn" onclick="saveProductChanges('${product._id}')">
                               <i class="fa-regular fa-floppy-disk"></i>
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

async function handleEditProduct(productId: string): Promise<void> {
    const row = document.getElementById(`product-${productId}`);
    if (!row) {
        console.error(`Row for product with ID ${productId} not found`);
        return;
    }

    const viewElements = row.querySelectorAll(".view");
    const editElements = row.querySelectorAll(".edit");
    const editButton = row.querySelector(".edit-btn") as HTMLButtonElement;
    const saveButton = row.querySelector(".save-btn") as HTMLButtonElement;

    if (!editButton || !saveButton) {
        console.error("Edit or save button not found");
        return;
    }

    viewElements.forEach((el) => el.classList.toggle("hidden"));
    editElements.forEach((el) => el.classList.toggle("hidden"));
    editButton.classList.toggle("hidden");
    saveButton.classList.toggle("hidden");

    const nameField = row.querySelector("td:nth-child(1) .view") as HTMLElement;
    const descriptionField = row.querySelector("td:nth-child(3) .view") as HTMLElement;
    const priceField = row.querySelector("td:nth-child(4) .view") as HTMLElement;
    const quantityField = row.querySelector("td:nth-child(5) .view") as HTMLElement;
    const inSaleField = row.querySelector("td:nth-child(6) .view") as HTMLElement;

    // No need to fetch categories, as the category will no longer be editable

    if (nameField && descriptionField && priceField && quantityField) {
        nameField.innerHTML = `<input type="text" value="${nameField.innerText.trim()}">`;
        descriptionField.innerHTML = `<textarea>${descriptionField.innerText.trim()}</textarea>`;
        priceField.innerHTML = `<input type="number" value="${priceField.innerText.trim()}">`;
        quantityField.innerHTML = `<input type="number" value="${quantityField.innerText.trim()}">`;
        inSaleField.innerHTML = `<input type="checkbox" ${inSaleField.innerText.trim() === 'In Sale' ? 'checked' : ''}>`;
    }
}

async function saveProductChanges(productId: string): Promise<void> {
    const row = document.getElementById(`product-${productId}`);
    if (!row) return;

    const updatedName = (row.querySelector("td:nth-child(1) .edit input") as HTMLInputElement)?.value;
    const updatedDescription = (row.querySelector("td:nth-child(3) .edit textarea") as HTMLTextAreaElement)?.value;
    const updatedPrice = (row.querySelector("td:nth-child(4) .edit input") as HTMLInputElement)?.value;
    const updatedQuantity = (row.querySelector("td:nth-child(5) .edit input") as HTMLInputElement)?.value;
    const updatedInSale = (row.querySelector("td:nth-child(6) .edit input") as HTMLInputElement)?.checked;

    if (!updatedName || !updatedPrice || !updatedQuantity) {
        console.error("Name, price, and quantity are required.");
        return;
    }

    const updatedProduct = {
        id: productId,
        updates: {
            name: updatedName,
            description: updatedDescription,
            price: parseFloat(updatedPrice),
            quantity: parseInt(updatedQuantity, 10),
            inSale: updatedInSale
        }
    };

    try {
        const response = await fetch(`/api/products/edit-product`, {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(updatedProduct),
        });

        if (!response.ok) {
            const errorMessage = await response.text();
            throw new Error(`Failed to update product: ${errorMessage}`);
        }

        console.log("Product updated successfully");
        await fetchAllProducts();
    } catch (error) {
        console.error("Error saving product changes:", error);
    }
}

async function fetchAllProducts(): Promise<void> {
    try {
        const response = await fetch("/api/products/get-products");
        if (!response.ok) throw new Error("Failed to fetch products");

        const products: Product[] = await response.json();
        console.log("Products", products)
        renderProductsTable(products);
    } catch (error) {
        console.error("Error fetching products:", error);
    }
}

fetchAllProducts();
