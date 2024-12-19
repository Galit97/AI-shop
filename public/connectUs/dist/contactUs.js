function initContactUs() {
    var container = document.querySelector("#contactUsPopup");
    if (!container)
        return false;
    container.innerHTML = render();
}
function render() {
    return "\n    <div id=\"contactModal\" class=\"modal\">\n      <div class=\"modal-content\">\n        <span class=\"close\" onclick=\"closeContactForm()\">&times;</span>\n        <h2>Contact Us</h2>\n        <form id=\"contactForm\" onsubmit=\"handleFormContactUs(event)\">\n          <label for=\"name\">Full Name</label><br>\n          <input type=\"text\" id=\"name\" name=\"name\" required><br><br>\n          <label for=\"email\">Email</label><br>\n          <input type=\"email\" id=\"email\" name=\"email\" required><br><br>\n          <label for=\"message\">Message</label><br>\n          <textarea id=\"message\" name=\"message\" rows=\"4\" required></textarea><br><br>\n          <input type=\"submit\" id=\"sendButton\" value=\"Send\">\n        </form>\n      </div>\n    </div>\n  ";
}
function ContactUsPopup() {
    initContactUs();
    var modal = document.getElementById("contactModal");
    if (modal) {
        modal.style.display = "block";
    }
    else {
        console.error("Modal not found!");
    }
}
function closeContactForm() {
    var modal = document.getElementById("contactModal");
    if (modal) {
        modal.style.display = "none";
    }
}
window.onclick = function (event) {
    var modal = document.getElementById("contactModal");
    if (event.target == modal) {
        closeContactForm();
    }
};
function handleFormContactUs(event) {
    try {
        event.preventDefault();
        alert("Message not sent anywhere yet.");
        alert("In the future, I'll attempt to send this message to a real email.");
    }
    catch (error) {
        console.error(error);
        alert("Error in submit function.");
    }
}
