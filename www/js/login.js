// Save credentials to local storage
function saveCredentials(username, password) {
  localStorage.setItem("credentials", JSON.stringify({ username: username, password: password }));
  auth_header = `Basic ${btoa(`${username}:${password}`)}`;
}

// Retrieve credentials from local storage
function getCredentials() {
  return JSON.parse(localStorage.getItem("credentials"));
}

// Logout
function deleteCredentials() {
  localStorage.removeItem("credentials");
}

function register_token() {
  cordova.plugins.firebase.messaging.getToken()
  .then(token => {
    fetch(host + '/api/register_token', {
      method: 'POST',
      headers: {
        'Authorization': auth_header,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ 'token': token })
    });
  })
  .catch(() => {/* Do nothing */})
}

function unregister_token() {
  cordova.plugins.firebase.messaging.getToken()
  .then(token => {
    fetch(host + '/api/unregister_token', {
      method: 'POST',
      headers: {
        'Authorization': auth_header,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ 'token': token })
    });
  })
  .catch(() => {/* Do nothing */})
}

function showLoginPage() {

  var header = document.querySelector('header');
  header.style.display = 'none';

  var footer = document.querySelector('footer');
  footer.style.display = 'none';

  var main = document.querySelector('main');
  main.style.display = 'block';
  var loginHtml = `
      <div class="bg-transparent flex flex-col items-center justify-center px-6 py-8">
        <div class="w-full bg-white border-2 border-black rounded-lg shadow {% block width %}{% endblock %} xl:p-0 my-auto">
          <main class="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 class="text-lp-4 text-center text-xl font-bold leading-tight tracking-tight md:text-2xl">
              Log into your account
            </h1>
            <h4 id="bad_credentials_msg" class="text-center font-bold text-red-800" style="display: none;">Incorrect credentials</h4>
            <form class="space-y-4 md:space-y-6" method="post" action="">
              <div>
                <label for="email" class="block mb-2 text-sm font-medium text-gray-900">Email</label>
                <input type="email" name="email" id="email" class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5" placeholder="user@example.com" required=""></input>
              </div>
              <div>
                <label for="password" class="block mb-2 text-sm font-medium text-gray-900">Password</label>
                <input type="password" name="password" id="password" placeholder="••••••••" class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5" required=""></input>
              </div>
              <div class="text-center">
                <button type="submit" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                  <i class="fa fa-spinner" style="display: none; animation: spinning 1s linear infinite;"></i>  
                  Submit
                </button>
              </div>
            </form>
            <h3 class="text-red-800 text-center underline leading-tight tracking-tight"><a href="javascript:showMonitoring(demodata);toggleAdminStuff(false);">Offline demo</a><h3>
          </main>
        </div>
      </div>
    `;
  main.innerHTML = loginHtml;

  // Add event listener for the login form submit
  var loginForm = document.querySelector('form');
  loginForm.addEventListener('submit', function (event) {
    document.querySelector('button[type="submit"] i').style.display="block";
    document.querySelector('button[type="submit"]').disabled="true";
    document.querySelector('button[type="submit"]').opacity="40%";

    event.preventDefault(); // Prevent form submission
    var email = document.getElementById('email').value;
    var password = document.getElementById('password').value;
    var authString = btoa(`${email}:${password}`);

    // Make API call to validate user credentials
    fetch(host + '/api/servers', {
      method: 'GET',
      headers: {
        'Authorization': `Basic ${authString}`
      }
    }).then(function (response) {
      if (response.status === 401) {
        document.querySelector('button[type="submit"] i').style.display="none";
        document.querySelector('button[type="submit"]').disabled="";
        document.querySelector('button[type="submit"]').opacity="100%";
        document.getElementById('bad_credentials_msg').style.display="block";

      } else if (response.status === 200) {
        response.json().then(function (data) {

          // Saving credentials to localStorage
          saveCredentials(email, password);
          showDashboard(data['data']);
          toggleAdminStuff(data['admin']);
        });

        register_token();
      }
    })
    .catch(function (error) {
      showNetworkErrorPage();
    });
  });
}
