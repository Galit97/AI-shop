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
          <label for="name">*Full Name</label><br>
          <input type="text" id="name" name="name" required><br><br>
          <label for="email">*Email</label><br>
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

function handleFormContactUs(event) {
  try {
    event.preventDefault();
    alert("Message not sent anywhere yet.");
    alert("In the future, I'll attempt to send this message to a real email.");
  } catch (error) {
    console.error(error);
    alert("Error in submit function.");
  }
}
