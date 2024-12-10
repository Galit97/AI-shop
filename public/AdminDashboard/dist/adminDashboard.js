function renderDashboard() {
    return "\n       <div class=\"sidebar\" id=\"dashboardContainer\">\n        <ul class=\"sidebar-menu\">\n            <li class=\"sidebar-item active\">\n            <a href=\"#products\">\n                <i class=\"icon\">&#128722;</i> <!-- Shopping cart icon -->\n                <span>Products</span>\n            </a>\n            </li>\n            <li class=\"sidebar-item\">\n            <a href=\"#categories\">\n                <i class=\"icon\">&#128195;</i> <!-- Folder icon -->\n                <span>Categories</span>\n            </a>\n            </li>\n            <li class=\"sidebar-item\">\n            <a href=\"#clients\">\n                <i class=\"icon\">&#128100;</i> <!-- User icon -->\n                <span>Clients</span>\n            </a>\n            </li>\n        </ul>\n</div>\n\n    ";
}
function render() {
    var container = document.getElementById('dashboardContainer');
    if (container) {
        container.innerHTML += renderDashboard();
    }
    else {
        console.error('Root container not found!');
    }
}
render();
