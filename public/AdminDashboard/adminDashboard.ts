function renderDashboard() {
    return `
       <div class="sidebar" id="dashboardContainer">
        <ul class="sidebar-menu">
            <li class="sidebar-item active">
            <a href="#products">
                <i class="icon">&#128722;</i> <!-- Shopping cart icon -->
                <span>Products</span>
            </a>
            </li>
            <li class="sidebar-item">
            <a href="#categories">
                <i class="icon">&#128195;</i> <!-- Folder icon -->
                <span>Categories</span>
            </a>
            </li>
            <li class="sidebar-item">
            <a href="#clients">
                <i class="icon">&#128100;</i> <!-- User icon -->
                <span>Clients</span>
            </a>
            </li>
        </ul>
</div>

    `;
}


function render() {
    const container = document.getElementById('dashboardContainer');
    if (container) {
      container.innerHTML += renderDashboard();
    } else {
      console.error('Root container not found!');
    }
  }
  
  render();