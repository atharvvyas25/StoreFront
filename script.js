// App Configuration - Easy to customize
const CONFIG = {
    // WhatsApp number (change this to your business number)
    whatsappNumber: '+15551234567',
    
    // Business name
    businessName: 'Storefront',
    
    // Currency symbol
    currency: '$'
};

// Products data - Easy to add/edit/remove products
const PRODUCTS = [
    {
        id: 1,
        name: 'Creator Oversized T-Shirt',
        price: 29.99,
        category: 't-shirts',
        image: 'Creator Oversized T-Shirt.jpg', // Using actual image from folder
        sizes: ['S', 'M', 'L', 'XL'],
        rating: 4.8
    },
    {
        id: 2,
        name: 'Black Cat Hoodie In A Bag',
        price: 59.99,
        category: 'hoodies',
        image: 'Black Cat Hoodie In A Bag.jpg', // Using actual image from folder
        sizes: ['S', 'M', 'L', 'XL'],
        rating: 4.9
    },
    {
        id: 3,
        name: 'Vintage Graphic Tee',
        price: 34.99,
        category: 't-shirts',
        image: 'Graphic T-Shirts Vintage Oversized Tees Streetwear Casual Acid.jpg', // Using actual image from folder
        sizes: ['S', 'M', 'L', 'XL'],
        rating: 4.7
    },
    {
        id: 4,
        name: 'Letter Bishop Hoodie',
        price: 69.99,
        category: 'hoodies',
        image: 'Letter Bishop Hoodie.jpg', // Using actual image from folder
        sizes: ['S', 'M', 'L', 'XL'],
        rating: 4.8
    },
    {
        id: 5,
        name: 'Custom Design T-Shirt',
        price: 39.99,
        category: 'custom',
        image: 'custom tee 1.jpg', // Using actual image from folder
        sizes: ['S', 'M', 'L', 'XL'],
        rating: 4.6
    },
    {
        id: 6,
        name: 'Aesthetic Hoodie',
        price: 79.99,
        category: 'hoodies',
        image: 'Women Men Aesthetic Hoodie,.jpg', // Using actual image from folder
        sizes: ['S', 'M', 'L', 'XL'],
        rating: 4.9
    },
    {
        id: 7,
        name: 'White Embroidered Cotton T-Shirt',
        price: 32.99,
        category: 't-shirts',
        image: 'White Embroideried Cotton T Shirts Men Summer.jpg', // Using actual image from folder
        sizes: ['S', 'M', 'L', 'XL'],
        rating: 4.5
    },
    {
        id: 8,
        name: 'Funny Goose Print Tee',
        price: 27.99,
        category: 't-shirts',
        image: 'Aelfric Eden Men\'s and Womens Funny Goose Print Tee Causal Baggy Short Sleeve Classic Cotton Graphic Tshirt.jpg', // Using actual image from folder
        sizes: ['S', 'M', 'L', 'XL'],
        rating: 4.7
    },
    {
        id: 9,
        name: 'Graphic Hoodie',
        price: 64.99,
        category: 'hoodies',
        image: 'graphic hoody.jpg', // Using actual image from folder
        sizes: ['S', 'M', 'L', 'XL'],
        rating: 4.6
    },
    {
        id: 10,
        name: 'Plain Classic Hoodie',
        price: 49.99,
        category: 'hoodies',
        image: 'plain hoody.jpg', // Using actual image from folder
        sizes: ['S', 'M', 'L', 'XL'],
        rating: 4.8
    },
    {
        id: 11,
        name: 'Custom Design Tee 2',
        price: 42.99,
        category: 'custom',
        image: 'custom tee 2.jpg', // Using actual image from folder
        sizes: ['S', 'M', 'L', 'XL'],
        rating: 4.5
    },
    {
        id: 12,
        name: 'Illustration Off-White T-Shirt',
        price: 36.99,
        category: 't-shirts',
        image: 'illustration-off white tshirt.jpg', // Using actual image from folder
        sizes: ['S', 'M', 'L', 'XL'],
        rating: 4.7
    }
];

