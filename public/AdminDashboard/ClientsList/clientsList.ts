interface Client {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber: string;
    address: string;
}

interface Client {
    _id: string;
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber: string;
    adress: string | null;
}

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
                            <td>${client.firstName}</td>
                            <td>${client.lastName}</td>
                            <td>${client.email}</td>
                            <td>${client.phoneNumber}</td>
                            
                            <td>
                                <button onclick="setClients('update', '${client._id}')">Edit</button>
                                <button onclick="setClients('delete', '${client._id}')">Delete</button>
                            </td>
                        </tr>
                    `
                    )
                    .join("")}
            </tbody>
        </table>
    `;
    // <td>${client.address}</td> todo: add up
}

async function setClients(action: "update" | "delete", id: string): Promise<void> {
    if (action === "delete") {
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
    } else if (action === "update") {
        const updatedFirstName = prompt("Enter new first name:");
        const updatedLastName = prompt("Enter new last name:");
        const updatedEmail = prompt("Enter new email:");
        const updatedPhoneNumber = prompt("Enter new phone number:");
        const updatedAddress = prompt("Enter new address:");

        if (!updatedFirstName || !updatedLastName || !updatedEmail || !updatedPhoneNumber || !updatedAddress) return;

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
                await fetchAllClients();
            } else {
                throw new Error("Failed to update client");
            }
        } catch (error) {
            console.error("Error updating client:", error);
        }
    }
}

function renderClientForm(): void {
    const container = document.getElementById("client-form-container");
    if (!container) return;

    container.innerHTML = `
        <form id="client-form">
            <label for="firstName">First Name:</label>
            <input type="text" id="firstName" name="firstName" required />
            
            <label for="lastName">Last Name:</label>
            <input type="text" id="lastName" name="lastName" required />
            
            <label for="email">Email:</label>
            <input type="email" id="email" name="email" required />
            
            <label for="phoneNumber">Phone Number:</label>
            <input type="text" id="phoneNumber" name="phoneNumber" required />
            
            <label for="address">Address:</label>
            <input type="text" id="address" name="address" required />
            
            <button type="submit">Add Client</button>
        </form>
    `;

    const form = document.getElementById("client-form") as HTMLFormElement;
    if (form) form.addEventListener("submit", handleAddClient);
}

window.onload = () => {
    renderClientForm();
    fetchAllClients();
};