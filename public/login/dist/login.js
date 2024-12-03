function renderLogin() {
    return "\n         <div class=\"loginPopup\" id=\"loginPopup\">\n    <div class=\"loginPopup-content\">\n      <button class=\"closeLogin-btn\" id=\"closeLoginPopupButton\">X</button>\n      <h2 class=\"popup-title\">Sign In</h2>\n      <form id=\"loginForm\">\n        <input type=\"text\" id=\"email\" name=\"email\" placeholder=\"Email\" required />\n        <input type=\"password\" id=\"password\" name=\"password\" placeholder=\"Password\" required />\n        <button type=\"submit\" id=\"loginButton\">Sign In</button>\n      </form>\n      <p class=\"divider\"><span>or</span></p>\n      <div class=\"social-login\">\n        <button id=\"googleLogin\" onclick=\"googleLogin()\">\n          <img src=\"../images/google-image.webp\" alt=\"Google Logo\" />\n          Sign in with Google\n        </button>\n        <button id=\"facebookLogin\" onclick=\"facebookLogin()\">\n          <img src=\"../images/facebook-image.webp\" alt=\"Facebook Logo\" />\n          Sign in with Facebook\n        </button>\n      </div>\n      <p class=\"register-link\">\n        Don't have an account? <a href=\"../register/register.html\">Register</a>\n      </p>\n    </div>\n  </div>\n    ";
}
;
function render() {
    var container = document.querySelector('#loginPopup');
    if (container) {
        container.innerHTML = renderLogin();
    }
    else {
        console.error('Target container not found!');
    }
    ;
}
;
render();
function login() {
    try {
        var loginPage_1 = document.getElementById('popupLogin');
        var openLoginPage = document.getElementById('login');
        var closeLoginButton = document.getElementById('closePopupLoginButton');
        if (!loginPage_1 || !openLoginPage || !closeLoginButton) {
            throw new Error('Required elements not found: Ensure popupLogin, login button, and close button exist in the DOM.');
        }
        openLoginPage.onclick = function () {
            loginPage_1.style.display = 'flex';
        };
        closeLoginButton.onclick = function () {
            loginPage_1.style.display = 'none';
        };
        window.onclick = function (event) {
            if (event.target === loginPage_1) {
                loginPage_1.style.display = 'none';
            }
        };
    }
    catch (err) {
        console.error('Error in login function:', err);
    }
}