// Global state
let currentCategory = 'all';
let productQuantities = {};
let productSizes = {};

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

function initializeApp() {
    renderProducts();
    setupCategoryFilters();
    setupScrollAnimations();
    initializeProductState();
    setupTopBarScroll();
    setupHamburgerMenu(); // Fixed: Added hamburger menu initialization
    initGSAPAnimations(); // Added: Initialize GSAP animations
}

// Initialize product state (quantities and sizes)
function initializeProductState() {
    PRODUCTS.forEach(product => {
        productQuantities[product.id] = 1;
        productSizes[product.id] = product.sizes[0]; // Default to first size
    });
}

// Setup top bar scroll behavior
function setupTopBarScroll() {
    const topBar = document.querySelector('.top-bar');
    let lastScrollY = window.scrollY;
    
    window.addEventListener('scroll', () => {
        const currentScrollY = window.scrollY;
        
        if (currentScrollY > lastScrollY && currentScrollY > 100) {
            topBar.style.transform = 'translateY(-100%)';
        } else {
            topBar.style.transform = 'translateY(0)';
        }
        
        lastScrollY = currentScrollY;
    });
}

// Render products in the grid
function renderProducts() {
    const productsGrid = document.getElementById('productsGrid');
    const filteredProducts = currentCategory === 'all' 
        ? PRODUCTS 
        : PRODUCTS.filter(product => product.category === currentCategory);
    
    productsGrid.innerHTML = '';
    
    filteredProducts.forEach((product, index) => {
        const productCard = createProductCard(product);
        productsGrid.appendChild(productCard);
    });
    
    // Use GSAP animation instead of setTimeout
    animateProductCards();
}

