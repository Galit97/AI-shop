function renderAdminLogin() {
    return `
    
      <div class="AdminLoginPopup" id="AdminLoginPopup">
        <div class="AdminLoginPopup-content">
          <button class="closeAdminLogin-btn" id="closeAdminLoginPopupButton">X</button>
          <h2 class="popup-title">Sign In</h2>
          <form id="AdminLoginForm">
            <input type="text" id="AdminLoginEmail" name="AdminLoginEmail" placeholder="Email" required />
            <input type="password" id="AdminLoginPassword" name="AdminLoginPassword" placeholder="Password" required />
            <button type="submit" id="AdminLoginButton">Sign In</button>
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
        </div>
      </div>
    `;
  };
  
  
  function openAdminLoginPopup() {
        const queryString = window.location.search;
        const params:any = new URLSearchParams(queryString);
  
        const AdminLoginParam = params.get('AdminLoginParam');
  
  
        const AdminLoginPopup = document.getElementById('AdminLoginPopup'); 
        handleFormAdminLogin();
        if (!AdminLoginParam) {
            AdminLoginPopup!.style.display = 'none';
        } else {
            AdminLoginPopup!.style.display = 'block';
        };
  }
  
  
  function closeAdminLoginPopup() {
  
        const AdminLoginPopup = document.getElementById('AdminLoginPopup'); 
        const closeAdminLoginButton = document.getElementById('closeAdminLoginPopupButton');
  
        closeAdminLoginButton?.addEventListener('click', () => {
            AdminLoginPopup!.style.display = 'none';
            window.location.href = "/";
        });
  }
  
  function render() {
      const container = document.querySelector('#AdminLoginPopup');
      if (container) {
        container.innerHTML += renderAdminLogin();
        openAdminLoginPopup();
        closeAdminLoginPopup();
      } else {
        console.error('Target container not found!');
      };
  };
  
  render();
  
  
  function handleFormAdminLogin(): void {
        const form = (document.getElementById('AdminLoginForm') as HTMLFormElement);
    
        if (form) {
            form.addEventListener('submit', (event: Event) => {
                event.preventDefault();
                
                const formData = new FormData(form);
                const email = formData.get('AdminLoginEmail') as string;
                const password = formData.get('AdminLoginPassword') as string;
                console.log(` ${email} ${password}`);
  
                loginAdmin(email, password);
            });
          } else {
            console.error('Login form not found in the DOM');
        };                
    };
  
   async function loginAdmin(email:string, password:string) {
    console.log(` hcnlav l;ad ${email} ${password}`);
      try {
              const response = await fetch('http://localhost:3000/api/admin/login-admin', {
                  method: 'POST',
                  headers: { 'Content-Type': 'application/json' },
                  body: JSON.stringify({email, password}),
              });
              
              const data = await response.json();
              const AdminLoginPopup = document.getElementById('AdminLoginPopup'); 
              console.log('g', data);
              if (response.ok) {
                  console.log('success login');
                  AdminLoginPopup!.style.display = 'none';
                  window.location.href = "./adminDashboard/adminDashboard.html";
              } else {
                  alert(data.message);
              }
  
        } catch (error) {
            console.error('Error sending post:', error);
        }
    }
  