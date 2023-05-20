function login() {
  alert("TESTING TESTING TESTING 2")
    // Perform login and retrieve user credentials

    // Make API call to get server information
    fetch('https://navlab.ericroy.net/api/servers')
      .then(function(response) {
        alert("TESTING TESTING TESTING 3")
        if (response.status === 401) {
          // User is unauthorized, show login page
          showLoginPage();
        } else if (response.status === 200) {
          // User is authorized, retrieve contents and load dashboard
          response.json().then(function(data) {
            dashboard(data);
          });
        } else {
          // Handle other response statuses
        }
      })
      .catch(function(error) {
        // Handle network or API call errors
          alert(error)
        console.error('API call failed:', error);
      });
  }


function showLoginPage() {
  alert("TESTING TESTING TESTING")
    var body = document.getElementsByTagName('body')[0];
  
    var loginHtml = `
      <div class="bg-transparent flex flex-col items-center justify-center px-6 py-8">
        <div class="w-full bg-white border-2 border-black rounded-lg shadow {% block width %}{% endblock %} xl:p-0">
          <main class="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 class="text-lp-4 text-center text-xl font-bold leading-tight tracking-tight md:text-2xl">
              Log into your account
            </h1>
            <form class="space-y-4 md:space-y-6" method="post" action="">
              <div>
                <label for="email" class="block mb-2 text-sm font-medium text-gray-900">Email</label>
                <input type="email" name="email" id="email" class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5" placeholder="user@example.com" required=""></input>
              </div>
              <div>
                <label for="password" class="block mb-2 text-sm font-medium text-gray-900">Password</label>
                <input type="password" name="password" id="password" placeholder="••••••••" class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5" required=""></input>
              </div>
            </form>
          </main>
        </div>
      </div>
    `;
    body.innerHTML = loginHtml;

    // Add event listener for the login form submit
    var loginForm = document.querySelector('form');
    loginForm.addEventListener('submit', function(event) {
      event.preventDefault(); // Prevent form submission
      var email = document.getElementById('email').value;
      var password = document.getElementById('password').value;
  
      // Make API call to validate user credentials
      fetch('https://navlab.ericroy.net/login', {
        method: 'POST',
        body: JSON.stringify({ email: email, password: password }),
        headers: { 'Content-Type': 'application/json' }
      })
        .then(function(response) {
          if (response.status === 401) {
            // Invalid credentials, show error message or handle appropriately
            console.log('Invalid credentials');
          } else if (response.status === 200) {
            // User is authorized, retrieve contents and load dashboard
            response.json().then(function(data) {
              dashboard(data);
            });
          } else {
            // Handle other response statuses
            console.log('Unexpected response:', response);
          }
        })
        .catch(function(error) {
          // Handle network or API call errors
          console.error('API call failed:', error);
        });
    });
  }