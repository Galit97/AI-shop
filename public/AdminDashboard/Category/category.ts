async function handleAddCategory(ev: Event): Promise<void> {
    ev.preventDefault();

    const formData = new FormData(ev.target as HTMLFormElement);
    const name = formData.get("name") as string;

    try {
        const response = await fetch("/api/categories/add-category", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ name }),
        });

        if (response.ok) {
            console.log("Category added successfully");
            (ev.target as HTMLFormElement).reset();
            await fetchAllCategories();
        } else {
            throw new Error("Failed to add category");
        }
    } catch (err) {
        console.error("Error adding category:", err);
    }
}

async function fetchAllCategories(): Promise<void> {
    try {
        const response = await fetch("/api/categories/get-all-categories");
        if (!response.ok) throw new Error("Failed to fetch categories");

        const categories = await response.json();
        renderCategories(categories);
    } catch (error) {
        console.error("Error fetching categories:", error);
    }
}

function renderCategories(categories: any[]): void {
    const container = document.getElementById("category-list");
    if (!container) return;

    container.innerHTML = `
        <table>
            <thead>
                <tr>
                    <th>Category Name</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                ${categories
                    .map(
                        (category) => `
                        <tr id="category-${category._id}">
                            <td>${category.name}</td>
                            <td>
                                <button onclick="handleEditCategory('${category._id}')">Edit</button>
                                <button onclick="handleDeleteCategory('${category._id}')">Delete</button>
                            </td>
                        </tr>
                    `
                    )
                    .join("")}
            </tbody>
        </table>
    `;
}

async function handleDeleteCategory(id: string): Promise<void> {
    try {
        const response = await fetch("/api/categories/delete-category", {
            method: "DELETE",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ id }),
        });

        if (response.ok) {
            document.getElementById(`category-${id}`)?.remove();
        } else {
            throw new Error("Failed to delete category");
        }
    } catch (error) {
        console.error("Error deleting category:", error);
    }
}

async function handleEditCategory(id: string): Promise<void> {
    const name = prompt("Enter new category name:");
    if (!name) return;

    try {
        const response = await fetch("/api/categories/edit-category", {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ id, name }),
        });

        if (response.ok) {
            await fetchAllCategories();
        } else {
            throw new Error("Failed to edit category");
        }
    } catch (error) {
        console.error("Error editing category:", error);
    }
}

function renderCategoryForm(): void {
    const container = document.getElementById("category-form-container");
    if (!container) return;

    container.innerHTML = `
        <form id="category-form">
            <label for="name">Category Name:</label>
            <input type="text" id="name" name="name" placeholder="Enter category name" required />
            <button type="submit">Add Category</button>
        </form>
    `;

    const form = document.getElementById("category-form") as HTMLFormElement;
    if (form) form.addEventListener("submit", handleAddCategory);
}

window.onload = () => {
    renderCategoryForm();
    fetchAllCategories();
};