// Create individual product card
function createProductCard(product) {
    const card = document.createElement('div');
    card.className = 'product-card';
    card.style.opacity = '0';
    
    // Fixed: Dynamic image loading from /images folder
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
                <label class="option-label">Qty:</label>
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

// Setup category filter functionality
function setupCategoryFilters() {
    const categoryPills = document.querySelectorAll('.category-pill');
    
    categoryPills.forEach(pill => {
        pill.addEventListener('click', function() {
            const category = this.getAttribute('data-category');
            
            // Update active pill
            categoryPills.forEach(p => p.classList.remove('active'));
            this.classList.add('active');
            
            // Update current category and re-render products
            currentCategory = category;
            renderProducts();
            
            // Add haptic feedback on mobile
            if (navigator.vibrate) {
                navigator.vibrate(50);
            }
        });
    });
}

// Handle size selection
function selectSize(productId, size) {
    productSizes[productId] = size;
    
    // Update UI
    const sizeOptions = document.querySelectorAll(`[data-product-id="${productId}"] .size-option`);
    sizeOptions.forEach(option => {
        option.classList.remove('active');
        if (option.getAttribute('data-size') === size) {
            option.classList.add('active');
            // Add GSAP animation for selected size
            animateSizeSelection(option);
        }
    });
    
    // Add haptic feedback on mobile
    if (navigator.vibrate) {
        navigator.vibrate(30);
    }
}

// Handle quantity changes
function changeQuantity(productId, change) {
    const currentQuantity = productQuantities[productId];
    const newQuantity = Math.max(1, Math.min(99, currentQuantity + change));
    
    productQuantities[productId] = newQuantity;
    
    // Update display
    const quantityDisplay = document.getElementById(`quantity-${productId}`);
    if (quantityDisplay) {
        quantityDisplay.textContent = newQuantity;
        
        // Use GSAP animation instead of manual transform
        animateQuantityChange(quantityDisplay);
    }
    
    // Add haptic feedback on mobile
    if (navigator.vibrate) {
        navigator.vibrate(30);
    }
}

// Handle product ordering
function orderProduct(productId) {
    const product = PRODUCTS.find(p => p.id === productId);
    if (!product) return;
    
    const size = productSizes[productId];
    const quantity = productQuantities[productId];
    
    // Create WhatsApp message
    const message = createWhatsAppMessage(product, size, quantity);
    
    // Add GSAP loading animation - mobile optimized
    const button = event.target.closest('.product-whatsapp-btn');
    const isMobile = window.innerWidth <= 768;
    
    if (isMobile) {
        // Simplified animation for mobile
        gsap.timeline()
            .to(button, {
                duration: 0.1,
                scale: 0.97,
                ease: 'power2.out'
            })
            .to(button, {
                duration: 0.2,
                scale: 1,
                backgroundColor: '#128C7E',
                ease: 'power2.out',
                onComplete: () => {
                    openWhatsAppWithMessage(message);
                    // Reset button color
                    gsap.to(button, {
                        duration: 0.3,
                        backgroundColor: '#25D366',
                        ease: 'power2.out'
                    });
                }
            });
    } else {
        // Full animation for desktop
        gsap.timeline()
            .to(button, {
                duration: 0.2,
                scale: 0.95,
                ease: 'power2.out'
            })
            .to(button, {
                duration: 0.3,
                scale: 1.05,
                backgroundColor: '#128C7E',
                ease: 'power2.out'
            })
            .to(button, {
                duration: 0.2,
                scale: 1,
                backgroundColor: '#25D366',
                ease: 'power2.out',
                onComplete: () => {
                    openWhatsAppWithMessage(message);
                }
            });
    }
    
    // Add haptic feedback on mobile
    if (navigator.vibrate) {
        navigator.vibrate([50, 50, 50]);
    }
}

// Create WhatsApp message for specific product
function createWhatsAppMessage(product, size, quantity) {
    const total = (product.price * quantity).toFixed(2);
    
    const message = `Hi ${CONFIG.businessName}! 👋

I'd like to order:

🛍️ *${product.name}*
💰 Price: ${CONFIG.currency}${product.price}
📏 Size: ${size}
🔢 Quantity: ${quantity}
💵 Total: ${CONFIG.currency}${total}

Please confirm availability and delivery details. Thank you!`;

    return message;
}

// Open WhatsApp with specific message
function openWhatsAppWithMessage(message) {
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${CONFIG.whatsappNumber.replace(/[^0-9]/g, '')}?text=${encodedMessage}`;
    
    window.open(whatsappUrl, '_blank');
}

// General WhatsApp contact function (for hero button and bottom bar)
function openWhatsApp() {
    const message = `Hi ${CONFIG.businessName}! 👋

I'm interested in your products. Could you please help me with more information?

Thank you!`;
    
    openWhatsAppWithMessage(message);
    
    // Add haptic feedback on mobile
    if (navigator.vibrate) {
        navigator.vibrate([100, 50, 100]);
    }
}

// Setup scroll animations
function setupScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('slide-in-up');
            }
        });
    }, observerOptions);
    
    // Observe sections for animation
    const sections = document.querySelectorAll('.trust-section, .how-it-works, .testimonials');
    sections.forEach(section => {
        observer.observe(section);
    });
}

// Add touch interactions for mobile
document.addEventListener('touchstart', function(e) {
    if (e.target.matches('.product-card, .category-pill, .trust-card')) {
        e.target.style.transform = 'scale(0.98)';
    }
});

document.addEventListener('touchend', function(e) {
    if (e.target.matches('.product-card, .category-pill, .trust-card')) {
        setTimeout(() => {
            e.target.style.transform = '';
        }, 150);
    }
});

// Add loading states and micro-interactions
document.addEventListener('click', function(e) {
    if (e.target.matches('.btn, .product-whatsapp-btn') || e.target.closest('.btn, .product-whatsapp-btn')) {
        const btn = e.target.matches('.btn, .product-whatsapp-btn') ? e.target : e.target.closest('.btn, .product-whatsapp-btn');
        
        // Add click animation
        btn.style.transform = 'scale(0.95)';
        setTimeout(() => {
            btn.style.transform = '';
        }, 150);
    }
});

// Handle window resize for responsive adjustments
window.addEventListener('resize', function() {
    // Adjust grid layout if needed
    const productsGrid = document.getElementById('productsGrid');
    if (window.innerWidth < 768) {
        productsGrid.style.gridTemplateColumns = 'repeat(2, 1fr)';
    } else if (window.innerWidth < 1024) {
        productsGrid.style.gridTemplateColumns = 'repeat(3, 1fr)';
    } else {
        productsGrid.style.gridTemplateColumns = 'repeat(4, 1fr)';
    }
});

// Add keyboard navigation support
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        // Close any open modals or reset states
        document.querySelectorAll('.loading').forEach(el => {
            el.classList.remove('loading');
        });
    }
});

// Performance optimization: Debounce scroll events
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Add scroll-based effects (optional)
const handleScroll = debounce(() => {
    const scrolled = window.pageYOffset;
    const rate = scrolled * -0.3;
    
    // Add subtle parallax to promo card
    const promoCard = document.querySelector('.promo-card');
    if (promoCard && scrolled < window.innerHeight) {
        promoCard.style.transform = `translateY(${rate}px)`;
    }
}, 10);

window.addEventListener('scroll', handleScroll);

// Initialize interactive elements
function initializeInteractiveElements() {
    // Add smooth scrolling for internal links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
    
    // Add focus states for accessibility
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Tab') {
            document.body.classList.add('keyboard-navigation');
        }
    });
    
    document.addEventListener('mousedown', function() {
        document.body.classList.remove('keyboard-navigation');
    });
}

// Call initialization when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeInteractiveElements);
} else {
    initializeInteractiveElements();
}

// Fixed: Setup hamburger menu functionality
function setupHamburgerMenu() {
    const hamburgerBtn = document.getElementById('hamburgerBtn');
    const mobileNav = document.getElementById('mobileNav');
    const mobileNavOverlay = document.getElementById('mobileNavOverlay');
    const closeNavBtn = document.getElementById('closeNavBtn');
    
    // Open menu
    hamburgerBtn.addEventListener('click', function() {
        mobileNav.classList.add('active');
        mobileNavOverlay.classList.add('active');
        document.body.style.overflow = 'hidden'; // Prevent background scrolling
        
        // Use GSAP animation
        animateHamburgerMenu(true);
        
        // Add haptic feedback on mobile
        if (navigator.vibrate) {
            navigator.vibrate(50);
        }
    });
    
    // Close menu function
    function closeMenu() {
        // Use GSAP animation
        animateHamburgerMenu(false);
        
        // Clean up after animation
        setTimeout(() => {
            mobileNav.classList.remove('active');
            mobileNavOverlay.classList.remove('active');
            document.body.style.overflow = ''; // Restore scrolling
        }, 400); // Reduced timeout for faster mobile experience
        
        // Add haptic feedback on mobile
        if (navigator.vibrate) {
            navigator.vibrate(30);
        }
    }
    
    // Close menu on close button click
    closeNavBtn.addEventListener('click', closeMenu);
    
    // Close menu on overlay click
    mobileNavOverlay.addEventListener('click', closeMenu);
    
    // Close menu on nav link click
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            setTimeout(closeMenu, 300); // Small delay for smooth transition
        });
    });
    
    // Close menu on escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && mobileNav.classList.contains('active')) {
            closeMenu();
        }
    });
}

// Fixed: Scroll to section function for navigation
function scrollToSection(sectionClass) {
    const section = document.querySelector(`.${sectionClass}`);
    if (section) {
        section.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }
}

// GSAP Animations - Enhanced for mobile performance
function initGSAPAnimations() {
    // Register ScrollTrigger plugin
    gsap.registerPlugin(ScrollTrigger);
    
    // Check if device is mobile for optimized animations
    const isMobile = window.innerWidth <= 768;
    
    // Ensure testimonials are visible on mobile as fallback
    if (isMobile) {
        gsap.set('.testimonial-card', { opacity: 1, visibility: 'visible' });
        gsap.set('.footer-content', { opacity: 1, visibility: 'visible' });
    }
    
    // Hero section entrance animation - optimized for mobile
    gsap.timeline()
        .from('.top-bar', {
            duration: isMobile ? 0.6 : 0.8,
            y: -50,
            opacity: 0,
            ease: 'power2.out'
        })
        .from('.promo-card', {
            duration: isMobile ? 0.8 : 1,
            y: isMobile ? 30 : 50,
            opacity: 0,
            scale: 0.98,
            ease: 'power2.out'
        }, '-=0.3')
        .from('.category-pills .category-pill', {
            duration: 0.5,
            y: 20,
            opacity: 0,
            stagger: 0.08,
            ease: 'power2.out'
        }, '-=0.5');
    
    // Product cards animation on scroll - mobile optimized
    gsap.set('.product-card', { opacity: 0, y: 30, scale: 0.95 });
    
    // Trust cards animation - reduced motion on mobile
    gsap.from('.trust-card', {
        scrollTrigger: {
            trigger: '.trust-section',
            start: 'top 85%',
            end: 'bottom 20%',
            toggleActions: 'play none none reverse'
        },
        duration: isMobile ? 0.6 : 0.8,
        y: isMobile ? 20 : 40,
        opacity: 0,
        stagger: isMobile ? 0.1 : 0.2,
        ease: 'power2.out'
    });
    
    // How it works section animation - simplified for mobile
    gsap.from('.step-card', {
        scrollTrigger: {
            trigger: '.how-it-works',
            start: 'top 85%',
            end: 'bottom 20%',
            toggleActions: 'play none none reverse'
        },
        duration: isMobile ? 0.6 : 0.8,
        y: isMobile ? 30 : 50,
        opacity: 0,
        stagger: isMobile ? 0.15 : 0.3,
        ease: isMobile ? 'power2.out' : 'back.out(1.7)'
    });
    
    // Testimonials scroll animation - mobile optimized with fallback
    if (isMobile) {
        // Simplified animation for mobile with immediate visibility
        gsap.set('.testimonial-card', { opacity: 1, x: 0 });
        gsap.from('.testimonial-card', {
            scrollTrigger: {
                trigger: '.testimonials',
                start: 'top 90%',
                end: 'bottom 20%',
                toggleActions: 'play none none none',
                onEnter: () => {
                    gsap.to('.testimonial-card', {
                        duration: 0.5,
                        opacity: 1,
                        x: 0,
                        stagger: 0.1,
                        ease: 'power2.out'
                    });
                }
            },
            duration: 0.5,
            x: 30,
            opacity: 0.3,
            stagger: 0.1,
            ease: 'power2.out'
        });
    } else {
        // Full animation for desktop
        gsap.from('.testimonial-card', {
            scrollTrigger: {
                trigger: '.testimonials',
                start: 'top 85%',
                end: 'bottom 20%',
                toggleActions: 'play none none reverse'
            },
            duration: 0.8,
            x: 100,
            opacity: 0,
            stagger: 0.15,
            ease: 'power2.out'
        });
    }
    
    // Footer animation - mobile optimized with fallback
    if (isMobile) {
        // Simplified animation for mobile with immediate visibility
        gsap.set('.footer-content', { opacity: 1, y: 0 });
        gsap.from('.footer-content', {
            scrollTrigger: {
                trigger: '.footer',
                start: 'top 95%',
                end: 'bottom 20%',
                toggleActions: 'play none none none',
                onEnter: () => {
                    gsap.to('.footer-content', {
                        duration: 0.4,
                        opacity: 1,
                        y: 0,
                        ease: 'power2.out'
                    });
                }
            },
            duration: 0.4,
            y: 15,
            opacity: 0.5,
            ease: 'power2.out'
        });
    } else {
        // Full animation for desktop
        gsap.from('.footer-content', {
            scrollTrigger: {
                trigger: '.footer',
                start: 'top 90%',
                end: 'bottom 20%',
                toggleActions: 'play none none reverse'
            },
            duration: 1,
            y: 20,
            opacity: 0,
            ease: 'power2.out'
        });
    }
    
    // Floating elements animation - reduced on mobile
    if (!isMobile) {
        gsap.to('.phone-mockup', {
            duration: 3,
            y: -10,
            rotation: 5,
            repeat: -1,
            yoyo: true,
            ease: 'power2.inOut'
        });
    }
    
    // Button hover animations - only on non-touch devices
    if (!('ontouchstart' in window)) {
        document.querySelectorAll('.btn-primary, .product-whatsapp-btn').forEach(btn => {
            btn.addEventListener('mouseenter', () => {
                gsap.to(btn, {
                    duration: 0.2,
                    scale: 1.03,
                    ease: 'power2.out'
                });
            });
            
            btn.addEventListener('mouseleave', () => {
                gsap.to(btn, {
                    duration: 0.2,
                    scale: 1,
                    ease: 'power2.out'
                });
            });
        });
    }
    
    // Category pill click animation - mobile optimized
    document.querySelectorAll('.category-pill').forEach(pill => {
        pill.addEventListener('click', () => {
            gsap.to(pill, {
                duration: 0.15,
                scale: 0.97,
                yoyo: true,
                repeat: 1,
                ease: 'power2.inOut'
            });
        });
    });
}

// Enhanced product card animation with GSAP - mobile optimized
function animateProductCards() {
    const cards = document.querySelectorAll('.product-card');
    const isMobile = window.innerWidth <= 768;
    
    gsap.to(cards, {
        duration: isMobile ? 0.6 : 0.8,
        opacity: 1,
        y: 0,
        scale: 1,
        stagger: isMobile ? 0.08 : 0.1,
        ease: isMobile ? 'power2.out' : 'back.out(1.7)',
        onComplete: () => {
            // Add scroll trigger for cards that might be below the fold
            cards.forEach(card => {
                ScrollTrigger.create({
                    trigger: card,
                    start: 'top 95%',
                    onEnter: () => {
                        gsap.to(card, {
                            duration: 0.4,
                            opacity: 1,
                            y: 0,
                            scale: 1,
                            ease: 'power2.out'
                        });
                    }
                });
            });
        }
    });
}

// Enhanced hamburger menu animations - mobile optimized
function animateHamburgerMenu(isOpening) {
    const nav = document.getElementById('mobileNav');
    const overlay = document.getElementById('mobileNavOverlay');
    const links = document.querySelectorAll('.nav-link');
    
    if (isOpening) {
        // Opening animation - faster for mobile
        gsap.timeline()
            .to(overlay, {
                duration: 0.2,
                opacity: 1,
                visibility: 'visible',
                ease: 'power2.out'
            })
            .to(nav, {
                duration: 0.3,
                right: 0,
                ease: 'power2.out'
            }, '-=0.1')
            .from(links, {
                duration: 0.3,
                x: 30,
                opacity: 0,
                stagger: 0.05,
                ease: 'power2.out'
            }, '-=0.15');
    } else {
        // Closing animation - faster for mobile
        gsap.timeline()
            .to(links, {
                duration: 0.15,
                x: 30,
                opacity: 0,
                stagger: 0.03,
                ease: 'power2.in'
            })
            .to(nav, {
                duration: 0.25,
                right: '-100%',
                ease: 'power2.in'
            }, '-=0.1')
            .to(overlay, {
                duration: 0.15,
                opacity: 0,
                visibility: 'hidden',
                ease: 'power2.in'
            }, '-=0.15');
    }
}

// Enhanced quantity change animation - mobile optimized
function animateQuantityChange(quantityDisplay) {
    const isMobile = window.innerWidth <= 768;
    
    gsap.timeline()
        .to(quantityDisplay, {
            duration: isMobile ? 0.15 : 0.2,
            scale: isMobile ? 1.2 : 1.3,
            color: '#25D366',
            ease: 'power2.out'
        })
        .to(quantityDisplay, {
            duration: isMobile ? 0.2 : 0.3,
            scale: 1,
            color: 'inherit',
            ease: 'power2.out'
        });
}

// Enhanced size selection animation - mobile optimized
function animateSizeSelection(sizeOption) {
    const isMobile = window.innerWidth <= 768;
    
    gsap.timeline()
        .to(sizeOption, {
            duration: 0.1,
            scale: 0.95,
            ease: 'power2.out'
        })
        .to(sizeOption, {
            duration: isMobile ? 0.2 : 0.3,
            scale: 1,
            ease: isMobile ? 'power2.out' : 'back.out(1.7)'
        });
}