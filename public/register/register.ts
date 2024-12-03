export function register() {
  try {
    const registerPage = document.getElementById('registerPopup') as HTMLElement; // Corrected ID
    if (!registerPage) throw new Error('Register popup element not found.');

    const openRegisterPage = document.getElementById('register') as HTMLElement;
    const closeRegisterButton = document.getElementById('closeRegisterPopupButton') as HTMLElement;

    if (!openRegisterPage || !closeRegisterButton) {
      throw new Error('Register open or close button not found.');
    }

    openRegisterPage.addEventListener('click', () => {
      registerPage.style.display = 'flex';
    });

    closeRegisterButton.addEventListener('click', () => {
      registerPage.style.display = 'none';
    });

    window.addEventListener('click', (event) => {
      if (event.target === registerPage) {
        registerPage.style.display = 'none';
      }
    });
  } catch (err) {
    console.error('Error in register function:', err);
  }
}