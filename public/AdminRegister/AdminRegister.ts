function renderAdminRegister() {
    return `
      <div class="AdminRegisterPopup" id="AdminRegisterPopup">
        <div class="AdminRegisterPopup-content">
          <button class="closeAdminRegister-btn" id="closeAdminRegisterPopupButton">X</button>
          <h2 class="popup-title">Sign Up</h2>
          <form id="AdminRegisterForm">
            <input type="text" id="AdminFirstName" name="AdminFirstName" placeholder="First Name" required />
            <input type="text" id="AdminLastName" name="AdminLastName" placeholder="Last Name" required />
            <input type="email" id="AdminRegisterEmail" name="AdminRegisterEmail" placeholder="Email Address" required />
            <input type="text" id="AdminPhoneNumber" name="AdminPhoneNumber" placeholder="Phone Number" required />
            <input type="password" id="AdminRegisterPassword" name="AdminRegisterPassword" placeholder="Password" required />
            <input type="password" id="AdminRepeatPassword" name="AdminRepeatPassword" placeholder="Repeat Password" required />
            <button type="submit" id="AdminRegisterButton">Sign Up</button>
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
            Already have an account? <a href="?AdminLoginParam=login">Log in</a>
          </p>
        </div>
      </div>
    `;
  };
  
  function openAdminRegisterPopup() {
        const queryString = window.location.search;
        const params:any = new URLSearchParams(queryString);
  
        const AdminRegisterParam = params.get('AdminRegisterParam');
        const AdminRegisterPopup = document.getElementById('AdminRegisterPopup'); 
  
        handleFormAdminRegister();
        if (!AdminRegisterParam) {
            AdminRegisterPopup!.style.display = 'none';
        } else {
            AdminRegisterPopup!.style.display = 'block';
        };
  };
  
  
  function closeAdminRegisterPopup() {
  
    const AdminRegisterPopup = document.getElementById('AdminRegisterPopup'); 
    const closeAdminRegisterButton = document.getElementById('closeAdminRegisterPopupButton');
  
    closeAdminRegisterButton?.addEventListener('click', () => {
        AdminRegisterPopup!.style.display = 'none';
      window.location.href = "/";
    });
  };
  
  function render() {
        console.log('render');
        const container = document.querySelector('#AdminRegisterPopup');
        if (container) {
          container.innerHTML += renderAdminRegister();
          openAdminRegisterPopup();
          closeAdminRegisterPopup();
        } else {
          console.error('Target container not found!');
        };
  };
  
  render();
  
  
  function handleFormAdminRegister(): void {
    console.log('handleFormAdminRegister');
    // Select the form element
        const form = (document.getElementById('registerForm') as HTMLFormElement);
    
        if (form) {
            form.addEventListener('submit', (event: Event) => {
                event.preventDefault();
                
                const formData = new FormData(form);
                const firstName = formData.get('AdminFirstName') as string;
                const lastName = formData.get('AdminLastName') as string;
                const phoneNumber = formData.get('AdminPhoneNumber') as string;
                const email = formData.get('AdminRegisterEmail') as string;
                const password = formData.get('AdminRegisterPassword') as string;
                const repeatPassword = formData.get('AdminRepeatPassword') as string;
                console.log(`${firstName} ${lastName} ${phoneNumber} ${email} ${password}`);
                if (password !== repeatPassword) {
                    alert('Passwords do not match! Please try again'); //todo:change
                } else {
                  
                   addAdmin(firstName, lastName, email, password, phoneNumber);
                }
            });
        } else {
            console.error('Login form not found in the DOM');
        };
    };
  
  
   async function addAdmin(firstName:string, lastName:string, email:string, password:string, phoneNumber:string) {
    
      try {
              const response = await fetch('http://localhost:3000/api/admins/register-admin', {
                  method: 'POST',
                  headers: { 'Content-Type': 'application/json' },
                  body: JSON.stringify({ firstName, lastName, email, password, phoneNumber}),
              });
              
              const data = await response.json();
              const AdminRegisterPopup = document.getElementById('AdminRegisterPopup'); 
              if (response.ok) {
                  console.log('success');
                  AdminRegisterPopup!.style.display = 'none';
                  window.location.href = "/";
              } else {
                  alert(data.message);
              }
  
        } catch (error) {
            console.error('Error sending post:', error);
        }
    }
  