function renderRegister() {
    return "\n    <div class=\"registerPopup\" id=\"registerPopup\">\n      <div class=\"registerPopup-content\">\n        <button class=\"closeRegister-btn\" id=\"closeRegisterPopupButton\">X</button>\n        <h2 class=\"popup-title\">Sign Up</h2>\n        <form id=\"registerForm\">\n          <input type=\"text\" id=\"firstName\" name=\"firstName\" placeholder=\"First Name\" required />\n          <input type=\"text\" id=\"lastName\" name=\"lastName\" placeholder=\"Last Name\" required />\n          <input type=\"email\" id=\"email\" name=\"email\" placeholder=\"Email Address\" required />\n          <input type=\"password\" id=\"password\" name=\"password\" placeholder=\"Password\" required />\n          <input type=\"password\" id=\"repeatPassword\" name=\"repeatPassword\" placeholder=\"Repeat Password\" required />\n          <input type=\"text\" id=\"phoneNumber\" name=\"phoneNumber\" placeholder=\"Phone Number\" required />\n          <input type=\"text\" id=\"address\" name=\"address\" placeholder=\"Address\" required />\n          <button type=\"submit\" id=\"registerButton\">Sign Up</button>\n        </form>\n        <p class=\"divider\"><span>or</span></p>\n        <div class=\"social-login\">\n          <button id=\"googleRegister\" onclick=\"googleRegister()\">\n            <img src=\"../images/google-image.webp\" alt=\"Google Logo\" />\n            Sign up with Google\n          </button>\n          <button id=\"facebookRegister\" onclick=\"facebookRegister()\">\n            <img src=\"../images/facebook-image.webp\" alt=\"Facebook Logo\" />\n            Sign up with Facebook\n          </button>\n        </div>\n        <p class=\"login-link\">\n          Already have an account? <a href=\"../login/login.html\">Log in</a>\n        </p>\n      </div>\n    </div>\n  ";
}
function initRegisterPopup() {
    try {
        var registerPopup_1 = document.getElementById('registerPopup');
        if (!registerPopup_1) {
            var container = document.createElement('div');
            container.innerHTML = renderRegister();
            document.body.appendChild(container.firstElementChild);
            registerPopup_1 = document.getElementById('registerPopup');
        }
        var openRegisterPage = document.getElementById('register');
        var closeRegisterButton = document.getElementById('closeRegisterPopupButton');
        if (!openRegisterPage || !closeRegisterButton) {
            throw new Error('Register open or close button not found.');
        }
        openRegisterPage.addEventListener('click', function () {
            registerPopup_1.style.display = 'flex';
        });
        closeRegisterButton.addEventListener('click', function () {
            registerPopup_1.style.display = 'none';
        });
        window.addEventListener('click', function (event) {
            if (event.target === registerPopup_1) {
                registerPopup_1.style.display = 'none';
            }
        });
    }
    catch (err) {
        console.error('Error in initializeRegisterPopup function:', err);
    }
}
// render();
