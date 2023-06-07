document.addEventListener('deviceready', onDeviceReady, false);
var auth_header = undefined;

function onDeviceReady() {
  // Cordova is now initialized. Have fun!

  credentials = getCredentials();
  if (credentials) {
    auth_header = `Basic ${btoa(`${credentials.username}:${credentials.password}`)}`;
    loadDashboard();
  }
  else {
    showLoginPage();
  }
}

function toggleAdminStuff(val) {
  var elements = document.querySelectorAll('.admin-only');

  elements.forEach(function(element) {
    element.style.display = val? 'block' : 'none';
  });
}

function showNetworkErrorPage() {
  var header = document.querySelector('header');
  header.style.display = 'none';

  var footer = document.querySelector('footer');
  footer.style.display = 'none';
  
  document.querySelector('main').innerHTML = `
  <div class="bg-white mt-4 bg-opacity-90 max-w-[1250px] mx-4 border-black border rounded p-4 flex flex-wrap items-center justify-between">
      <h1 class="text-blue-900 font-bold mr-4 text-2xl text-center leading-relaxed">
        Couldn't load! Check your internet connection and <a class="underline" href="javascript:onDeviceReady()">try again</a>.
      </h1>
  </div>`
;
}

function showSpinnerBig() {
  var header = document.querySelector('header');
  header.style.display = 'none';

  var footer = document.querySelector('footer');
  footer.style.display = 'none';
  
  document.querySelector('main').innerHTML = `
    <div class="flex items-middle justify-center p-5">
      <i class="fa fa-spinner text-gray-900" style="animation: spinning 1s linear infinite; font-size: 7rem;"></i>
    </div>
    `;
}

function sanitizeHTML(str) {
  var tempElement = document.createElement('div');
  tempElement.textContent = str;
  return tempElement.innerHTML;
}
