var current_nav_pos = null;

function navigationHighlight(val) {
    const active_classes = 'block py-2 pl-3 pr-4 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0';
    const inactive_classees = 'block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0';
    current_nav_pos = val;

    var elements = document.querySelectorAll('header li a');

    elements.forEach(function(element, i) {
      element.className = i==val? active_classes : inactive_classees;
    });
}

function navbar_clicked(n) {
    if (n === current_nav_pos) return;

    switch (n) {
        case 0:
            clearIntervals();
            loadDashboard();
            break;

        case 1:
	    clearIntervals();
            loadMonitoring();
            break;
        case 2:
        case 3:
            alert ('not implemented');
            break;

        case 4:
            clearIntervals();
            // Logout
            unregister_token(auth_header);
            deleteCredentials();

            showLoginPage();
            break;
    
        default:
            break;
    }
}
