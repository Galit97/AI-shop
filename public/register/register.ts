

export function register(){
    try{
  
        const registerPage = document.getElementById('popupRegister') as HTMLElement   /* אני תופס את הפופ אפ הרשמה כדי לא להציג אותו בהתחלה */
        if (!registerPage)
        throw new Error('Popup element not found');

        registerPage.style.display = 'none';
        const openRegisterPage = document.getElementById('register')  as HTMLElement;
        const closeRegisterButton = document.getElementById('closePopupRegisterButton')  as HTMLElement;
  
  
          openRegisterPage.onclick = function() {
            registerPage.style.display = 'flex'; 
          };
  
          closeRegisterButton.onclick = function() {
            registerPage.style.display = 'none'; 
          };

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