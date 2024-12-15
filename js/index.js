document.addEventListener('DOMContentLoaded', () => {
    // Redirect if not logged in
    if (localStorage.getItem('loggedIn') === 'false') {
        window.location.href = 'kaira-1.0.0/../login.html';
        return;
    }
  
    // Fetch and display categories
    fetch('https://fakestoreapi.in/api/products/category')
        .then(res => res.json())
        .then(data => {
            const container = document.querySelector('.category');
            if (!data.categories) throw new Error("Categories data not found");
  
            container.innerHTML = data.categories.map(category => `
                <div class="col-md-4">
                    <div class="cat-item image-zoom-effect">
                        <div class="image-holder">
                            <a href="index.html">
                                <img src="" alt="${category}" class="product-image img-fluid">
                            </a>
                        </div>
                        <div class="category-content">
                            <div class="product-button">
                                <a href="index.html" class="btn btn-common text-uppercase">${category}</a>
                            </div>
                        </div>
                    </div>
                </div>
            `).join('');
        })
        .catch(error => console.error('Error fetching categories:', error));
  
    // Fetch and display products
    fetch('https://fakestoreapi.in/api/products')
        .then(res => res.json())
        .then(data => {
            const container = document.querySelector('.main');
            if (!data.products) throw new Error("Products data not found");
  
            container.innerHTML = data.products.map(product => {
                const limitedDesc = product.description.split(' ').slice(0, 10).join(' ');
                const limitedTitle = product.title.split(' ').slice(0, 10).join(' ');
  
                return `
                    <div class="swiper-slide col-4">
                        <div class="product-item image-zoom-effect link-effect">
                            <div class="image-holder position-relative">
                                <a href="index.html">
                                    <img src="${product.image}" alt="categories" class="product-image img-fluid">
                                </a>
                                <a href="index.html" class="btn-icon btn-wishlist">
                                    <svg width="24" height="24" viewBox="0 0 24 24">
                                        <use xlink:href="#heart"></use>
                                    </svg>
                                </a>
                                <div class="product-content">
                                    <h5 class="element-title text-uppercase fs-5 mt-3">
                                        <a href="index.html">${limitedTitle}</a>
                                    </h5>
                                    <p>${limitedDesc}</p>
                                    <button class="text-decoration-none cart btn btn-primary" 
                                        data-id="${product.id}" 
                                        data-name="${product.title}" 
                                        data-price="${product.price}" 
                                        data-description="${product.description}" 
                                        data-image="${product.image}">
                                        Add to Cart ($${product.price})
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                `;
            }).join('');
  
            // Add event listeners to "Add to Cart" buttons
            const addToCartButtons = document.querySelectorAll('.cart');
            addToCartButtons.forEach(button => {
                button.addEventListener('click', () => {
                    const product = {
                        id: button.dataset.id,
                        name: button.dataset.name,
                        price: parseFloat(button.dataset.price),
                        description: button.dataset.description,
                        image: button.dataset.image,
                        quantity: 1,
                    };
  
                    let cart = JSON.parse(localStorage.getItem('cart')) || [];
                    const existingProduct = cart.find(item => item.id === product.id);
  
                    if (existingProduct) {
                        existingProduct.quantity += 1;
                    } else {
                        cart.push(product);
                        window.location.href = 'kaira-1.0.0/../index.html';
                    }
  
                    localStorage.setItem('cart', JSON.stringify(cart));
                    alert(`${product.name} added to your cart!`);
                });
            });
        })
        .catch(error => console.error('Error fetching products:', error));
  
    // Display cart items
    const renderCart = () => {
        const cartContainer = document.querySelector('.shopCart .p-5');
        const cart = JSON.parse(localStorage.getItem('cart')) || [];
  
        if (cart.length === 0) {
            cartContainer.innerHTML = '<p>Your cart is empty.</p>';
        } else {
            cartContainer.innerHTML = cart.map(item => `
                <div class="row mb-4 d-flex justify-content-between align-items-center">
                    <div class="col-md-2 col-lg-2 col-xl-2">
                        <img src="${item.image}" class="img-fluid rounded-3" alt="${item.name}">
                    </div>
                    <div class="col-md-3 col-lg-3 col-xl-3">
                        <h6 class="text-muted">${item.name.split(' ').slice(0, 5).join(' ')}</h6>
                        <h6 class="mb-0">${item.description.split(' ').slice(0, 5).join(' ')}</h6>
                    </div>
                    <div class="col-md-3 col-lg-3 col-xl-2 d-flex">
                        <span class="quantity">Quantity: ${item.quantity}</span>
                    </div>
                    <div class="col-md-3 col-lg-2 col-xl-2 offset-lg-1">
                        <h6 class="mb-0">$ ${(item.price * item.quantity).toFixed(2)}</h6>
                    </div>
                    <button class="btn btn-danger ms-auto remove-item mt-4 p-0" data-id="${item.id}">
                        Remove
                    </button>
                </div>
                <hr class="my-4">
            `).join('');
  
            // Add event listeners to "Remove" buttons
            const removeButtons = document.querySelectorAll('.remove-item');
            removeButtons.forEach(button => {
                button.addEventListener('click', () => {
                    const productId = button.dataset.id;
                    let cart = JSON.parse(localStorage.getItem('cart')) || [];
                    cart = cart.filter(item => item.id !== productId);
                    localStorage.setItem('cart', JSON.stringify(cart));
                    renderCart();
                });
            });
        }
  
        const summaryContainer = document.querySelector('.summary');
        summaryContainer.innerHTML = `
            <div class="d-flex justify-content-between mb-4">
                <h5 class="text-uppercase">Items: ${cart.reduce((sum, item) => sum + item.quantity, 0)}</h5>
            </div>
            <h5 class="text-uppercase mb-3">Shipping</h5>
            <div class="mb-4 pb-2">
                <select data-mdb-select-init>
                    <option value="1">Standard-Delivery - €5.00</option>
                </select>
            </div>
            <h5 class="text-uppercase mb-3">Give code</h5>
            <div class="mb-5">
                <div data-mdb-input-init class="form-outline">
                    <input type="text" id="form3Examplea2" class="form-control form-control-lg" />
                    <label class="form-label" for="form3Examplea2">Enter your code</label>
                </div>
            </div>
            <hr class="my-4">
            <div class="d-flex justify-content-between mb-5">
                <h5 class="text-uppercase">Total price</h5>
                <h5>€ ${cart.reduce((sum, item) => sum + (item.price * item.quantity), 5).toFixed(2)}</h5>
            </div>
        `;
    };
  
    renderCart();
  });
  
  // Signup/Signin Toggle
  const signUpButton = document.getElementById('signUp');
  const signInButton = document.getElementById('signIn');
  const container = document.getElementById('container');
  
  if (signUpButton && signInButton && container) {
    signUpButton.addEventListener('click', () => {
        container.classList.add("right-panel-active");
    });
  
    signInButton.addEventListener('click', () => {
        container.classList.remove("right-panel-active");
    });
  }
  console.log(parseInt("123Hello"));
  console.log(parseInt("Hello123"));