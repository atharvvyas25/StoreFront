# Storefront - Modern WhatsApp Storefront

A clean, mobile-first WhatsApp Storefront template with modern app-style UI. Perfect for businesses wanting to showcase products and receive orders directly through WhatsApp.

## 🚀 Features

- **Mobile App-Style UI** - Modern, clean design that feels like a mobile app
- **WhatsApp Integration** - Direct ordering with pre-filled messages
- **Responsive Design** - Optimized for mobile, tablet, and desktop
- **Category Filtering** - Easy product browsing with category pills
- **GSAP Animations** - Smooth, professional animations
- **No Dependencies** - Pure HTML, CSS, and Vanilla JavaScript

## 📁 Project Structure

```
storefront/
├── index.html          # Main HTML structure
├── style.css           # Responsive CSS styles
├── script.js           # Interactive functionality
├── images/             # Product images folder
└── README.md           # Documentation
```

## 🛠️ Quick Setup

### 1. Update Business Information

Open `script.js` and modify the CONFIG object:

```javascript
const CONFIG = {
    whatsappNumber: '+15551234567',  // Your WhatsApp number
    businessName: 'Your Store Name', // Your business name
    currency: '$'                    // Your currency symbol
};
```

### 2. Add Your Products

In `script.js`, update the PRODUCTS array:

```javascript
const PRODUCTS = [
    {
        id: 1,
        name: 'Your Product Name',
        price: 29.99,
        category: 't-shirts', // 't-shirts', 'hoodies', 'custom'
        image: 'your-image.jpg', // Image filename in /images folder
        sizes: ['S', 'M', 'L', 'XL'],
        rating: 4.8
    }
    // Add more products...
];
```

### 3. Customize Colors

In `style.css`, update the CSS variables:

```css
:root {
    --primary-color: #007AFF;     /* Main brand color */
    --whatsapp-color: #25D366;    /* WhatsApp green */
    --text-primary: #1C1C1E;      /* Main text color */
    --background: #F8F9FA;        /* Background color */
}
```

### 4. Update Store Name

Replace "Storefront" with your business name in:
- `index.html` - Page title and content
- Footer section
- Any other mentions

## 📱 Mobile Features

### Responsive Design
- **Mobile-First** - Optimized for mobile devices
- **Touch-Friendly** - Large buttons and touch targets
- **Hamburger Menu** - Clean mobile navigation
- **Smooth Scrolling** - App-like scroll behavior

### Product Grid
- **2-Column Mobile** - Perfect for mobile screens
- **1-Column Small** - Adapts to very small screens
- **Flexible Desktop** - Auto-fit columns on larger screens

### Category Filtering
- **Horizontal Scroll** - Touch-friendly category pills
- **Active States** - Visual feedback for selections
- **Smooth Animations** - Professional transitions

## 🎨 Customization

### Adding Product Images

1. Add your images to the `/images` folder
2. Update the `image` property in PRODUCTS array:

```javascript
{
    id: 1,
    name: 'Cool T-Shirt',
    image: 'cool-tshirt.jpg', // Must match filename in /images
    // ... other properties
}
```

### Adding New Categories

1. Add products with new category names
2. Update category pills in HTML:

```html
<button class="category-pill" data-category="new-category">New Category</button>
```

### Changing Layout

Modify CSS grid for different layouts:

```css
.products-grid {
    grid-template-columns: repeat(3, 1fr); /* 3 columns */
    /* or */
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); /* Auto-fit */
}
```

## 📱 WhatsApp Integration

### How It Works

When customers click "Order":
1. WhatsApp opens automatically
2. Pre-filled message includes:
   - Product name and price
   - Selected size and quantity
   - Total amount
   - Professional greeting

### Message Format

```
Hi Storefront! 👋

I'd like to order:

🛍️ *Product Name*
💰 Price: $29.99
📏 Size: M
🔢 Quantity: 2
💵 Total: $59.98

Please confirm availability and delivery details. Thank you!
```

## 🚀 Deployment

### Netlify (Recommended)
1. Visit [netlify.com](https://netlify.com)
2. Drag your project folder to deploy
3. Your storefront is live instantly!

### Other Options
- **Vercel** - Similar drag & drop
- **GitHub Pages** - Free hosting via GitHub
- **Any Web Host** - Upload via FTP

## 🔧 Technical Details

### Browser Support
- Chrome (recommended)
- Safari
- Firefox
- Edge
- Mobile browsers

### Performance
- **Lightweight** - No heavy frameworks
- **Fast Loading** - Optimized CSS and JS
- **Smooth Animations** - GSAP for performance
- **Mobile Optimized** - Touch interactions

### Accessibility
- **Semantic HTML** - Screen reader friendly
- **Keyboard Navigation** - Full keyboard support
- **Color Contrast** - WCAG compliant colors
- **Touch Targets** - Minimum 44px touch areas

## 🐛 Troubleshooting

### WhatsApp Not Opening
- Check phone number format: `+1234567890`
- Test on mobile device
- Disable popup blockers

### Images Not Loading
- Verify image files are in `/images` folder
- Check filename spelling in PRODUCTS array
- Ensure proper file extensions (.jpg, .png, etc.)

### Hamburger Menu Not Working
- Check JavaScript console for errors
- Verify all menu elements exist in HTML
- Test on different devices

### Animations Not Working
- Ensure GSAP CDN is loading
- Check internet connection
- Fallback animations will work without GSAP

## 📊 Analytics & Tracking

### Adding Google Analytics

Add to `<head>` section:

```html
<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'GA_MEASUREMENT_ID');
</script>
```

### Tracking WhatsApp Clicks

Add event tracking to order buttons:

```javascript
function orderProduct(productId) {
    // Existing code...
    
    // Track order attempt
    if (typeof gtag !== 'undefined') {
        gtag('event', 'whatsapp_order', {
            'product_id': productId,
            'product_name': product.name
        });
    }
    
    // Open WhatsApp...
}
```

## 🔄 Updates & Maintenance

### Regular Updates
- Update product information in `script.js`
- Add new product images to `/images` folder
- Modify colors in CSS variables
- Update business information in CONFIG

### Version Control
- Use Git for tracking changes
- Backup before major updates
- Test changes on staging environment

---

**🎯 Ready to launch your modern WhatsApp storefront!**

This template provides everything you need for a professional, mobile-optimized storefront that converts visitors into WhatsApp customers.