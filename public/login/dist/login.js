function renderLogin() {
    return "\n  \n    <div class=\"loginPopup\" id=\"loginPopup\">\n      <div class=\"loginPopup-content\">\n        <button class=\"closeLogin-btn\" id=\"closeLoginPopupButton\">X</button>\n        <h2 class=\"popup-title\">Sign In</h2>\n        <form id=\"loginForm\">\n          <input type=\"text\" id=\"loginEmail\" name=\"email\" placeholder=\"Email\" required />\n          <input type=\"password\" id=\"loginPassword\" name=\"password\" placeholder=\"Password\" required />\n          <button type=\"submit\" id=\"loginButton\">Sign In</button>\n        </form>\n        <p class=\"divider\"><span>or</span></p>\n        <div class=\"social-login\">\n          <button id=\"googleLogin\" onclick=\"googleLogin()\">\n            <img src=\"../images/google-image.webp\" alt=\"Google Logo\" />\n            Sign in with Google\n          </button>\n          <button id=\"facebookLogin\" onclick=\"facebookLogin()\">\n            <img src=\"../images/facebook-image.webp\" alt=\"Facebook Logo\" />\n            Sign in with Facebook\n          </button>\n        </div>\n        <p class=\"register-link\">\n          Don't have an account? <a href=\"?registerParam=register\">Register</a>\n        </p>\n      </div>\n    </div>\n  ";
}
;
function openLoginPopup() {
    var queryString = window.location.search;
    var params = new URLSearchParams(queryString);
    var loginParam = params.get('loginParam');
    var loginPopup = document.getElementById('loginPopup');
    if (!loginParam) {
        loginPopup.style.display = 'none';
    }
    else {
        loginPopup.style.display = 'block';
    }
    ;
}
function closeLoginPopup() {
    var loginPopup = document.getElementById('loginPopup');
    var closeLoginButton = document.getElementById('closeLoginPopupButton');
    closeLoginButton === null || closeLoginButton === void 0 ? void 0 : closeLoginButton.addEventListener('click', function () {
        loginPopup.style.display = 'none';
        window.location.href = "/";
    });
}
function render() {
    console.log('render');
    var container = document.querySelector('#loginPopup');
    if (container) {
        container.innerHTML += renderLogin();
        openLoginPopup();
        closeLoginPopup();
    }
    else {
        console.error('Target container not found!');
    }
    ;
}
;
render();
