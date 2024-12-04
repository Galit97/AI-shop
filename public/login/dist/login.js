function renderLogin() {
    return "\n    <div class=\"loginPopup\" id=\"loginPopup\" style=\"display: none;\">\n      <div class=\"loginPopup-content\">\n        <button class=\"closeLogin-btn\" id=\"closeLoginPopupButton\">X</button>\n        <h2 class=\"popup-title\">Sign In</h2>\n        <form id=\"loginForm\">\n          <input type=\"text\" id=\"email\" name=\"email\" placeholder=\"Email\" required />\n          <input type=\"password\" id=\"password\" name=\"password\" placeholder=\"Password\" required />\n          <button type=\"submit\" id=\"loginButton\">Sign In</button>\n        </form>\n        <p class=\"divider\"><span>or</span></p>\n        <div class=\"social-login\">\n          <button id=\"googleLogin\" onclick=\"googleLogin()\">\n            <img src=\"../images/google-image.webp\" alt=\"Google Logo\" />\n            Sign in with Google\n          </button>\n          <button id=\"facebookLogin\" onclick=\"facebookLogin()\">\n            <img src=\"../images/facebook-image.webp\" alt=\"Facebook Logo\" />\n            Sign in with Facebook\n          </button>\n        </div>\n        <p class=\"register-link\">\n          Don't have an account? <a href=\"../register/register.html\">Register</a>\n        </p>\n      </div>\n    </div>\n  ";
}
function initLoginPopup() {
    var loginPopup = document.getElementById('loginPopup');
    var closeLoginButton = document.getElementById('closeLoginPopupButton');
    closeLoginButton === null || closeLoginButton === void 0 ? void 0 : closeLoginButton.addEventListener('click', function () {
        loginPopup.style.display = 'none';
    });
    window.addEventListener('click', function (event) {
        if (event.target === loginPopup) {
            loginPopup.style.display = 'none';
        }
    });
}
function render() {
    var container = document.querySelector('body');
    if (container) {
        container.innerHTML += renderLogin();
        initLoginPopup();
    }
    else {
        console.error('Target container not found!');
    }
}
render();
