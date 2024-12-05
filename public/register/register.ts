function renderRegister() {
  return `
    <div class="registerPopup" id="registerPopup">
      <div class="registerPopup-content">
        <button class="closeRegister-btn" id="closeRegisterPopupButton">X</button>
        <h2 class="popup-title">Sign Up</h2>
        <form id="registerForm">
          <input type="text" id="firstName" name="firstName" placeholder="First Name" required />
          <input type="text" id="lastName" name="lastName" placeholder="Last Name" required />
          <input type="email" id="email" name="email" placeholder="Email Address" required />
          <input type="password" id="password" name="password" placeholder="Password" required />
          <input type="password" id="repeatPassword" name="repeatPassword" placeholder="Repeat Password" required />
          <input type="text" id="phoneNumber" name="phoneNumber" placeholder="Phone Number" required />
          <input type="text" id="address" name="address" placeholder="Address" required />
          <button type="submit" id="registerButton">Sign Up</button>
        </form>
        <p class="divider"><span>or</span></p>
        <div class="social-login">
          <button id="googleRegister" onclick="googleRegister()">
            <img src="../images/google-image.webp" alt="Google Logo" />
            Sign up with Google
          </button>
          <button id="facebookRegister" onclick="facebookRegister()">
            <img src="../images/facebook-image.webp" alt="Facebook Logo" />
            Sign up with Facebook
          </button>
        </div>
        <p class="login-link">
          Already have an account? <a href="../login/login.html">Log in</a>
        </p>
      </div>
    </div>
  `;
}

function initRegisterPopup() {
  try {
    let registerPopup = document.getElementById('registerPopup');
    if (!registerPopup) {
      const container = document.createElement('div');
      container.innerHTML = renderRegister();
      document.body.appendChild(container.firstElementChild as HTMLElement);
      registerPopup = document.getElementById('registerPopup') as HTMLElement;
    }

    const openRegisterPage = document.getElementById('register') as HTMLElement;
    const closeRegisterButton = document.getElementById('closeRegisterPopupButton') as HTMLElement;

    if (!openRegisterPage || !closeRegisterButton) {
      throw new Error('Register open or close button not found.');
    }

    openRegisterPage.addEventListener('click', () => {
      registerPopup!.style.display = 'flex';
    });

    closeRegisterButton.addEventListener('click', () => {
      registerPopup!.style.display = 'none';
    });

    window.addEventListener('click', (event) => {
      if (event.target === registerPopup) {
        registerPopup.style.display = 'none';
      }
    });
  } catch (err) {
    console.error('Error in initializeRegisterPopup function:', err);
  }
}

// render();