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
           <div class="messages" id="messages"></div>
          <div class="chat-body">
            <input type="text" id="chatInput" placeholder="Type your message..." />
            <button onclick="sendMessage()" id="sendMessage">Send</button>
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
const chatBotIcon = document.getElementById('chatBotIcon') as HTMLElement;
const sendMessageButton = document.getElementById('sendMessage') as HTMLElement;

chatInput.addEventListener('keydown', (event) => {
  if (event.key === 'Enter') {
    sendMessage();
  }
});
sendMessageButton.addEventListener('click', () => sendMessage())
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

const messagesContainer = document.getElementById('messages') as HTMLDivElement;
if (!messagesContainer)
    throw new Error('Chatbot messages container not found');


let isRequestInProgress = false;   /* כדי לעצור את הצ'ט עד שמקבלים תשובה */

async function getBotResponse(userMessage) {      /*  פונקציה שפונה לשרת של CHATGPT */
    if (isRequestInProgress){
        alert('Please wait before sending another message.');
        return;
    }
    isRequestInProgress = true;
    try{
        
    const response = await fetch('http://localhost:3000/api/chatBot/chat', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({userMessage})
      });
    

    const data = await response.json();
    console.log(data);
    if (response.ok)
    {
        const botMessage = data
        addMessage('Bot', botMessage);
     }
     else
     {
        console.error('Error:', data);
        addMessage('Bot', 'Error: ' + (data.error?.message || 'Unknown error.'));

     }
    }
    catch (error){
        console.error('Error:', error);
        addMessage('Bot', 'Error: Unable to get bot response.');
    }
    finally{
        isRequestInProgress = false;
    }
}

function sendMessage() {
    const input = document.getElementById('chatInput') as HTMLInputElement;
    const message = input.value.trim();
    console.log(message);
    if (message) {
        addMessage('User', message);
        getBotResponse(message);
        input.value = '';
    }
}

function addMessage(sender, message) {
    const div = document.createElement('div');
    div.textContent = `${sender}: ${message}`;
    messagesContainer.appendChild(div);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
}