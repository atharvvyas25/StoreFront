// Configuration
const CONFIG = {
    whatsappNumber: '+15551234567',
    businessName: 'Storefront',
    currency: '$'
};

// Products data
const PRODUCTS = [
    {
        id: 1,
        name: 'Creator Oversized T-Shirt',
        price: 29.99,
        category: 't-shirts',
        image: 'Creator Oversized T-Shirt.jpg',
        sizes: ['S', 'M', 'L', 'XL'],
        rating: 4.8
    },
    {
        id: 2,
        name: 'Black Cat Hoodie In A Bag',
        price: 59.99,
        category: 'hoodies',
        image: 'Black Cat Hoodie In A Bag.jpg',
        sizes: ['S', 'M', 'L', 'XL'],
        rating: 4.9
    },
    {
        id: 3,
        name: 'Vintage Graphic Tee',
        price: 34.99,
        category: 't-shirts',
        image: 'Graphic T-Shirts Vintage Oversized Tees Streetwear Casual Acid.jpg',
        sizes: ['S', 'M', 'L', 'XL'],
        rating: 4.7
    },
    {
        id: 4,
        name: 'Letter Bishop Hoodie',
        price: 69.99,
        category: 'hoodies',
        image: 'Letter Bishop Hoodie.jpg',
        sizes: ['S', 'M', 'L', 'XL'],
        rating: 4.8
    },
    {
        id: 5,
        name: 'Custom Design T-Shirt',
        price: 39.99,
        category: 'custom',
        image: 'custom tee 1.jpg',
        sizes: ['S', 'M', 'L', 'XL'],
        rating: 4.6
    },
    {
        id: 6,
        name: 'Aesthetic Hoodie',
        price: 79.99,
        category: 'hoodies',
        image: 'Women Men Aesthetic Hoodie,.jpg',
        sizes: ['S', 'M', 'L', 'XL'],
        rating: 4.9
    },
    {
        id: 7,
        name: 'White Embroidered Cotton T-Shirt',
        price: 32.99,
        category: 't-shirts',
        image: 'White Embroideried Cotton T Shirts Men Summer.jpg',
        sizes: ['S', 'M', 'L', 'XL'],
        rating: 4.5
    },
    {
        id: 8,
        name: 'Funny Goose Print Tee',
        price: 27.99,
        category: 't-shirts',
        image: 'Aelfric Eden Men\'s and Womens Funny Goose Print Tee Causal Baggy Short Sleeve Classic Cotton Graphic Tshirt.jpg',
        sizes: ['S', 'M', 'L', 'XL'],
        rating: 4.7
    },
    {
        id: 9,
        name: 'Plain Hoodie',
        price: 49.99,
        category: 'hoodies',
        image: 'plain hoody.jpg',
        sizes: ['S', 'M', 'L', 'XL'],
        rating: 4.6
    },
    {
        id: 10,
        name: 'Graphic Hoodie',
        price: 64.99,
        category: 'hoodies',
        image: 'graphic hoody.jpg',
        sizes: ['S', 'M', 'L', 'XL'],
        rating: 4.8
    },
    {
        id: 11,
        name: 'Custom Design Tee 2',
        price: 35.99,
        category: 'custom',
        image: 'custom tee 2.jpg',
        sizes: ['S', 'M', 'L', 'XL'],
        rating: 4.5
    },
    {
        id: 12,
        name: 'Illustration Off-White T-Shirt',
        price: 42.99,
        category: 't-shirts',
        image: 'illustration-off white tshirt.jpg',
        sizes: ['S', 'M', 'L', 'XL'],
        rating: 4.7
    }
];

// Global state
let currentCategory = 'all';
let productQuantities = {};
let productSizes = {};
let searchQuery = '';

// Initialize app
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM loaded, initializing app...');
    initializeApp();
});

function initializeApp() {
    console.log('Initializing app...');
    initializeProductState();
    renderProducts();
    setupCategoryFilters();
    setupHamburgerMenu();
    setupSearch();
    console.log('App initialized successfully');
}

// Initialize product state
function initializeProductState() {
    PRODUCTS.forEach(product => {
        productQuantities[product.id] = 1;
        productSizes[product.id] = product.sizes[0];
    });
    console.log('Product state initialized');
}

