document.addEventListener('deviceready', onDeviceReady, false);

function onDeviceReady() {
    // Cordova is now initialized. Have fun!

    login();
}

function login() {
    // Perform login and retrieve user credentials

    // Make API call to get server information
    fetch('https://navlab.ericroy.net/api/servers')
      .then(function(response) {
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
    var main = document.querySelector('main');
    main.style.display = 'block';
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
              <div>
                <button type="submit" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Submit</button>
              </div>
            </form>
          </main>
        </div>
      </div>
    `;
    main.innerHTML += loginHtml;

    // Add event listener for the login form submit
    var loginForm = document.querySelector('form');
    loginForm.addEventListener('submit', function(event) {
      event.preventDefault(); // Prevent form submission
      var email = document.getElementById('email').value;
      var password = document.getElementById('password').value;
      var authString = btoa(`${email}:${password}`);
      
      // Make API call to validate user credentials
      fetch('https://navlab.ericroy.net/api/servers', {
        method: 'GET',
        headers: {
          'Authorization': `Basic ${authString}`}
        }).then(function(response) {
          if (response.status === 401) {
            alert("BAD CREDS")
          } else if (response.status === 200) {
            response.json().then(function(data) {
              //var contentLength = data.length;
              //alert("Content Length: " + contentLength);
              dashboard(data)
              // Perform further operations with the data
            });
          }
        })
        .catch(function(error) {
          alert(error)
          // Handle network or API call errors
          console.error('API call failed:', error);
        });
    });
  }

function onError() {
    this.onerror = null;
    this.parentNode.children[0].srcset = this.parentNode.children[1].srcset = this.src;
}

  function dashboard(data) {
      document.querySelector('main').innerHTML = '';
  
      var header = document.querySelector('header');
      header.style.display = 'block';
      header.className = 'bg-white';
      header.innerHTML = `
      <nav class="bg-white border-gray-200 w-full">
        <div class="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
          <a href="https://navlab.ericroy.net/" class="flex items-center">
            <img src="./img/navlab_logo.svg" class="h-12 mr-3" alt="NavLab Logo">
          </a>
          <button data-collapse-toggle="navbar-default" type="button" class="inline-flex items-center p-2 ml-3 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200" aria-controls="navbar-default" aria-expanded="false">
            <span class="sr-only">Open main menu</span>
            <svg class="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
              <path fill-rule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clip-rule="evenodd"></path>
            </svg>
          </button>
          <div class="hidden w-full md:block md:w-auto" id="navbar-default">
            <ul class="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:border-0 md:bg-white">
              <li>
                <a href="https://navlab.ericroy.net/dashboard" class="block py-2 pl-3 pr-4 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0" aria-current="page">Dashboard</a>
              </li>
              <li>
                <a href="https://navlab.ericroy.net/monitoring" class="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0">Monitoring</a>
              </li>
              <li>
                <a href="https://navlab.ericroy.net/profile" class="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0">Profile</a>
              </li>
              <li>
                <a href="https://navlab.ericroy.net/users" class="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0">Users</a>
              </li>
              <li>
                <a href="https://navlab.ericroy.net/logout" class="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0">Log Out</a>
              </li>
            </ul>
          </div>
        </div>
      </nav>`;
  
      var main = document.querySelector('main');
      main.className = 'p-7 justify-center items-center pb-14 bg-transparent';
      main.innerHTML = `
      <div class="bg-white bg-opacity-90 max-w-[1250px] mx-auto border-black border rounded p-4 flex flex-wrap items-center mb-7 justify-between">
        <form id="search_form" method="get" action="">
          <h1 class="text-blue-900 font-bold mr-4 text-2xl text-center leading-relaxed">Service list
            <input class="text-black font-medium rounded-lg text-sm pl-5 py-1.5 border-gray border placeholder:text-gray h-full" id="search" name="search" placeholder="Search" type="text">
            <button type="submit" class="scale-[65%] ml-[-0.7em] px-2 pb-1 rounded hover:bg-gray-200">
              <i class="fa fa-sm fa-search"></i>
            </button>
          </h1>
        </form>
        <a href="https://navlab.ericroy.net/server/new" class="xm:mx-auto xm:py-1.5">
          <button type="button" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-1.5">New service</button>
        </a>
      </div>
      <script class="text-green-600" src="index_files/server_toggle.js"></script>`
  ;
  
      var cardList = document.createElement('div');
      cardList.id = 'card-list';
      cardList.className = 'flex justify-center items-center';
      main.appendChild(cardList);
  
      for (var i = 0; i < data.length; i++) {
        var article = document.createElement('article');
        article.className = 'active';
        article.setAttribute('data-id', data[i].id);
    
        var link = document.createElement('a');
        link.href = 'https://navlab.ericroy.net/server/' + data[i].id + '/edit';
    
        var heading = document.createElement('h2');
        heading.className = 'p-2';
        heading.textContent = data[i].name;
    
        var div1 = document.createElement('div');
        div1.className = 'flex';
    
        var div2 = document.createElement('div');
        div2.className = 'w-8/12';
    
        var span1 = document.createElement('span');
        span1.className = 'state-off text-red-500 text-xl';
        span1.innerHTML = '<i class="fa fa-times"></i> Off';
    
        var span2 = document.createElement('span');
        span2.className = 'state-processing text-gray-500 text-xl';
        span2.innerHTML = '<i class="fa fa-spinner animate-spin"></i> ...';
    
        var span3 = document.createElement('span');
        span3.className = 'state-on text-green-500 text-xl';
        span3.innerHTML = '<i class="fa fa-check"></i> ' + data[i].status;
    
        var br1 = document.createElement('br');
        var br2 = document.createElement('br');
    
        var button1 = document.createElement('button');
        button1.className = 'start-button bg-green-400 hover:bg-green-600 p-2 rounded text-white status-off status-button';
        button1.innerHTML = '<i class="fa fa-power-off"></i> Start';
    
        var button2 = document.createElement('button');
        button2.className = 'cancel-button bg-gray-400 hover:bg-gray-600 p-2 rounded text-white status-off status-button';
        button2.innerHTML = '<i class="fa fa-spinner animate-spin"></i> Cancel';
    
        var button3 = document.createElement('button');
        button3.className = 'processing-button bg-gray-400 p-2 rounded text-white status-off status-button cursor-not-allowed';
        button3.disabled = 'disabled';
        button3.innerHTML = '<i class="fa fa-spinner animate-spin"></i> Processing';
    
        var button4 = document.createElement('button');
        button4.className = 'stop-button bg-red-400 hover:bg-red-600 p-2 rounded text-white status-off status-button';
        button4.innerHTML = '<i class="fa fa-power-off"></i> Stop';
    
        var div3 = document.createElement('div');
        div3.className = 'w-1/12 flex justify-center items-center';
    
        var picture = document.createElement('picture');
    
        var source = document.createElement('source');
        source.srcset = data[i].image_url;
    
        var image = document.createElement('img');
        image.src = './img/no-server-placeholder.png';
        image.alt = 'placeholder';
        image.onerror = function() {
            onError.call(this);
        };
    
        picture.appendChild(source);
        picture.appendChild(image);
        div3.appendChild(picture);

        div2.appendChild(span1);
        div2.appendChild(span2);
        div2.appendChild(span3);
        div2.appendChild(br1);
        div2.appendChild(br2);
        div2.appendChild(button1);
        div2.appendChild(button2);
        div2.appendChild(button3);
        div2.appendChild(button4);
    
        div1.appendChild(div2);
        div1.appendChild(div3);
    
        link.appendChild(heading);
        link.appendChild(div1);
    
        article.appendChild(link);
        article.appendChild(picture);
    
        cardList.appendChild(article);
      }
  
      cardList.innerHTML += `
      <article class="new items-center justify-center flex">
        <a href="https://navlab.ericroy.net/server/new">
          <h2>+</h2>
        </a>
      </article>`;
  
      var footer = document.querySelector('footer');
      footer.style.display = 'block';
      footer.innerHTML = `
      <span>
        © 2023 <a href="#">iTIC</a>. All Rights Reserved.
      </span>
      <ul>
        <li>
          <a href="#">About</a>
        </li>
        <li>
          <a href="#">Privacy Policy</a>
        </li>
        <li>
          <a href="#">Contact</a>
        </li>
      </ul>`;
  }
  
