function login(){
    try{

    
const loginPage = document.getElementById('popupLogin') as HTMLElement   /* אני תופס את הפופ אפ כניסה כדי לא להציג אותו בהתחלה */
if (!loginPage)
  throw new Error('Popup element not found');

loginPage.style.display = 'none';
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
  };
  
  function normalLogin(){
    alert("אנחנו עובדים על זה");
  }
  
  function googleLogin(){
    alert("סבלנות בבקשה, אנחנו על זה");
  }