// Render products
function renderProducts() {
    console.log('Rendering products...');
    const productsGrid = document.getElementById('productsGrid');
    const loading = document.getElementById('loading');
    
    if (!productsGrid) {
        console.error('Products grid not found!');
        return;
    }
    
    // Show loading
    if (loading) {
        loading.style.display = 'block';
        productsGrid.style.display = 'none';
    }
    
    let filteredProducts = PRODUCTS;
    
    // Filter by category
    if (currentCategory !== 'all') {
        filteredProducts = filteredProducts.filter(product => product.category === currentCategory);
    }
    
    // Filter by search query
    if (searchQuery.trim() !== '') {
        filteredProducts = filteredProducts.filter(product => 
            product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            product.category.toLowerCase().includes(searchQuery.toLowerCase())
        );
    }
    
    // Simulate loading delay for better UX
    setTimeout(() => {
        productsGrid.innerHTML = '';
        
        if (filteredProducts.length === 0) {
            productsGrid.innerHTML = `
                <div class="no-products">
                    <div class="no-products-icon">🔍</div>
                    <h3>No products found</h3>
                    <p>Try adjusting your search or category filter</p>
                </div>
            `;
        } else {
            filteredProducts.forEach((product, index) => {
                const productCard = createProductCard(product);
                productsGrid.appendChild(productCard);
                
                // Simple fade-in animation
                setTimeout(() => {
                    productCard.classList.add('fade-in-up');
                }, index * 100);
            });
        }
        
        // Hide loading and show products
        if (loading) {
            loading.style.display = 'none';
            productsGrid.style.display = 'grid';
        }
        
        console.log(`Rendered ${filteredProducts.length} products`);
    }, 300);
}
// Create product card
function createProductCard(product) {
    const card = document.createElement('div');
    card.className = 'product-card';
    card.style.opacity = '0';
    card.style.transform = 'translateY(20px)';
    
    const imageElement = product.image.includes('.') 
        ? `<img src="images/${product.image}" alt="${product.name}" class="product-image-img" onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';">
           <div class="product-image-placeholder" style="display:none;">Product Image</div>`
        : `<div class="product-image-placeholder">Product Image</div>`;
    
    card.innerHTML = `
        <div class="product-image">
            ${imageElement}
        </div>
        <h3 class="product-name">${product.name}</h3>
        <div class="product-price">${CONFIG.currency}${product.price}</div>
        <div class="product-rating">⭐ ${product.rating}</div>
        
        <div class="product-options">
            <div class="option-group">
                <label class="option-label">Size:</label>
                <div class="size-options" data-product-id="${product.id}">
                    ${product.sizes.map(size => `
                        <div class="size-option ${size === productSizes[product.id] ? 'active' : ''}" 
                             data-size="${size}" 
                             onclick="selectSize(${product.id}, '${size}')">
                            ${size}
                        </div>
                    `).join('')}
                </div>
            </div>
            
            <div class="option-group">
                <label class="option-label">Quantity:</label>
                <div class="quantity-selector">
                    <button class="quantity-btn" onclick="changeQuantity(${product.id}, -1)">-</button>
                    <span class="quantity-display" id="quantity-${product.id}">${productQuantities[product.id]}</span>
                    <button class="quantity-btn" onclick="changeQuantity(${product.id}, 1)">+</button>
                </div>
            </div>
        </div>
        
        <button class="product-whatsapp-btn" onclick="orderProduct(${product.id})">
            <svg class="btn-icon" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.465 3.516z"/>
            </svg>
            Order
        </button>
    `;
    
    return card;
}

// Setup search functionality
function setupSearch() {
    const searchInput = document.getElementById('searchInput');
    const searchClear = document.getElementById('searchClear');
    
    if (!searchInput) {
        console.warn('Search input not found');
        return;
    }
    
    let searchTimeout;
    
    function updateSearch(value) {
        searchQuery = value;
        renderProducts();
        
        // Show/hide clear button
        if (searchClear) {
            searchClear.style.display = value.trim() ? 'flex' : 'none';
        }
    }
    
    searchInput.addEventListener('input', function(e) {
        clearTimeout(searchTimeout);
        searchTimeout = setTimeout(() => {
            updateSearch(e.target.value);
        }, 300);
    });
    
    // Clear search on escape
    searchInput.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            this.value = '';
            updateSearch('');
        }
    });
    
    // Clear button functionality
    if (searchClear) {
        searchClear.addEventListener('click', function() {
            searchInput.value = '';
            updateSearch('');
            searchInput.focus();
        });
    }
    
    console.log('Search functionality initialized');
}

