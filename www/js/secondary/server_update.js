// TODO MAKE IT STOP WHEN PAGE UNLOADS
setInterval(async function () {
    const response = await fetch(`${host}/api/servers`, {
        method: 'GET',
        headers: {
          'Authorization': auth_header
        }
    });
    if (!response.ok) return;

    const json_data = (await response.json())['data'];
    
    for (let i=0; i<json_data.length; i++) {
        const current_server = json_data[i];

        const elm = document.querySelector(`#card-list>article[data-id="${current_server['id']}"]`);
        if (!elm) continue;

        if (elm.classList.contains('cancellable') || elm.classList.contains('processing')) continue;
        
        elm.classList.toggle('active', current_server['status']);
    }
}, 8000)
