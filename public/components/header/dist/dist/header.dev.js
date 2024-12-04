"use strict";

var loginRegisterButton = document.querySelector('.login-register');
var openMenu = document.getElementById('openMenu');

if (loginRegisterButton && openMenu) {
  loginRegisterButton.addEventListener('mouseover', function () {
    openMenu.style.display = 'block';
  });
}

function renderHeader() {
  return "\n     <header id=\"header\">\n        <div class=\"logo-container\">\n            <img src=\"./images/Ai-shop-logo.png\" alt=\"AI Shop Logo\">\n        </div>\n        \n        <div class=\"search-container\">\n            <input \n              type=\"text\" \n              placeholder=\"Search for products...\" \n              aria-label=\"Search\">\n            <button aria-label=\"Search\">\n              <img src=\"./images/Search_Icon.svg.png\" alt=\"Search Icon\">\n            </button>\n          </div>\n\n          <div class=\"login-register\">\n            <img src=\"./images/user-image.png\" alt=\"User Icon\">\n            <button id=\"loginRegisterButton\" aria-haspopup=\"true\" aria-expanded=\"false\">\n              Welcome <br> Login / Register\n            </button>\n\n          \n            <div id=\"openMenu\" class=\"dropdown-menu\">\n              <a id=\"login\" onclick=\"login()\">Login</a>\n              <a id=\"register\" onclick=\"register()\">Register</a>\n              <hr>\n              <nav id=\"navbar\">\n                <a href=\"/myOrders\">My orders</a>\n                <a href=\"/connectUs\">Contact us</a>\n                <a href=\"/logOut\">Log out</a>\n              </nav>\n            </div>\n\n            \n          </div>\n        <div class=\"cart\">\n            <img src=\"./images/cart-image.png\" alt=\"Cart Icon\">\n            <h3>Cart</h3>\n            <span class=\"cart-items-count\">3</span>\n        </div>\n    </header>";
}

function render() {
  var container = document.querySelector('#header'); // Adjust the selector to your target element

  if (container) {
    container.innerHTML = renderHeader();
  } else {
    console.error('Target container not found!');
  }

  ;
}

;

function closeMenu() {
  try {
    if (openMenu) {
      openMenu.style.display = 'none';
    }
  } catch (error) {
    console.error('An error occurred:', error.message);
  }
} // loginRegisterButton.addEventListener('mouseleave', closeMenu);
// openMenu.addEventListener('mouseleave', closeMenu);
// openMenu.addEventListener('mouseover', () => {
//   openMenu.style.display = 'block';
// });


render();