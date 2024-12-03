var loginRegisterButton = document.querySelector('.login-register');
var openMenu = document.getElementById('openMenu');
if (loginRegisterButton && openMenu) {
    loginRegisterButton.addEventListener('mouseover', function () {
        openMenu.style.display = 'block';
    });
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
    loginRegisterButton.addEventListener('mouseleave', closeMenu);
    openMenu.addEventListener('mouseleave', closeMenu);
    openMenu.addEventListener('mouseover', function () {
        openMenu.style.display = 'block';
    });
}
var chatIcon = document.querySelector('.chat-AI');
var chatWindow = document.getElementById('chatWindow');
var closeButton = document.getElementById('closeChat');
var sendButton = document.getElementById('sendMessage');
var chatInput = document.getElementById('chatInput');
var messagesContainer = document.getElementById('messages');
var loginPage = document.getElementById('popupLogin'); /* אני תופס את הפופ אפ כניסה כדי לא להציג אותו בהתחלה */
if (!loginPage)
    throw new Error('Popup element not found');
loginPage.style.display = 'none';
var registerPage = document.getElementById('popupRegister'); /* אני תופס את הפופ אפ הרשמה כדי לא להציג אותו בהתחלה */
if (!registerPage)
    throw new Error('Popup element not found');
registerPage.style.display = 'none';
chatIcon.addEventListener('click', function () {
    chatWindow.style.display = 'flex';
});
closeButton.addEventListener('click', function () {
    chatWindow.style.display = 'none';
});
sendButton.addEventListener('click', function () {
    var userMessage = chatInput.value.trim();
    if (userMessage) {
        var userMessageElement = document.createElement('div');
        userMessageElement.classList.add('user-message');
        userMessageElement.textContent = userMessage;
        messagesContainer.appendChild(userMessageElement);
        simulateAIResponse(userMessage);
        chatInput.value = '';
    }
});
function simulateAIResponse(userMessage) {
    var aiMessageElement = document.createElement('div');
    aiMessageElement.classList.add('ai-message');
    aiMessageElement.textContent = "AI Response: " + userMessage;
    messagesContainer.appendChild(aiMessageElement);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
}
function login() {
    try {
        var openLoginPage = document.getElementById('login');
        var closeLoginButton = document.getElementById('closePopupLoginButton');
        if (!openLoginPage || !closeLoginButton || !loginPage)
            throw new Error('Open/close buttons not found');
        if (!openLoginPage || !closeLoginButton)
            throw new Error('Open/close buttons not found');
        // פעולה לפתיחת הפופ-אפ
        openLoginPage.onclick = function () {
            loginPage.style.display = 'flex'; // מציג את הפופ-אפ
        };
        // פעולה לסגירת הפופ-אפ
        closeLoginButton.onclick = function () {
            loginPage.style.display = 'none'; // מסתיר את הפופ-אפ
        };
        // אפשרות לסגור את הפופ-אפ כשעושים קליק מחוץ לו
        window.onclick = function (event) {
            if (event.target === loginPage) {
                loginPage.style.display = 'none';
            }
        };
    }
    catch (err) {
        console.error(err);
    }
}
function register() {
    try {
        var openRegisterPage = document.getElementById('22registerr');
        var closeRegisterButton = document.getElementById('closePopupRegisterButton');
        openRegisterPage.onclick = function () {
            registerPage.style.display = 'flex'; // מציג את הפופ-אפ
        };
        // פעולה לסגירת הפופ-אפ
        closeRegisterButton.onclick = function () {
            registerPage.style.display = 'none'; // מסתיר את הפופ-אפ
        };
        // אפשרות לסגור את הפופ-אפ כשעושים קליק מחוץ לו
        window.onclick = function (event) {
            if (event.target === registerPage) {
                registerPage.style.display = 'none';
            }
        };
    }
    catch (err) {
        console.error(err);
    }
}
function normalLogin() {
    alert("אנחנו עובדים על זה");
}
function googleLogin() {
    alert("סבלנות בבקשה, אנחנו על זה");
}
