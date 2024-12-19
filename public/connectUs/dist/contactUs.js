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
    return __awaiter(this, void 0, void 0, function () {
        var fullName, email, message, response, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    event.preventDefault();
                    fullName = document.getElementById("name");
                    email = document.getElementById("email");
                    message = document.getElementById("message");
                    if (!fullName.value || !email.value || !message.value) {
                        alert("All fields are required.");
                        return [2 /*return*/];
                    }
                    closeContactForm();
                    return [4 /*yield*/, fetch("/api/connectUs/send-email", {
                            method: "POST",
                            headers: {
                                "Content-Type": "application/json"
                            },
                            body: JSON.stringify({
                                fullName: fullName.value,
                                email: email.value,
                                message: message.value
                            })
                        })];
                case 1:
                    response = _a.sent();
                    if (response.ok) {
                        alert("The email was sent successfully.");
                    }
                    else {
                        alert("Error sending email.");
                    }
                    return [3 /*break*/, 3];
                case 2:
                    error_1 = _a.sent();
                    console.error("Error:", error_1);
                    alert("Error sending email.");
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    });
}