// Setup category filters
function setupCategoryFilters() {
    const categoryPills = document.querySelectorAll('.category-pill');
    
    categoryPills.forEach(pill => {
        pill.addEventListener('click', function() {
            const category = this.getAttribute('data-category');
            
            categoryPills.forEach(p => p.classList.remove('active'));
            this.classList.add('active');
            
            currentCategory = category;
            
            // Clear search when changing category
            const searchInput = document.getElementById('searchInput');
            const searchClear = document.getElementById('searchClear');
            if (searchInput) {
                searchInput.value = '';
                searchQuery = '';
                if (searchClear) {
                    searchClear.style.display = 'none';
                }
            }
            
            renderProducts();
        });
    });
    
    console.log('Category filters initialized');
}
// Handle size selection
function selectSize(productId, size) {
    productSizes[productId] = size;
    
    const sizeOptions = document.querySelectorAll(`[data-product-id="${productId}"] .size-option`);
    sizeOptions.forEach(option => {
        option.classList.remove('active');
        if (option.getAttribute('data-size') === size) {
            option.classList.add('active');
        }
    });
}

// Handle quantity changes
function changeQuantity(productId, change) {
    const currentQuantity = productQuantities[productId];
    const newQuantity = Math.max(1, Math.min(99, currentQuantity + change));
    
    productQuantities[productId] = newQuantity;
    
    const quantityDisplay = document.getElementById(`quantity-${productId}`);
    if (quantityDisplay) {
        quantityDisplay.textContent = newQuantity;
    }
}

// Handle product ordering
function orderProduct(productId) {
    const product = PRODUCTS.find(p => p.id === productId);
    if (!product) return;
    
    const size = productSizes[productId];
    const quantity = productQuantities[productId];
    const total = (product.price * quantity).toFixed(2);
    
    const message = `Hi ${CONFIG.businessName}! 👋

I'd like to order:

🛍️ *${product.name}*
💰 Price: ${CONFIG.currency}${product.price}
📏 Size: ${size}
🔢 Quantity: ${quantity}
💵 Total: ${CONFIG.currency}${total}

Please confirm availability and delivery details. Thank you!`;

    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${CONFIG.whatsappNumber.replace(/[^0-9]/g, '')}?text=${encodedMessage}`;
    
    window.open(whatsappUrl, '_blank');
}

// General WhatsApp contact
function openWhatsApp() {
    const message = `Hi ${CONFIG.businessName}! 👋

I'm interested in your products. Could you please help me with more information?

Thank you!`;
    
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${CONFIG.whatsappNumber.replace(/[^0-9]/g, '')}?text=${encodedMessage}`;
    
    window.open(whatsappUrl, '_blank');
}

// Setup hamburger menu
function setupHamburgerMenu() {
    const hamburgerBtn = document.getElementById('hamburgerBtn');
    const mobileNav = document.getElementById('mobileNav');
    const mobileNavOverlay = document.getElementById('mobileNavOverlay');
    const closeNavBtn = document.getElementById('closeNavBtn');
    const navLinks = document.querySelectorAll('.nav-link');
    
    if (!hamburgerBtn || !mobileNav || !mobileNavOverlay || !closeNavBtn) {
        console.error('Hamburger menu elements not found!');
        console.log('hamburgerBtn:', hamburgerBtn);
        console.log('mobileNav:', mobileNav);
        console.log('mobileNavOverlay:', mobileNavOverlay);
        console.log('closeNavBtn:', closeNavBtn);
        return;
    }
    
    function openMenu() {
        console.log('Opening menu...');
        hamburgerBtn.classList.add('active');
        mobileNav.classList.add('active');
        mobileNavOverlay.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
    
    function closeMenu() {
        console.log('Closing menu...');
        hamburgerBtn.classList.remove('active');
        mobileNav.classList.remove('active');
        mobileNavOverlay.classList.remove('active');
        document.body.style.overflow = '';
    }
    
    hamburgerBtn.addEventListener('click', function(e) {
        e.preventDefault();
        console.log('Hamburger button clicked');
        openMenu();
    });
    
    closeNavBtn.addEventListener('click', function(e) {
        e.preventDefault();
        console.log('Close button clicked');
        closeMenu();
    });
    
    mobileNavOverlay.addEventListener('click', function(e) {
        console.log('Overlay clicked');
        closeMenu();
    });
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            if (this.getAttribute('href').startsWith('#')) {
                e.preventDefault();
                const targetId = this.getAttribute('href').substring(1);
                const targetElement = document.getElementById(targetId);
                if (targetElement) {
                    closeMenu();
                    setTimeout(() => {
                        targetElement.scrollIntoView({
                            behavior: 'smooth',
                            block: 'start'
                        });
                    }, 300);
                }
            } else {
                closeMenu();
            }
        });
    });
    
    // Close menu on escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && mobileNav.classList.contains('active')) {
            closeMenu();
        }
    });
    
    console.log('Hamburger menu initialized successfully');
}