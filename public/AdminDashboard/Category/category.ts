function renderCategory () {
`
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Add Category</title>
            <link rel="stylesheet" href="/styles/category.css">
        </head>
        <body>
            <div class="form-container">
                <h1>Add a New Category</h1>
                <form action="/categories/add-category" method="POST" class="category-form">
                    <label for="name">Category Name:</label>
                    <input type="text" id="name" name="name" placeholder="Enter category name" required />
                    <button type="submit">Add Category</button>
                </form>
            </div>
        </body>
        </html>
    `
}