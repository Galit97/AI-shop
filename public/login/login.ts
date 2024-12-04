function renderLogin() {
  return `
    <div class="loginPopup" id="loginPopup" style="display: none;">
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
  `;
}

function initLoginPopup() {
  const loginPopup = document.getElementById('loginPopup');
  const closeLoginButton = document.getElementById('closeLoginPopupButton');

  closeLoginButton?.addEventListener('click', () => {
    loginPopup!.style.display = 'none';
  });

  window.addEventListener('click', (event) => {
    if (event.target === loginPopup) {
      loginPopup!.style.display = 'none';
    }
  });
}

function render() {
  const container = document.querySelector('body');
  if (container) {
    container.innerHTML += renderLogin();
    initLoginPopup();
  } else {
    console.error('Target container not found!');
  }
}

render();
