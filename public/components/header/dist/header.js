// }
function renderHeader() {
    return "\n     <header id=\"header\">\n        <div class=\"logo-container\">\n            <img src=\"./images/Ai-shop-logo.png\" alt=\"AI Shop Logo\">\n        </div>\n        \n        <div class=\"search-container\">\n            <input \n              type=\"text\" \n              placeholder=\"Search for products...\" \n              aria-label=\"Search\">\n            <button aria-label=\"Search\">\n              <img src=\"./images/Search_Icon.svg.png\" alt=\"Search Icon\">\n            </button>\n          </div>\n\n          <div class=\"login-register\">\n            <img src=\"./images/user-image.png\" alt=\"User Icon\">\n            <button id=\"loginRegisterButton\" aria-hasPopup=\"true\" aria-expanded=\"false\">\n            <h3>Welcome </h3>\n            </button>\n\n          \n            <div id=\"openMenu\" class=\"dropdown-menu\">\n                <a href=\"?loginParam=login\">Login</a>\n                <a href=\"?registerParam=register\">Register</a>\n              <hr>\n              <nav id=\"navbar\">\n                <a href=\"/myOrders\">My orders</a>\n                <a href=\"/connectUs\">Contact us</a>\n                <a href=\"/logOut\">Log out</a>\n              </nav>\n            </div>\n\n            \n          </div>\n        <div class=\"cart\">\n            <img src=\"./images/cart-image.png\" alt=\"Cart Icon\">\n            <h3>Cart</h3>\n            <span class=\"cart-items-count\">3</span>\n        </div>\n    </header>";
}
function render() {
    var container = document.querySelector('#header');
    if (container) {
        container.innerHTML = renderHeader();
    }
    else {
        console.error('Target container not found!');
    }
    ;
}
;
var openMenu = document.getElementById('openMenu');
var loginRegisterButton = document.querySelector('#loginRegisterButton');
function closeMenu() {
    try {
        if (openMenu) {
            openMenu.style.display = 'none';
        }
    }
    catch (error) {
        console.error('An error occurred:', error.message);
    }
}
function initHeader() {
    var container = document.querySelector('#header');
    if (container) {
        container.innerHTML = renderHeader();
        var loginRegisterButton_1 = document.querySelector('#loginRegisterButton');
        var loginButton = document.getElementById('login');
        var registerButton = document.getElementById('register');
        if (loginRegisterButton_1 && openMenu) {
            loginRegisterButton_1.addEventListener('mouseover', function () {
                alert('Login Register');
                openMenu.style.display = 'block';
            });
            loginRegisterButton_1.addEventListener('mouseleave', function () {
                openMenu.style.display = 'none';
            });
        }
        if (loginButton) {
            loginButton.addEventListener('click', window.initLoginPopup);
        }
        if (registerButton) {
            registerButton.addEventListener('click', window.RegisterPopup);
        }
    }
    else {
        console.error('Target container not found!');
    }
}
window.initLoginPopup = function () {
    var loginPopup = document.getElementById('loginPopup');
    if (loginPopup) {
        loginPopup.style.display = 'flex';
    }
};
window.registerPopup = function () {
    var registerPopup = document.getElementById('registerPopup');
    if (registerPopup) {
        registerPopup.style.display = 'flex';
    }
};
initHeader();
render();
