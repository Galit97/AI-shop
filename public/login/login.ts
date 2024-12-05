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
          Don't have an account? <a href="?registerParam=register">Register</a>
        </p>
      </div>
    </div>
  `;
};


function openLoginPopup() {
      const queryString = window.location.search;
      const params:any = new URLSearchParams(queryString);

      const loginParam = params.get('loginParam');


      const loginPopup = document.getElementById('loginPopup'); 

      if (!loginParam) {
        loginPopup!.style.display = 'none';
      } else {
        loginPopup!.style.display = 'block';
      };
}


function closeLoginPopup() {

      const loginPopup = document.getElementById('loginPopup'); 
      const closeLoginButton = document.getElementById('closeLoginPopupButton');

      closeLoginButton?.addEventListener('click', () => {
        loginPopup!.style.display = 'none';
        window.location.href = "/";
      });
}

function render() {
    console.log('render');
    const container = document.querySelector('#loginPopup');
    if (container) {
      container.innerHTML += renderLogin();
      openLoginPopup();
      closeLoginPopup();
    } else {
      console.error('Target container not found!');
    };
};

render();


