function renderProductView() {
    const container = document.getElementById("viewProduct");
    if (!container) return;

    container.innerHTML = `
        <div class="product-view">
            <div class="main-image">
              <img src="https://via.placeholder.com/500" alt="Main Product Image">
            </div>

          <div class="product-details">
            <h1 class="product-title">Product Name</h1>
            <p class="product-price">$99.99</p>
            <p class="product-description">
              This is a short description of the product highlighting its features and benefits.
            </p>

            <div class="product-options">
              <label for="size">Size:</label>
              <select id="size">
                <option value="small">Small</option>
                <option value="medium">Medium</option>
                <option value="large">Large</option>
              </select>

              <label for="quantity">Quantity:</label>
              <input type="number" id="quantity" value="1" min="1">
            </div>

            <button class="add-to-cart">Add to Cart</button>
            
          </div>
  </div>
    `
}