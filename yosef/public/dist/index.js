var loginRegisterButton = document.querySelector('.login-register');
var openMenu = document.getElementById('openMenu');
if (loginRegisterButton && openMenu) {
    loginRegisterButton.addEventListener('mouseover', function () {
        openMenu.style.display = 'block';
    });
    var closeMenu = function () {
        openMenu.style.display = 'none';
    };
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
