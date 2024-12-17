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
};

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
                            <td>
                                <span class="view">${category.name}</span>
                                <input class="edit hidden" type="text" value="${category.name}" />
                            </td>
                            <td>
                                <button class="edit-btn" onclick="toggleEditCategory('${category._id}')">
                                    <i class="fa-regular fa-pen-to-square"></i>
                                </button>
                                <button class="save-btn hidden" onclick="saveCategoryChanges('${category._id}')">
                                    <i class="fa-regular fa-floppy-disk"></i>
                                </button>
                                <button onclick="handleDeleteCategory('${category._id}')">
                                    <i class="fa-solid fa-trash"></i>
                                </button>
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

function toggleEditCategory(id: string): void {
    const row = document.getElementById(`category-${id}`);
    if (!row) return;

    const viewElements = row.querySelectorAll(".view");
    const editElements = row.querySelectorAll(".edit");
    const editButton = row.querySelector(".edit-btn") as HTMLButtonElement;
    const saveButton = row.querySelector(".save-btn") as HTMLButtonElement;

    viewElements.forEach((el) => el.classList.toggle("hidden"));
    editElements.forEach((el) => el.classList.toggle("hidden"));
    editButton.classList.toggle("hidden");
    saveButton.classList.toggle("hidden");
}

async function saveCategoryChanges(id: string): Promise<void> {
    const row = document.getElementById(`category-${id}`);
    if (!row) return;

    const inputElement = row.querySelector("td input.edit") as HTMLInputElement;
    const updatedName = inputElement?.value.trim(); 

    if (!updatedName) {
        console.error("Error: Name is required.");
        return;
    }

    try {
        const response = await fetch("/api/categories/edit-category", {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                id,
                name: updatedName,
            }),
        });

        if (!response.ok) {
            const errorText = await response.text();
            console.error("Failed to update category:", errorText);
            throw new Error("Failed to update category");
        }

        console.log("Category updated successfully");
        await fetchAllCategories();
    } catch (error) {
        console.error("Error updating category:", error);
    }
}

function renderCategoryForm(): void {
    const container = document.getElementById("category-form-container");
    if (!container) return;

    container.innerHTML = `
        <form id="category-form">
            <label for="name">Add Category:</label>
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
