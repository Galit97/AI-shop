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
var chatOpended = false;
function renderChat() {
    return "\n        <div class=\"chat-AI\" id=\"chatAI\">\n        <img src=\"./images/chat-image.png\" id=\"chatBotIcon\" alt=\"Chat Icon\">\n        <div id=\"chatWindow\" class=\"chat-window\" style=\"display: none;\">\n          <div class=\"chat-header\">\n            <h4>Chat with us</h4>\n            <button id=\"closeChat\">X</button>\n          </div>\n           <div class=\"messages\" id=\"messages\"></div>\n          <div class=\"chat-body\">\n            <input type=\"text\" id=\"chatInput\" placeholder=\"Type your message...\" />\n            <button onclick=\"sendMessage()\" id=\"sendMessage\">Send</button>\n          </div>\n        </div>\n      </div>\n    ";
}
;
function render() {
    var container = document.querySelector('#chatAI'); // Adjust the selector to your target element
    if (container) {
        container.innerHTML = renderChat();
    }
    else {
        console.error('Target container not found!');
    }
    ;
}
;
render();
var chatIcon = document.querySelector('.chat-AI');
var chatWindow = document.getElementById('chatWindow');
var closeButton = document.getElementById('closeChat');
var sendButton = document.getElementById('sendMessage');
var chatInput = document.getElementById('chatInput');
var chatBotIcon = document.getElementById('chatBotIcon');
var sendMessageButton = document.getElementById('sendMessage');
chatInput.addEventListener('keydown', function (event) {
    if (event.key === 'Enter') {
        sendMessage();
    }
});
sendMessageButton.addEventListener('click', function () { return sendMessage(); });
chatIcon.addEventListener('click', function () {
    chatWindow.style.display = 'flex';
    chatOpended = true;
});
closeButton.addEventListener('click', function () {
    chatWindow.style.display = 'none';
    window.location.href = "/"; // Adjust the redirect URL as needed
});
chatBotIcon.addEventListener('click', function () {
    if (chatOpended) {
        chatWindow.style.display = 'none';
        window.location.href = "/"; // Adjust the redirect URL as needed
    }
    chatOpended = false;
});
var messagesContainer = document.getElementById('messages');
if (!messagesContainer)
    throw new Error('Chatbot messages container not found');
var isRequestInProgress = false; /* כדי לעצור את הצ'ט עד שמקבלים תשובה */
function getBotResponse(userMessage) {
    var _a;
    return __awaiter(this, void 0, void 0, function () {
        var response, data, botMessage, error_1;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    if (isRequestInProgress) {
                        alert('Please wait before sending another message.');
                        return [2 /*return*/];
                    }
                    isRequestInProgress = true;
                    _b.label = 1;
                case 1:
                    _b.trys.push([1, 4, 5, 6]);
                    return [4 /*yield*/, fetch('http://localhost:3000/api/chatBot/chat', {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json'
                            },
                            body: JSON.stringify({ userMessage: userMessage })
                        })];
                case 2:
                    response = _b.sent();
                    return [4 /*yield*/, response.json()];
                case 3:
                    data = _b.sent();
                    console.log(data);
                    if (response.ok) {
                        botMessage = data;
                        addMessage('Bot', botMessage);
                    }
                    else {
                        console.error('Error:', data);
                        addMessage('Bot', 'Error: ' + (((_a = data.error) === null || _a === void 0 ? void 0 : _a.message) || 'Unknown error.'));
                    }
                    return [3 /*break*/, 6];
                case 4:
                    error_1 = _b.sent();
                    console.error('Error:', error_1);
                    addMessage('Bot', 'Error: Unable to get bot response.');
                    return [3 /*break*/, 6];
                case 5:
                    isRequestInProgress = false;
                    return [7 /*endfinally*/];
                case 6: return [2 /*return*/];
            }
        });
    });
}
function sendMessage() {
    var input = document.getElementById('chatInput');
    var message = input.value.trim();
    console.log(message);
    if (message) {
        addMessage('User', message);
        getBotResponse(message);
        input.value = '';
    }
}
function addMessage(sender, message) {
    var div = document.createElement('div');
    div.textContent = sender + ": " + message;
    messagesContainer.appendChild(div);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
}
