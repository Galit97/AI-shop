let chatOpended = false;
function renderChat() {
    return `
        <div class="chat-AI" id="chatAI">
        <img src="./images/chat-image.png" id="chatBotIcon" alt="Chat Icon">
        <div id="chatWindow" class="chat-window" style="display: none;">
          <div class="chat-header">
            <h4>Chat with us</h4>
            <button id="closeChat">X</button>
          </div>
          <div class="chat-body">
            <div class="messages" id="messages"></div>
            <input type="text" id="chatInput" placeholder="Type your message..." />
            <button id="sendMessage">Send</button>
          </div>
        </div>
      </div>
    `
};

function render() {
    const container = document.querySelector('#chatAI'); // Adjust the selector to your target element
    if (container) {
      container.innerHTML = renderChat();
    } else {
      console.error('Target container not found!');
    };
  };

render();


const chatIcon = document.querySelector('.chat-AI') as HTMLElement;
const chatWindow = document.getElementById('chatWindow') as HTMLElement;
const closeButton = document.getElementById('closeChat') as HTMLElement;
const sendButton = document.getElementById('sendMessage') as HTMLElement;
const chatInput = document.getElementById('chatInput') as HTMLInputElement;
const messagesContainer = document.getElementById('messages') as HTMLElement;
const chatBotIcon = document.getElementById('chatBotIcon') as HTMLElement;



chatIcon.addEventListener('click', () => {
  chatWindow.style.display = 'flex'; 
  chatOpended = true;
});

closeButton.addEventListener('click', () => {
  chatWindow.style.display = 'none';
  window.location.href = "/";  // Adjust the redirect URL as needed
});

chatBotIcon.addEventListener('click', () => {
  if (chatOpended){
    chatWindow.style.display = 'none';
    window.location.href = "/";  // Adjust the redirect URL as needed
  }
  chatOpended = false;
})

sendButton.addEventListener('click', () => {
  const userMessage = chatInput.value.trim();
  if (userMessage) {
    const userMessageElement = document.createElement('div');
    userMessageElement.classList.add('user-message');
    userMessageElement.textContent = userMessage;
    messagesContainer.appendChild(userMessageElement);

    simulateAIResponse(userMessage);

    chatInput.value = '';
  }
});

function simulateAIResponse(userMessage: string): void {
  const aiMessageElement = document.createElement('div');
  aiMessageElement.classList.add('ai-message');
  aiMessageElement.textContent = `AI Response: ${userMessage}`; 
  messagesContainer.appendChild(aiMessageElement);

  messagesContainer.scrollTop = messagesContainer.scrollHeight;
}
