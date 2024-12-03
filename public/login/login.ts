
function renderLogin() {
    return `
         <div class="loginPopup" id="loginPopup">
    <div class="loginPopup-content">
      <button class="closeLogin-btn" id="closeLoginPopupButton">X</button>
      <h2 class="popup-title">Sign In</h2>
      <form id="loginForm">
        <input type="text" id="email" name="email" placeholder="Email" required />
        <input type="password" id="password" name="password" placeholder="Password" required />
        <button type="submit" id="loginButton">Sign In</button>
      </form>
      <p class="divider"><span>or</span></p>
      <div class="social-login">
        <button id="googleLogin" onclick="googleLogin()">
          <img src="../images/google-image.webp" alt="Google Logo" />
          Sign in with Google
        </button>
        <button id="facebookLogin" onclick="facebookLogin()">
          <img src="../images/facebook-image.webp" alt="Facebook Logo" />
          Sign in with Facebook
        </button>
      </div>
      <p class="register-link">
        Don't have an account? <a href="../register/register.html">Register</a>
      </p>
    </div>
  </div>
    `
};

function render() {
    const container = document.querySelector('#loginPopup'); 
    if (container) {
      container.innerHTML = renderLogin();
    } else {
      console.error('Target container not found!');
    };
  };

  render();

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
