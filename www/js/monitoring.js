function loadMonitoring() {
    showSpinnerBig();
    fetch(host + '/api/monitoring', {
	method: 'GET',
	headers: {
	    'Authorization': auth_header
	}
    }).then(async function (response) {
	if (response.status === 401) {
	    showLoginPage();
	} else if (response.status === 200) {
	    response.json().then(function (data) {
		showMonitoring(data['data']);
		toggleAdminStuff(data['admin']);
	    });
	}
    }).catch(function (error) {
	    showNetworkErrorPage();
	});
}

var charts = {};

function showMonitoring(data) {
    var main = document.querySelector('main');
    main.className = 'p-7 justify-center items-center pb-14 bg-transparent';
    main.innerHTML = `
  <div class="bg-white bg-opacity-90 max-w-[1250px] mx-auto border-black border rounded p-4 flex flex-wrap items-center mb-7 justify-between">
    <form id="search_form" method="get" action="">
      <h1 class="text-blue-900 font-bold mr-4 text-2xl text-center leading-relaxed">
        Statistics
      </h1>
    </form>
  </div>`
    ;

    for (var i = 0; i < data.length; i++) {
	main.innerHTML+=`
<article id="monitor_frame_${data[i].id}" class="bg-white w-full max-w-[1250px] border-black border-2 rounded-md p-2 my-4 mx-auto md:p-7 cursor-pointer">
      <h2 class="text-2xl font-bold text-gray-500">${data[i].title}</h2>
      <div class="relative w-full"> 
        <canvas style="margin:1.5em;" id="monitor_${data[i].key}"></canvas>
      </div>
      <p style="text-align:right;color:gray;"><em>Last sample
        (<span class="last_sample_time">${data[i].last_sample['time']}</span>):
        <span class="last_sample_value">${data[i].last_sample['value']}</span></em>
      </p>
  </article>`;
	var x_axis = data[i].x_axis;
	var y_axis = data[i].y_axis;
	
	var ctx = document.getElementById('monitor_'+data[i].key).getContext('2d');
	charts[data[i].key] = new Chart(ctx,
  {
    type: 'line',
    data: {
      labels: x_axis,
      datasets: [{
        label: data[i].label,
        data: y_axis,

        borderColor: "#1e56a0",
        backgroundColor: "#1e56a0",
        pointBackgroundColor: "#1e56a0",
        pointBorderColor: "#1e56a0",
        pointHoverBackgroundColor: "#1e56a0",
        pointHoverBorderColor: "#1e56a0",
      }]
    },
    options: {
      plugins: {
        legend: {
          display: false
        }
      },
      scales: {
        y: {
          min: data[i].min_value,
          max: data[i].max_value
        },
        x: {
          type: 'time',
          time: {
            parser: "yyyy-MM-dd HH:mm:ss",
          },
          ticks: {
            autoSkip: true,
            maxRotation: 0,
            autoSkipPadding: 30
          },
        }
      }
    }
  });
    }

    main.innerHTML += '<span style="height: 50px; display: block;"></span>'

    var header = document.querySelector('header');
    header.style.display = 'block';

    var footer = document.querySelector('footer');
    footer.style.display = 'block';

    // Loading scripts

    var scriptElement = document.createElement('script');
    scriptElement.src = `./js/secondary/monitor_update.js`;
    main.appendChild(scriptElement);

    navigationHighlight(1);
}
