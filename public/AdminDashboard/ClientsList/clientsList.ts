interface Client {
    _id: string;
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber: string;
    address: string | null;
};

async function handleAddClient(ev: Event): Promise<void> {
    ev.preventDefault();

    const formData = new FormData(ev.target as HTMLFormElement);
    const newClient = {
        firstName: formData.get("firstName") as string,
        lastName: formData.get("lastName") as string,
        email: formData.get("email") as string,
        phoneNumber: formData.get("phoneNumber") as string,
        address: formData.get("address") as string,
    };

    try {
        const response = await fetch("/api/clients/add-client", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(newClient),
        });

        if (response.ok) {
            console.log("Client added successfully");
            (ev.target as HTMLFormElement).reset();
            await fetchAllClients();
        } else {
            throw new Error("Failed to add client");
        }
    } catch (error) {
        console.error("Error adding client:", error);
    }
}

async function fetchAllClients(): Promise<void> {
    try {
        const response = await fetch("/api/clients/get-all-clients");
        if (!response.ok) throw new Error("Failed to fetch clients");

        const clients = await response.json();
        renderClients(clients);
    } catch (error) {
        console.error("Error fetching clients:", error);
    }
}

function renderClients(clients: Client[]): void {
    const container = document.getElementById("client-list");
    if (!container) return;

    container.innerHTML = `
    <h1>Active Clients</h1>
        <table>
            <thead>
                <tr>
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th>Email</th>
                    <th>Phone Number</th>
                    <th>Address</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                ${clients
                    .map(
                        (client) => `
                        <tr id="client-${client._id}">
                            <td><span class="view">${client.firstName}</span><input class="edit hidden" type="text" value="${client.firstName}" /></td>
                            <td><span class="view">${client.lastName}</span><input class="edit hidden" type="text" value="${client.lastName}" /></td>
                            <td><span class="view">${client.email}</span><input class="edit hidden" type="email" value="${client.email}" /></td>
                            <td><span class="view">${client.phoneNumber}</span><input class="edit hidden" type="text" value="${client.phoneNumber}" /></td>
                            <td><span class="view">${client.address}</span><input class="edit hidden" type="text" value="${client.address}" /></td>
                            <td>
                                <button class="edit-btn" onclick="toggleEditClient('${client._id}')">
                                    <i class="fa-regular fa-pen-to-square"></i>
                                </button>
                                <button class="save-btn hidden" onclick="saveClientChanges('${client._id}')">
                                    <i class="fa-regular fa-floppy-disk"></i>
                                </button>
                                <button onclick="handleDeleteClient('${client._id}')">
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

function toggleEditClient(id: string): void {
    const row = document.getElementById(`client-${id}`);
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

async function saveClientChanges(id: string): Promise<void> {
    const row = document.getElementById(`client-${id}`);
    if (!row) return;

    const updatedFirstName = (row.querySelector("td:nth-child(1) .edit") as HTMLInputElement)?.value;
    const updatedLastName = (row.querySelector("td:nth-child(2) .edit") as HTMLInputElement)?.value;
    const updatedEmail = (row.querySelector("td:nth-child(3) .edit") as HTMLInputElement)?.value;
    const updatedPhoneNumber = (row.querySelector("td:nth-child(4) .edit") as HTMLInputElement)?.value;
    const updatedAddress = (row.querySelector("td:nth-child(5) .edit") as HTMLInputElement)?.value;

    try {
        const response = await fetch("/api/clients/update-client", {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                id,
                updates: {
                    firstName: updatedFirstName,
                    lastName: updatedLastName,
                    email: updatedEmail,
                    phoneNumber: updatedPhoneNumber,
                    address: updatedAddress,
                },
            }),
        });

        if (response.ok) {
            console.log("Client updated successfully");
            await fetchAllClients();
        } else {
            throw new Error("Failed to update client");
        }
    } catch (error) {
        console.error("Error updating client:", error);
    }
}

async function handleDeleteClient(id: string): Promise<void> {
    try {
        const response = await fetch("/api/clients/delete-client", {
            method: "DELETE",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ id }),
        });

        if (response.ok) {
            document.getElementById(`client-${id}`)?.remove();
        } else {
            throw new Error("Failed to delete client");
        }
    } catch (error) {
        console.error("Error deleting client:", error);
    }
}

function renderClientForm(): void {
    const container = document.getElementById("client-form-container");
    if (!container) return;

    container.innerHTML = `
<div id="client-form-container">
  <form id="client-form">
    <h1>Add Clients</h1>
    
    <div class="form-row">
      <div>
        <label for="firstName">First Name:</label>
        <input type="text" id="firstName" name="firstName" required />
      </div>
      <div>
        <label for="lastName">Last Name:</label>
        <input type="text" id="lastName" name="lastName" required />
      </div>
    </div>

    <div class="form-row">
      <div>
        <label for="email">Email:</label>
        <input type="email" id="email" name="email" required />
      </div>
      <div>
        <label for="phoneNumber">Phone Number:</label>
        <input type="text" id="phoneNumber" name="phoneNumber" required />
      </div>
    </div>

    <div class="form-row full-width">
      <label for="address">Address:</label>
      <input type="text" id="address" name="address" required />
    </div>

    <button type="submit">Add</button>
  </form>
</div>
    `;

    const form = document.getElementById("client-form") as HTMLFormElement;
    if (form) form.addEventListener("submit", handleAddClient);
}

window.onload = () => {
    renderClientForm();
    fetchAllClients();
};
