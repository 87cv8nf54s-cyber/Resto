# Template Fields Documentation

This document lists all the fields from the `User` type that are currently displayed across all templates.

## User Type Fields Available

### Basic Information
- `naam` (string) - User's name - **Used in all templates**
- `bio` (string, optional) - User biography/description - **Used in all templates**
- `profilePicture` (string, optional) - Profile picture URL - **Used in all templates**
- `logo` (string, optional) - Company logo URL - **Used in some templates**

### Company Information
- `companyName` (string, optional) - Company name - **Used in all templates**
- `companyEmail` (string, optional) - Company email - **Used in all templates**
- `kvkNumber` (string, optional) - Chamber of Commerce number - **Used in Business, Hero, Portfolio, Resto templates**

### Contact Information
- `companyEmail` (string, optional) - Email address - **Used in all templates**
- `phoneNumber` (string, optional) - Phone number - **Used in all templates**
- `linkedinUrl` (string, optional) - LinkedIn profile URL - **Used in all templates**
- `websiteUrl` (string, optional) - Website URL - **Available but rarely used**

### Location Information
- `address` (Address object, optional) - Address information
  - `city` (string, optional) - **Used in all templates**
  - `country` (string, optional) - **Used in all templates**
  - `street` (string, optional) - **Not commonly used**
  - `postalCode` (string, optional) - **Not commonly used**

### Work Experience
- `workExperiences` (WorkExperience[], optional) - Array of work experiences
  - `id` (string) - Unique identifier
  - `company` (string) - Company name - **Used in all templates**
  - `role` (string, optional) - Job title/role - **Used in all templates**
  - `description` (string, optional) - Job description - **Used in all templates**
  - `startDate` (string, optional) - Start date - **Used in all templates**
  - `endDate` (string, optional) - End date - **Used in all templates**
  - `current` (boolean, optional) - Whether currently employed - **Used in all templates**

### Education
- `educations` (Education[], optional) - Array of education entries
  - `id` (string) - Unique identifier
  - `institution` (string) - School/institution name - **Used in all templates**
  - `degree` (string) - Degree obtained - **Used in all templates**
  - `field` (string, optional) - Field of study - **Used in Creative, Business, Hero, Portfolio, Resto templates**
  - `startDate` (string, optional) - Start date - **Used in all templates**
  - `endDate` (string, optional) - End date - **Used in all templates**
  - `description` (string, optional) - Additional description - **Not commonly used**
  - `diplomaObtained` (boolean, optional) - **Not commonly used**

### Certifications
- `certifications` (Certification[], optional) - Array of certifications
  - `id` (string) - Unique identifier
  - `name` (string) - Certification name - **Used in all templates**
  - `issuer` (string, optional) - Issuing organization - **Used in Business, Hero, Portfolio, Resto templates**
  - `startDate` (string, optional) - Start date - **Used in Business, Hero, Portfolio, Resto templates**
  - `endDate` (string, optional) - End date - **Used in Business, Hero, Portfolio, Resto templates**
  - `description` (string, optional) - **Not commonly used**

### Settings (Not Displayed in Templates)
- `id` (string) - User ID
- `email` (string) - User email
- `username` (string) - Username/slug
- `isPublished` (boolean, optional) - Publication status
- `templateStyle` (TemplateStyle, optional) - Selected template
- `colorTheme` (ColorTheme, optional) - Selected color theme
- `createdAt` (string, optional) - Creation timestamp
- `updatedAt` (string, optional) - Update timestamp

## Template-Specific Field Usage

### Creative Template
- Uses all common fields
- Shows education count in stats
- Displays field of study for education

### Minimalist Template
- Uses all common fields
- More compact display

### Business Template
- Uses all common fields
- Emphasizes company details (KvK number)
- Shows certification issuer and dates

### Hero Template
- Uses all common fields
- Dark theme with accent colors
- Shows certification issuer and dates
- Expandable work experience descriptions

### Portfolio Template
- Uses all common fields
- Shows education field
- Shows certification issuer and dates
- More visual/artistic layout

### Resto Template (New)
- Uses all common fields
- Shows education field
- Shows certification issuer and dates
- Hero image layout suitable for restaurant/food business

## Summary

**Most Commonly Used Fields:**
1. `naam` - Name
2. `bio` - Biography
3. `profilePicture` - Profile picture
4. `companyName` - Company name
5. `companyEmail` - Email
6. `phoneNumber` - Phone
7. `linkedinUrl` - LinkedIn
8. `workExperiences` - Work history
9. `educations` - Education
10. `certifications` - Certifications
11. `address.city` and `address.country` - Location

**Less Commonly Used Fields:**
- `websiteUrl` - Website URL
- `logo` - Company logo
- `address.street` and `address.postalCode` - Full address details
- Education `description` and `diplomaObtained`
- Certification `description`
