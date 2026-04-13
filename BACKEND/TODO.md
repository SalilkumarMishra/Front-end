# UI Fixes for Navbar and Hero Section

## Tasks

- [ ] Remove gap below logged-in user and logout in navbar
- [ ] Make "Learn More" button in hero section same size and style as "Shop Now" button

## Files to Edit

- fend/frontend/frontend/src/components/layout/Navbar.jsx
- fend/frontend/frontend/src/pages/shop/Home.jsx

## Plan

### Navbar Fix

- In Navbar.jsx, the logged-in user section has a <p> for username and a <button> for logout inside a div with "leading-tight text-sm".
- The gap is likely due to default line-height or margins. To remove it, add "mb-0" to the <p> and "mt-0" to the <button> to eliminate vertical spacing.

### Hero Section Fix

- In Home.jsx, the "Shop Now" button has classes for filled green background, white text, etc.
- The "Learn More" button has outlined style with green border and transparent background.
- To make "Learn More" like "Shop Now", change its className to match "Shop Now"'s styling: filled green background, white text, remove border-2, change colors accordingly.
- Also, remove the extra <span> wrapper and the mt-3 sm:mt-0 for consistent spacing.

## Dependent Files

- None

## Followup Steps

- Test the UI changes in the browser to ensure the gap is removed and buttons look identical.

---

# Add Images to Sale Banner and Background

## Tasks

- [x] Replace placeholder images in deal products with actual product images
- [x] Add AI-generated background image for the sale section that matches the theme

## Files to Edit

- fend/frontend/frontend/src/components/home/SpecialOfferSection.jsx

## Plan

### Product Images

- Replace the placeholder URLs in dealProducts array with actual images from assets: almonds.png, cashews.png, walnuts.png

### Background Image

- Change the section background from bg-[#fdf6e4] to a background-image with an AI-generated image related to dry fruits and nuts sale.
- Use a URL for an AI-generated image, e.g., from Unsplash or a generated one depicting nuts and a sale banner.

## Dependent Files

- None

## Followup Steps

- Test the sale section to ensure images load and background looks good.

---

# Add AI-Generated Images for All Products in Shop Section

## Tasks

- [x] Replace placeholder images in sampleProducts array with AI-generated images that match each product

## Files to Edit

- fend/frontend/frontend/src/pages/shop/Products.jsx

## Plan

### Product Images

- Replace the placeholder URLs in sampleProducts array with AI-generated images from Unsplash or similar sources that accurately represent each product (fruits, dry fruits, etc.)

## Dependent Files

- None

## Followup Steps

- Test the products page to ensure all images load correctly and match the products.
