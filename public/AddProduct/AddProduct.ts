function renderAddProduct() {
    return `
      <div class="AddProduct" id="AddProduct">
          <h2 class="AddProduct-title">Add Product</h2>
          <form id="AddProductForm">
            <input type="text" id="name" name="name" placeholder="Name" required />
            <input type="text" id="description" name="description" placeholder="Description" required />
            <label for="category">Select a Category:</label>
            <select id="category" name="category">
            <option value="technology">Technology</option>
            <option value="health">Health</option>
            <option value="education">Education</option>
            <option value="sports">Sports</option>
            <option value="entertainment">Entertainment</option>
            <option value="fashion">Fashion</option>
            <option value="HomeAndGarden">Home & Garden</option>
            <option value="toys">Toys</option>
            <option value="office">Office</option>
           <option value="other">Other</option>
            </select>  
           <input type="number" id="price" name="price" placeholder="Price" required />
           <input type="number" id="quantity" name="quantity" placeholder="quantity" required />
           <label for="inStock">In Stock:</label>
           <select id="inStock" name="in Stock">
           <option value="yes">Yes</option>
           <option value="no">No</option>
         </select>
          <select id="onSale" name="on Sale">
           <option value="yes">Yes</option>
           <option value="no">No</option>
         </select>
           <label for="comments">Add a Comment:</label>
           <textarea id="comments" name="comments" rows="3" placeholder="Write your comment here..."></textarea>
           <label for="rating">Rating:</label>
        <select id="rating" name="rating">
        <option value="5">5 - Excellent</option>
        <option value="4">4 - Very Good</option>
        <option value="3">3 - Good</option>
        <option value="2">2 - Fair</option>
       <option value="1">1 - Poor</option>
       </select>
        <button type="submit" id="AddProductButton">Add Product</button>
          </form>
        </div>
      </div>
    `;
  };

  function handleFormAddProduct(): void {
    const form = document.getElementById('AddProductForm') as HTMLFormElement;
  
    if (form) {
      form.addEventListener('submit', (event: Event) => {
        event.preventDefault();
  
        const formData = new FormData(form);
        const productData = {
          name: formData.get('name') as string,
          description: formData.get('description') as string,
          category: formData.get('category') as string,
          price: parseFloat(formData.get('price') as string),
          quantity: parseInt(formData.get('quantity') as string, 10),
          inStock: formData.get('inStock') === 'yes',
          inSale: formData.get('onSale') === 'yes',
          comments: formData.get('comments') as string,
          rating: parseInt(formData.get('rating') as string, 10),
        };
  
        console.log('Product Data:', productData);
  
        addProduct(productData);
      });
    } else {
      console.error('Add Product form not found');
    }
  }
  
  async function addProduct(productData: any) {
    try {
      const response = await fetch('http://localhost:3000/api/products/add-product', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(productData),
      });
  
      if (response.ok) {
        const result = await response.json();
        console.log('Product added successfully:', result);
        alert('Product added successfully!');
      } else {
        const error = await response.json();
        alert(`Error: ${error.message}`);
      }
    } catch (error) {
      console.error('Error adding product:', error);
    }
  }
  
  function render() {
    const container = document.getElementById('root');
    if (container) {
      container.innerHTML += renderAddProduct();
      handleFormAddProduct();
    } else {
      console.error('Root container not found!');
    }
  }
  
  render();