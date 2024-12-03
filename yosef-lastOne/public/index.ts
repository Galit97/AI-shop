const loginRegisterButton = document.querySelector('.login-register') as HTMLElement | null;
const openMenu = document.getElementById('openMenu') as HTMLElement | null;

if (loginRegisterButton && openMenu) {
  loginRegisterButton.addEventListener('mouseover', () => {
    openMenu.style.display = 'block';
  });

function closeMenu() {

  try{
    if (openMenu) {
      openMenu.style.display = 'none';
    }
  }
  catch(error){
    console.error('An error occurred:', error.message);
  }
}
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


const loginPage = document.getElementById('popupLogin') as HTMLElement   /* אני תופס את הפופ אפ כניסה כדי לא להציג אותו בהתחלה */
if (!loginPage)
  throw new Error('Popup element not found');

loginPage.style.display = 'none';

const registerPage = document.getElementById('popupRegister') as HTMLElement   /* אני תופס את הפופ אפ הרשמה כדי לא להציג אותו בהתחלה */
if (!registerPage)
  throw new Error('Popup element not found');

registerPage.style.display = 'none';

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

function login(){
  try{
    const openLoginPage = document.getElementById('login')  as HTMLElement;
    const closeLoginButton = document.getElementById('closePopupLoginButton')  as HTMLElement;
    if (!openLoginPage ||!closeLoginButton || !loginPage)
      throw new Error('Open/close buttons not found');


if (!openLoginPage || !closeLoginButton)
  throw new Error('Open/close buttons not found');
        // פעולה לפתיחת הפופ-אפ

        openLoginPage.onclick = function() {
          loginPage.style.display = 'flex';  // מציג את הפופ-אפ
        };
    
        // פעולה לסגירת הפופ-אפ
        closeLoginButton.onclick = function() {
          loginPage.style.display = 'none';  // מסתיר את הפופ-אפ
        };
    
        // אפשרות לסגור את הפופ-אפ כשעושים קליק מחוץ לו
        window.onclick = function(event) {
          if (event.target === loginPage) {
            loginPage.style.display = 'none';
          }
         
        };
    
  }
  catch(err){
    console.error(err);
  }
}

function register(){
  try{

    const openRegisterPage = document.getElementById('22registerr')  as HTMLElement;
    const closeRegisterButton = document.getElementById('closePopupRegisterButton')  as HTMLElement;


        openRegisterPage.onclick = function() {
          registerPage.style.display = 'flex';  // מציג את הפופ-אפ
        };

        // פעולה לסגירת הפופ-אפ
        closeRegisterButton.onclick = function() {
          registerPage.style.display = 'none';  // מסתיר את הפופ-אפ
        };
    
        // אפשרות לסגור את הפופ-אפ כשעושים קליק מחוץ לו
        window.onclick = function(event) {
          if (event.target === registerPage) {
            registerPage.style.display = 'none';
          }
         
        };
    
  }
  catch(err){
    console.error(err);
  }
}

function normalLogin(){
  alert("אנחנו עובדים על זה");
}

function googleLogin(){
  alert("סבלנות בבקשה, אנחנו על זה");
}