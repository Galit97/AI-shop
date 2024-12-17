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
function renderAdminLogin() {
    return "\n    \n      <div class=\"AdminLoginPopup\" id=\"AdminLoginPopup\">\n        <div class=\"AdminLoginPopup-content\">\n          <button class=\"closeAdminLogin-btn\" id=\"closeAdminLoginPopupButton\">X</button>\n          <h2 class=\"popup-title\">Admin Sign In</h2>\n          <form id=\"AdminLoginForm\">\n            <input type=\"text\" id=\"AdminLoginEmail\" name=\"AdminLoginEmail\" placeholder=\"Email\" required />\n            <input type=\"password\" id=\"AdminLoginPassword\" name=\"AdminLoginPassword\" placeholder=\"Password\" required />\n            <button type=\"submit\" id=\"AdminLoginButton\">Sign In</button>\n          </form>\n          <p class=\"divider\"><span>or</span></p>\n          <div class=\"social-login\">\n            <button id=\"googleLogin\" onclick=\"googleLogin()\">\n              <img src=\"../images/google-image.webp\" alt=\"Google Logo\" />\n              Sign in with Google\n            </button>\n            <button id=\"facebookLogin\" onclick=\"facebookLogin()\">\n              <img src=\"../images/facebook-image.webp\" alt=\"Facebook Logo\" />\n              Sign in with Facebook\n            </button>\n          </div>\n        </div>\n      </div>\n    ";
}
;
function openAdminLoginPopup() {
    var queryString = window.location.search;
    var params = new URLSearchParams(queryString);
    var AdminLoginParam = params.get('AdminLoginParam');
    var AdminLoginPopup = document.getElementById('AdminLoginPopup');
    handleFormAdminLogin();
    if (!AdminLoginParam) {
        AdminLoginPopup.style.display = 'none';
    }
    else {
        AdminLoginPopup.style.display = 'block';
    }
    ;
}
function closeAdminLoginPopup() {
    var AdminLoginPopup = document.getElementById('AdminLoginPopup');
    var closeAdminLoginButton = document.getElementById('closeAdminLoginPopupButton');
    closeAdminLoginButton === null || closeAdminLoginButton === void 0 ? void 0 : closeAdminLoginButton.addEventListener('click', function () {
        AdminLoginPopup.style.display = 'none';
        window.location.href = "/";
    });
}
function renderAdmin() {
    var container = document.querySelector('#AdminLoginPopup');
    if (container) {
        container.innerHTML += renderAdminLogin();
        openAdminLoginPopup();
        closeAdminLoginPopup();
    }
    else {
        console.error('Target container not found!');
    }
    ;
}
;
renderAdmin();
function handleFormAdminLogin() {
    var form = document.getElementById('AdminLoginForm');
    if (form) {
        form.addEventListener('submit', function (event) {
            event.preventDefault();
            var formData = new FormData(form);
            var email = formData.get('AdminLoginEmail');
            var password = formData.get('AdminLoginPassword');
            console.log(" " + email + " " + password);
            loginAdmin(email, password);
        });
    }
    else {
        console.error('Login form not found in the DOM');
    }
    ;
}
;
function loginAdmin(email, password) {
    return __awaiter(this, void 0, void 0, function () {
        var response, data, AdminLoginPopup, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    console.log(" " + email + " " + password);
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 4, , 5]);
                    return [4 /*yield*/, fetch('http://localhost:3000/api/admin/login-admin', {
                            method: 'POST',
                            headers: { 'Content-Type': 'application/json' },
                            body: JSON.stringify({ email: email, password: password })
                        })];
                case 2:
                    response = _a.sent();
                    return [4 /*yield*/, response.json()];
                case 3:
                    data = _a.sent();
                    AdminLoginPopup = document.getElementById('AdminLoginPopup');
                    console.log('g', data);
                    if (response.ok) {
                        console.log('success login');
                        AdminLoginPopup.style.display = 'none';
                        window.location.href = "/AdminDashboard/adminDashboard.html";
                    }
                    else {
                        alert(data.message);
                    }
                    return [3 /*break*/, 5];
                case 4:
                    error_1 = _a.sent();
                    console.error('Error sending post:', error_1);
                    return [3 /*break*/, 5];
                case 5: return [2 /*return*/];
            }
        });
    });
}
