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
function renderRegister() {
    return "\n    <div class=\"registerPopup\" id=\"registerPopup\">\n      <div class=\"registerPopup-content\">\n        <button class=\"closeRegister-btn\" id=\"closeRegisterPopupButton\">X</button>\n        <h2 class=\"popup-title\">Sign Up</h2>\n        <form id=\"registerForm\">\n          <input type=\"text\" id=\"firstName\" name=\"firstName\" placeholder=\"First Name\" required />\n          <input type=\"text\" id=\"lastName\" name=\"lastName\" placeholder=\"Last Name\" required />\n          <input type=\"email\" id=\"registerEmail\" name=\"registerEmail\" placeholder=\"Email Address\" required />\n          <input type=\"text\" id=\"phoneNumber\" name=\"phoneNumber\" placeholder=\"Phone Number\" required />\n          <input type=\"password\" id=\"registerPassword\" name=\"registerPassword\" placeholder=\"Password\" required />\n          <input type=\"password\" id=\"repeatPassword\" name=\"repeatPassword\" placeholder=\"Repeat Password\" required />\n          <button type=\"submit\" id=\"registerButton\">Sign Up</button>\n        </form>\n        <p class=\"divider\"><span>or</span></p>\n        <div class=\"social-login\">\n          <button id=\"googleRegister\" onclick=\"googleRegister()\">\n            <img src=\"../images/google-image.webp\" alt=\"Google Logo\" />\n            Sign up with Google\n          </button>\n          <button id=\"facebookRegister\" onclick=\"facebookRegister()\">\n            <img src=\"../images/facebook-image.webp\" alt=\"Facebook Logo\" />\n            Sign up with Facebook\n          </button>\n        </div>\n        <p class=\"login-link\">\n          Already have an account? <a href=\"?loginParam=login\">Log in</a>\n        </p>\n      </div>\n    </div>\n  ";
}
;
function openRegisterPopup() {
    var queryString = window.location.search;
    var params = new URLSearchParams(queryString);
    var registerParam = params.get('registerParam');
    var registerPopup = document.getElementById('registerPopup');
    handleFormRegister();
    if (!registerParam) {
        registerPopup.style.display = 'none';
    }
    else {
        registerPopup.style.display = 'block';
    }
    ;
}
;
function closeRegisterPopup() {
    var registerPopup = document.getElementById('registerPopup');
    var closeRegisterButton = document.getElementById('closeRegisterPopupButton');
    closeRegisterButton === null || closeRegisterButton === void 0 ? void 0 : closeRegisterButton.addEventListener('click', function () {
        registerPopup.style.display = 'none';
        window.location.href = "/";
    });
}
;
function render() {
    console.log('render');
    var container = document.querySelector('#registerPopup');
    if (container) {
        container.innerHTML += renderRegister();
        openRegisterPopup();
        closeRegisterPopup();
    }
    else {
        console.error('Target container not found!');
    }
    ;
}
;
render();
function handleFormRegister() {
    console.log('handleFormRegister');
    // Select the form element
    var form = document.getElementById('registerForm');
    if (form) {
        form.addEventListener('submit', function (event) {
            event.preventDefault();
            var formData = new FormData(form);
            var firstName = formData.get('firstName');
            var lastName = formData.get('lastName');
            var phoneNumber = formData.get('phoneNumber');
            var email = formData.get('registerEmail');
            var password = formData.get('registerPassword');
            var repeatPassword = formData.get('repeatPassword');
            console.log(firstName + " " + lastName + " " + phoneNumber + " " + email + " " + password);
            if (password !== repeatPassword) {
                alert('Passwords do not match! Please try again'); //todo:change
            }
            else {
                addClient(firstName, lastName, email, password, phoneNumber);
            }
        });
    }
    else {
        console.error('Login form not found in the DOM');
    }
    ;
}
;
function addClient(firstName, lastName, email, password, phoneNumber) {
    return __awaiter(this, void 0, void 0, function () {
        var response, data, registerPopup, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 3, , 4]);
                    return [4 /*yield*/, fetch('http://localhost:3000/api/clients/add-client', {
                            method: 'POST',
                            headers: { 'Content-Type': 'application/json' },
                            body: JSON.stringify({ firstName: firstName, lastName: lastName, email: email, password: password, phoneNumber: phoneNumber })
                        })];
                case 1:
                    response = _a.sent();
                    return [4 /*yield*/, response.json()];
                case 2:
                    data = _a.sent();
                    registerPopup = document.getElementById('registerPopup');
                    if (response.ok) {
                        console.log('success');
                        registerPopup.style.display = 'none';
                        window.location.href = "/";
                    }
                    else {
                        alert(data.message);
                    }
                    return [3 /*break*/, 4];
                case 3:
                    error_1 = _a.sent();
                    console.error('Error sending post:', error_1);
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    });
}
