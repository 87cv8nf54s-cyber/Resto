# Resto Template Field Mapping

This document explains how the Resto landing page template currently uses existing User fields and what new fields might be needed.

## Current Field Usage

### Hero Section
- `profilePicture` - Main hero image (restaurant photo)
- `logo` - Restaurant logo (displayed in hero)
- `companyName` - Restaurant name (main heading)
- `naam` - Fallback name if companyName not available
- `bio` - Short description shown in hero (optional)

### Over Ons (About Us) Section
- `bio` - Full restaurant description/story

### Impressie (Gallery) Section
**Current Implementation:**
- `profilePicture` - Gallery image 1
- `logo` - Gallery image 2

**Note:** Currently limited to 2 images. For a proper gallery, new fields are recommended:
- `galleryImages: string[]` - Array of image URLs for restaurant showcase

### Menu Section
**Current Implementation (Temporary):**
Using `workExperiences` array as menu items:
- `workExperiences[].company` → Dish name
- `workExperiences[].role` → Price or category
- `workExperiences[].description` → Dish description/ingredients

**Recommended New Fields:**
```typescript
interface MenuItem {
  id: string;
  name: string;           // Dish name
  category?: string;      // e.g., "Voorgerechten", "Hoofdgerechten", "Desserts"
  description?: string;   // Ingredients/description
  price?: string;         // Price (e.g., "€24.50")
  imageUrl?: string;      // Optional dish image
  dietaryInfo?: string[]; // e.g., ["Vegetarisch", "Glutenvrij"]
}
```

### Contact Gegevens (Contact Details) Section
- `address.street` - Street address
- `address.postalCode` - Postal code
- `address.city` - City
- `address.country` - Country
- `phoneNumber` - Phone number
- `companyEmail` - Email address
- `websiteUrl` - Website URL
- `linkedinUrl` - Social media link (repurposed for Instagram/Facebook)

**Note:** `linkedinUrl` is currently used for social media. Consider adding:
- `instagramUrl?: string`
- `facebookUrl?: string`

## Recommended New Fields for User Type

To fully support a restaurant landing page, consider adding:

```typescript
interface User {
  // ... existing fields ...
  
  // Restaurant-specific fields
  galleryImages?: string[];        // Array of image URLs for gallery
  menuItems?: MenuItem[];          // Menu items array
  openingHours?: OpeningHours;     // Opening hours
  instagramUrl?: string;           // Instagram link
  facebookUrl?: string;            // Facebook link
  reservationUrl?: string;         // Online reservation link
}

interface MenuItem {
  id: string;
  name: string;
  category?: string;
  description?: string;
  price?: string;
  imageUrl?: string;
  dietaryInfo?: string[];
}

interface OpeningHours {
  monday?: { open: string; close: string; closed?: boolean };
  tuesday?: { open: string; close: string; closed?: boolean };
  wednesday?: { open: string; close: string; closed?: boolean };
  thursday?: { open: string; close: string; closed?: boolean };
  friday?: { open: string; close: string; closed?: boolean };
  saturday?: { open: string; close: string; closed?: boolean };
  sunday?: { open: string; close: string; closed?: boolean };
}
```

## Current Limitations

1. **Gallery:** Limited to 2 images (profilePicture and logo)
2. **Menu:** Using workExperiences array as temporary solution - not ideal for menu structure
3. **Social Media:** Using linkedinUrl for Instagram - should have dedicated fields
4. **Opening Hours:** Not currently displayed - would need new field
5. **Reservations:** No dedicated reservation link field

## Migration Path

When new fields are added:
1. Update the User type definition
2. Update GraphQL queries to fetch new fields
3. Update RestoTemplate to use new fields instead of temporary mappings
4. Keep backward compatibility with existing field usage during transition
