"use strict";

function renderChat() {
  return "\n        <div class=\"chat-AI\" id=\"chatAI\">\n        <img src=\"./images/chat-image.png\" alt=\"Chat Icon\">\n        <div id=\"chatWindow\" class=\"chat-window\" style=\"display: none;\">\n          <div class=\"chat-header\">\n            <h4>Chat with us</h4>\n            <button id=\"closeChat\">X</button>\n          </div>\n          <div class=\"chat-body\">\n            <div class=\"messages\" id=\"messages\"></div>\n            <input type=\"text\" id=\"chatInput\" placeholder=\"Type your message...\" />\n            <button id=\"sendMessage\">Send</button>\n          </div>\n        </div>\n      </div>\n    ";
}

;

function render() {
  var container = document.querySelector('#chatAI'); // Adjust the selector to your target element

  if (container) {
    container.innerHTML = renderChat();
  } else {
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