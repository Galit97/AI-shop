function initContactUs() {
  const container = document.querySelector("#contactUsPopup");
  if (!container) return false;

  container.innerHTML = render();
}

function render() {
  return `
    <div id="contactModal" class="modal">
      <div class="modal-content">
        <span class="close" onclick="closeContactForm()">&times;</span>
        <h2>Contact Us</h2>
        <form id="contactForm" onsubmit="handleFormContactUs(event)">
          <label for="name">Full Name</label><br>
          <input type="text" id="name" name="name" required><br><br>
          <label for="email">Email</label><br>
          <input type="email" id="email" name="email" required><br><br>
          <label for="message">Message</label><br>
          <textarea id="message" name="message" rows="4" required></textarea><br><br>
          <input type="submit" id="sendButton" value="Send">
        </form>
      </div>
    </div>
  `;
}

function ContactUsPopup() {
  initContactUs();
  const modal = document.getElementById("contactModal");
  if (modal) {
    modal.style.display = "block";
  } else {
    console.error("Modal not found!");
  }
}

function closeContactForm() {
  const modal = document.getElementById("contactModal");
  if (modal) {
    modal.style.display = "none";
  }
}

window.onclick = function (event) {
  const modal = document.getElementById("contactModal");
  if (event.target == modal) {
    closeContactForm();
  }
};

async function handleFormContactUs(event) {
  try {
    event.preventDefault();
    const fullName = document.getElementById("name") as HTMLInputElement;
    const email = document.getElementById("email") as HTMLInputElement;
    const message = document.getElementById("message") as HTMLTextAreaElement;
    if (!fullName.value ||!email.value ||!message.value) {
      alert("All fields are required.");
      return;
    }

    closeContactForm();

    const response = await fetch("/api/connectUs/send-email", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        fullName: fullName.value,
        email: email.value,
        message: message.value,
      }),
      
    });

    if (response.ok) {
      alert("The email was sent successfully.");
    } else {
      alert("Error sending email.");
    }
  } catch (error) {
    console.error("Error:", error);
    alert("Error sending email.");
  }
}
