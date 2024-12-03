function login() {
  try {
    const loginPage = document.getElementById('popupLogin') as HTMLElement;
    const openLoginPage = document.getElementById('login') as HTMLElement;
    const closeLoginButton = document.getElementById('closePopupLoginButton') as HTMLElement;

    if (!loginPage || !openLoginPage || !closeLoginButton) {
      throw new Error('Required elements not found: Ensure popupLogin, login button, and close button exist in the DOM.');
    }

    openLoginPage.onclick = () => {
      loginPage.style.display = 'flex';
    };

    closeLoginButton.onclick = () => {
      loginPage.style.display = 'none';
    };

    window.onclick = (event: MouseEvent) => {
      if (event.target === loginPage) {
        loginPage.style.display = 'none';
      }
    };
  } catch (err) {
    console.error('Error in login function:', err);
  }
}
