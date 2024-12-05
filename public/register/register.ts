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
          Already have an account? <a href="?loginParam=login">Log in</a>
        </p>
      </div>
    </div>
  `;
}

function openRegisterPopup() {
      const queryString = window.location.search;
      const params:any = new URLSearchParams(queryString);

      const registerParam = params.get('registerParam');


      const registerPopup = document.getElementById('registerPopup'); 

      if (!registerParam) {
        registerPopup!.style.display = 'none';
      } else {
        registerPopup!.style.display = 'block';
      };
};


function closeRegisterPopup() {

  const registerPopup = document.getElementById('registerPopup'); 
  const closeRegisterButton = document.getElementById('closeRegisterPopupButton');

  closeRegisterButton?.addEventListener('click', () => {
    registerPopup!.style.display = 'none';
    window.location.href = "/";
  });
}

function render() {
      console.log('render');
      const container = document.querySelector('#registerPopup');
      if (container) {
        container.innerHTML += renderRegister();
        openRegisterPopup();
        closeRegisterPopup();
      } else {
        console.error('Target container not found!');
      };
};

render();