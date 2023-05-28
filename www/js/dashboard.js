function loadDashboard() {
  showSpinnerBig();
  fetch(host + '/api/servers', {
    method: 'GET',
    headers: {
      'Authorization': auth_header
    }
  }).then(async function (response) {
    if (response.status === 401) {
      showLoginPage();
    } else if (response.status === 200) {
      response.json().then(function (data) {
        showDashboard(data['data']);
        toggleAdminStuff(data['admin']);
      });
    }
  })
  .catch(function (error) {
    showNetworkErrorPage();
  });
}


function showDashboard(data) {
  var main = document.querySelector('main');
  main.className = 'p-7 justify-center items-center pb-14 bg-transparent';
  main.innerHTML = `
  <div class="bg-white bg-opacity-90 max-w-[1250px] mx-auto border-black border rounded p-4 flex flex-wrap items-center mb-7 justify-between">
    <form id="search_form" method="get" action="">
      <h1 class="text-blue-900 font-bold mr-4 text-2xl text-center leading-relaxed">Service list
        <!--<input class="text-black font-medium rounded-lg text-sm pl-5 py-1.5 border-gray border placeholder:text-gray h-full" id="search" name="search" placeholder="Search" type="text">
        <button type="submit" class="scale-[65%] ml-[-0.7em] px-2 pb-1 rounded hover:bg-gray-200">
          <i class="fa fa-sm fa-search"></i>
        </button>-->
      </h1>
    </form>
    <!--<a href="${host}/server/new" class="xm:mx-auto xm:py-1.5">
      <button type="button" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-1.5">New service</button>
    </a>-->
  </div>`
;

  var cardList = document.createElement('div');
  cardList.id = 'card-list';
  cardList.className = 'flex justify-center items-center';
  main.appendChild(cardList);

  // Loading scripts

  var scriptElement = document.createElement('script');
  scriptElement.src = `./js/secondary/server_update.js`;
  main.appendChild(scriptElement);

  var scriptElement2 = document.createElement('script');
  scriptElement2.src = `./js/secondary/server_toggle.js`;
  main.appendChild(scriptElement2);

  for (var i = 0; i < data.length; i++) {
    const image_tag = `<source srcset="${sanitizeHTML(data[i].image_url)}" />`;
    cardList.innerHTML += `
      <article class="${data[i].status? 'active' : ''}" data-id="${data[i].id}">
        <a href="javascript:void(0)">
          <h2 class="p-2">${sanitizeHTML(data[i].name)}</h2>
          <div class="flex">
            <div class="w-8/12">
              <span class="state-off text-red-500 text-xl">
                <i class="fa fa-times"></i>
                Off
              </span>
              <span class="state-processing text-gray-500 text-xl">
                <i class="fa fa-spinner animate-spin"></i>
                .....
              </span>
              <span class="state-on text-green-500 text-xl">
                <i class="fa fa-check"></i>
                Active
              </span>
              <br />
              <br />
              <div class="admin-only">
                <button class="start-button
                  bg-green-400 hover:bg-green-600 p-2 rounded text-white status-off status-button">
                  <i class="fa fa-power-off"></i>
                  Start
                </button>
                <button class="cancel-button
                  bg-gray-400 hover:bg-gray-600 p-2 rounded text-white status-off status-button">
                  <i class="fa fa-spinner animate-spin"></i>
                  Cancel
                </button>
                <button class="processing-button
                  bg-gray-400 p-2 rounded text-white status-off status-button cursor-not-allowed" disabled>
                  <i class="fa fa-spinner animate-spin"></i>
                  Processing
                </button>
                <button class="stop-button
                  bg-red-400 hover:bg-red-600 p-2 rounded text-white status-off status-button">
                  <i class="fa fa-power-off"></i>
                  Stop
                </button>
              </div>

            </div>
            <div class="w-4/12 flex justify-center items-center">
              <picture>
                ${data[i].image_url? image_tag : ""}
                <img src="./img/no-server-placeholder.png" alt="placeholder"
                onerror="this.onerror=null; 
                  var children = this.parentNode.children;
                  if (children.length >= 2) {
                      children[0].srcset = children[1].srcset = this.src;
                  } else {
                      var t = document.createElement('source');
                      t.srcset = this.src;
                      this.parentNode.appendChild(t);
                  }" />
              </picture>
            </div>
          </div>
        </a>
      </article>
    `;
  }

  cardList.innerHTML += `<article class="hidden"></article>`;
  main.innerHTML += '<span style="height: 50px; display: block;"></span>'

  var header = document.querySelector('header');
  header.style.display = 'block';

  var footer = document.querySelector('footer');
  footer.style.display = 'block';

  navigationHighlight(0);
}
