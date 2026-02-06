# Resto Template - Menu Categories & Items Guide

This guide explains how to add categories and menu items to the Resto template.

## How It Works

The Resto template uses the existing User data structure to store menu information:
- **Categories** are stored in the `educations` array
- **Menu Items** are stored in the `workExperiences` array

## Adding Menu Categories

To add a new category (e.g., "Dranken", "Lunch", "Specials"):

1. Add a new entry to the `educations` array:
```typescript
{
  id: 'unique-id',
  institution: 'Category Name',  // e.g., "Dranken", "Lunch", "Specials"
  degree: '',  // Leave empty
}
```

**Example:**
```typescript
educations: [
  {
    id: '1',
    institution: 'Voorgerechten',
    degree: '',
  },
  {
    id: '2',
    institution: 'Hoofdgerechten',
    degree: '',
  },
  {
    id: '3',
    institution: 'Desserts',
    degree: '',
  },
  {
    id: '4',
    institution: 'Dranken',  // New category
    degree: '',
  },
]
```

## Adding Menu Items

To add a new menu item:

1. Add a new entry to the `workExperiences` array:
```typescript
{
  id: 'unique-id',
  company: 'Dish Name',        // Name of the dish
  role: '€Price',              // Price (e.g., "€14.50")
  description: 'Description',  // Dish description/ingredients
  startDate: 'Category Name',  // Must match one of the category names from educations
}
```

**Example:**
```typescript
workExperiences: [
  {
    id: '1',
    company: 'Margherita Pizza',
    role: '€14.50',
    description: 'Verse tomaten, mozzarella, basilicum en extra vierge olijfolie',
    startDate: 'Hoofdgerechten',  // Category must match educations institution
  },
  {
    id: '2',
    company: 'Espresso',
    role: '€2.50',
    description: 'Sterke Italiaanse espresso',
    startDate: 'Dranken',  // Category must match educations institution
  },
]
```

## Important Notes

1. **Category Matching**: The `startDate` field in menu items must exactly match the `institution` field in one of the categories (educations).

2. **Category Order**: Categories appear in the order they are listed in the `educations` array.

3. **Menu Item Order**: Menu items appear in the order they are listed in the `workExperiences` array.

4. **Filtering**: When users click a category button, only menu items with matching `startDate` will be displayed.

## Example: Complete Setup

```typescript
const restoUser: User = {
  // ... other user fields ...
  
  // Categories
  educations: [
    { id: '1', institution: 'Voorgerechten', degree: '' },
    { id: '2', institution: 'Hoofdgerechten', degree: '' },
    { id: '3', institution: 'Desserts', degree: '' },
    { id: '4', institution: 'Dranken', degree: '' },
  ],
  
  // Menu Items
  workExperiences: [
    // Voorgerechten items
    {
      id: '1',
      company: 'Bruschetta',
      role: '€8.90',
      description: 'Geroosterd brood met verse tomaten',
      startDate: 'Voorgerechten',
    },
    // Hoofdgerechten items
    {
      id: '2',
      company: 'Pizza Margherita',
      role: '€14.50',
      description: 'Verse tomaten en mozzarella',
      startDate: 'Hoofdgerechten',
    },
    // Desserts items
    {
      id: '3',
      company: 'Tiramisu',
      role: '€9.50',
      description: 'Huisgemaakte tiramisu',
      startDate: 'Desserts',
    },
    // Dranken items
    {
      id: '4',
      company: 'Espresso',
      role: '€2.50',
      description: 'Sterke Italiaanse espresso',
      startDate: 'Dranken',
    },
  ],
};
```

## Current Menu Items

The template now includes:
- **Voorgerechten**: 5 items
- **Hoofdgerechten**: 7 items
- **Desserts**: 4 items
- **Dranken**: 5 items

**Total: 21 menu items across 4 categories**

## Future Enhancements

When dedicated restaurant fields are added to the User type, the template can be updated to use:
- `menuCategories: MenuCategory[]`
- `menuItems: MenuItem[]`

Until then, the current structure works perfectly for managing categories and menu items dynamically.
