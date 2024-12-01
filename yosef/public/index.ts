const loginRegisterButton = document.querySelector('.login-register') as HTMLElement | null;
const openMenu = document.getElementById('openMenu') as HTMLElement | null;

if (loginRegisterButton && openMenu) {
  loginRegisterButton.addEventListener('mouseover', () => {
    openMenu.style.display = 'block';
  });

  const closeMenu = () => {
    openMenu.style.display = 'none';
  };

  loginRegisterButton.addEventListener('mouseleave', closeMenu);
  openMenu.addEventListener('mouseleave', closeMenu);

  openMenu.addEventListener('mouseover', () => {
    openMenu.style.display = 'block';
  });
}

const chatIcon = document.querySelector('.chat-AI') as HTMLElement;
const chatWindow = document.getElementById('chatWindow') as HTMLElement;
const closeButton = document.getElementById('closeChat') as HTMLElement;
const sendButton = document.getElementById('sendMessage') as HTMLElement;
const chatInput = document.getElementById('chatInput') as HTMLInputElement;
const messagesContainer = document.getElementById('messages') as HTMLElement;

chatIcon.addEventListener('click', () => {
  chatWindow.style.display = 'flex'; 
});

closeButton.addEventListener('click', () => {
  chatWindow.style.display = 'none'; 
});

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
