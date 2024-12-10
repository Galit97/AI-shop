function renderProducts() {
    const container = document.getElementById("show-products");
  if (!container) return;

  container.innerHTML = `
        <h1>Product</h1>
    `
};

renderProducts();