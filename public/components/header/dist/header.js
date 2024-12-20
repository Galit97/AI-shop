var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
//TODO: implement number of items in the cart
function renderHeader() {
    return "\n     <header id=\"header\">\n    <div class=\"logo-container\">\n    <a href=\"../index.html\">\n        <img src=\"./images/Ai-shop-logo.png\" alt=\"AI Shop Logo\">\n    </a>\n</div>\n\n        \n       <div class=\"search-container\">\n        <input type=\"text\" placeholder=\"Search for products...\" \n        aria-label=\"Search\" \n        id=\"search-input\">\n       <button aria-label=\"Search\" id=\"search-button\">\n       <img src=\"./images/Search_Icon.svg.png\" alt=\"Search Icon\">\n       </button>\n       </div>\n\n          <div class=\"login-register\">\n            <img src=\"./images/user-image.png\" alt=\"User Icon\">\n            <button id=\"loginRegisterButton\" aria-hasPopup=\"true\" aria-expanded=\"false\">\n            <h3>Welcome <span id=\"loggedInUser\"></span></h3>\n            </button>\n\n          \n            <div id=\"openMenu\" class=\"dropdown-menu\">\n                <a href=\"?loginParam=login\">Login</a>\n                <a href=\"?registerParam=register\">Register</a>\n              <hr>\n              <nav id=\"navbar\">\n                <a href=\"/myOrders\">My orders</a>\n                <a href=\"#\" onclick=\"ContactUsPopup()\">Contact us</a>\n                <a href=\"?AdminLoginParam=AdminLogin\">Admin login</a>\n                <a href=\"#\" onclick=\"resetCookies()\">Log out</a>\n              </nav>\n            </div>\n\n            \n          </div>\n        <div class=\"cart\" id=\"cart\">\n            <img id=\"cart-icon\" src=\"./images/cart-image.png\" alt=\"Cart Icon\">\n            <span class=\"cart-items-count\">3</span>\n        </div>\n    </header>";
}
function render() {
    var container = document.querySelector("#header");
    if (container) {
        container.innerHTML = renderHeader();
        showWelcomeName();
    }
    else {
        console.error("Target container not found!");
    }
}
var openMenu = document.getElementById("openMenu");
var loginRegisterButton = document.querySelector("#loginRegisterButton");
function closeMenu() {
    try {
        if (openMenu) {
            openMenu.style.display = "none";
        }
    }
    catch (error) {
        console.error("An error occurred:", error.message);
    }
}
function initHeader() {
    var container = document.querySelector("#header");
    if (container) {
        container.innerHTML = renderHeader();
        var loginRegisterButton_1 = document.querySelector("#loginRegisterButton");
        var loginButton = document.getElementById("login");
        var registerButton = document.getElementById("register");
        if (loginRegisterButton_1 && openMenu) {
            loginRegisterButton_1.addEventListener("mouseover", function () {
                alert("Login Register");
                openMenu.style.display = "block";
            });
            loginRegisterButton_1.addEventListener("mouseleave", function () {
                openMenu.style.display = "none";
            });
        }
        if (loginButton) {
            loginButton.addEventListener("click", window.initLoginPopup);
        }
        if (registerButton) {
            registerButton.addEventListener("click", window.RegisterPopup);
        }
    }
    else {
        console.error("Target container not found!");
    }
}
window.initLoginPopup = function () {
    var loginPopup = document.getElementById("loginPopup");
    if (loginPopup) {
        loginPopup.style.display = "flex";
    }
};
window.registerPopup = function () {
    var registerPopup = document.getElementById("registerPopup");
    if (registerPopup) {
        registerPopup.style.display = "flex";
    }
};
var cartIcon = document.getElementById("cart");
if (cartIcon) {
    cartIcon.addEventListener("click", function () {
        fetchCartProducts();
    });
}
else {
    console.error("Cart icon not found!");
}
// //// make the search work - TO DO ////
// const searchButton = document.getElementById('search-button');
// const searchInput = document.getElementById('search-input');
// if (searchButton && searchInput) {
//   searchButton.addEventListener('click', function() {
//     const query = searchInput.value.toLowerCase();
//     const productCards = document.querySelectorAll('.product-card');
//     productCards.forEach(card => {
//       const productName = card.querySelector('.product-name')?.textContent?.toLowerCase() || '';
//       const productDescription = card.querySelector('.product-description')?.textContent?.toLowerCase() || '';
//       if (productName.includes(query) || productDescription.includes(query)) {
//         card.style.display = 'block';
//       } else {
//         card.style.display = 'none';
//       }
//     });
//   });
//   searchInput.addEventListener('keyup', function(e) {
//     if (e.key === 'Enter') {
//       searchButton.click();
//     }
//   });
// } else {
//   console.error('Search button or input field not found in the DOM');
// }
function showWelcomeName() {
    return __awaiter(this, void 0, void 0, function () {
        var welcomeName, response, responseData, firstName, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 3, , 4]);
                    welcomeName = document.getElementById("loggedInUser");
                    if (!welcomeName)
                        throw new Error("Cannot find element to display the user name.");
                    return [4 /*yield*/, fetch("http://localhost:3000/api/clients/get-client", {
                            credentials: "include"
                        })];
                case 1:
                    response = _a.sent();
                    if (!response.ok) {
                        console.error("Failed to fetch user info:", response.statusText);
                        welcomeName.textContent = "Guest";
                        return [2 /*return*/];
                    }
                    return [4 /*yield*/, response.json()];
                case 2:
                    responseData = _a.sent();
                    firstName = responseData.client.firstName;
                    if (firstName) {
                        welcomeName.textContent = firstName;
                    }
                    else {
                        welcomeName.textContent = "Guest";
                    }
                    return [3 /*break*/, 4];
                case 3:
                    error_1 = _a.sent();
                    console.error("Error fetching client name:", error_1);
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    });
}
initHeader();
render();
