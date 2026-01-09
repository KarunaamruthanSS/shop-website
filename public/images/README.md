# Images Directory

## Payment Success Image

Please save your payment success image as `payment-success.jpg` in this directory.

### Steps to add your image:
1. Save your image file as `payment-success.jpg` (or `.png`, `.gif`, etc.)
2. Place it in the `/public/images/` directory
3. The image will automatically display when users click "Pay Now"

### Image Requirements:
- **Name**: `payment-success.jpg` (preferred) or `payment-success.png`
- **Format**: JPG, PNG, GIF, or other web-compatible format
- **Recommended size**: 800x600 pixels or similar aspect ratio
- **File size**: Keep under 2MB for fast loading

### Current Structure
```
/public/images/
├── payment-success.jpg     (place your image here)
├── payment-success.svg     (fallback placeholder)
└── README.md              (this file)
```

### How it works:
1. User clicks "Pay Now" button during checkout
2. Payment modal opens showing your image
3. Image displays for 3 seconds while processing
4. Order completes and redirects to success page

The system will try to load `payment-success.jpg` first, then fall back to the SVG placeholder if not found.