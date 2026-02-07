'use client';

import { SushiTemplate } from '@/components/templates/SushiTemplate';
import { mockUser } from '@/app/data/mockUser';
import { getThemeCSSVariables } from '@/lib/themes';
import type { User } from '@/types/user';

export default function SushiTemplatePage() {
  // Create sushi restaurant-focused mock data
  const sushiUser: User = {
    ...mockUser,
    companyName: 'Zen Sushi',
    naam: 'Zen Sushi',
    bio: 'Authentieke Japanse smaken, minimalistisch gepresenteerd. Bij Zen Sushi combineren we traditionele technieken met verse ingrediënten om de perfecte sushi-ervaring te creëren.',
    profilePicture: '/profile.png',
    logo: '/Sushi/SUHI.png',
    phoneNumber: '+31 20 987 6543',
    companyEmail: 'info@zensushi.nl',
    address: {
      street: 'Keizersgracht 456',
      city: 'Amsterdam',
      postalCode: '1017 DK',
      country: 'Nederland',
    },
    linkedinUrl: 'https://instagram.com/zensushi',
    websiteUrl: 'https://zensushi.nl',
    // Menu items (using workExperiences)
    // Users can add menu items by creating workExperiences with:
    // - company: dish name
    // - role: price
    // - description: dish description
    // - startDate: category name (must match one of the categories in educations)
    workExperiences: [
      // Nigiri
      {
        id: '1',
        company: 'Maguro Nigiri',
        role: '€4.50',
        description: 'Verse tonijn met rijst en wasabi',
        startDate: 'Nigiri',
      },
      {
        id: '2',
        company: 'Sake Nigiri',
        role: '€4.00',
        description: 'Zalm met rijst en wasabi',
        startDate: 'Nigiri',
      },
      {
        id: '3',
        company: 'Ebi Nigiri',
        role: '€3.50',
        description: 'Gekookte garnaal met rijst',
        startDate: 'Nigiri',
      },
      {
        id: '4',
        company: 'Unagi Nigiri',
        role: '€5.00',
        description: 'Gegrilde paling met zoete saus',
        startDate: 'Nigiri',
      },
      {
        id: '5',
        company: 'Tamago Nigiri',
        role: '€3.00',
        description: 'Zoete Japanse omelet',
        startDate: 'Nigiri',
      },
      // Maki Rolls
      {
        id: '6',
        company: 'California Roll',
        role: '€8.50',
        description: 'Krab, avocado en komkommer',
        startDate: 'Maki Rolls',
      },
      {
        id: '7',
        company: 'Spicy Tuna Roll',
        role: '€9.50',
        description: 'Pittige tonijn met sriracha',
        startDate: 'Maki Rolls',
      },
      {
        id: '8',
        company: 'Dragon Roll',
        role: '€12.00',
        description: 'Gegrilde paling, avocado en komkommer',
        startDate: 'Maki Rolls',
      },
      {
        id: '9',
        company: 'Rainbow Roll',
        role: '€11.50',
        description: 'California roll met gemengde vis',
        startDate: 'Maki Rolls',
      },
      {
        id: '10',
        company: 'Philadelphia Roll',
        role: '€9.00',
        description: 'Zalm, roomkaas en komkommer',
        startDate: 'Maki Rolls',
      },
      // Sashimi
      {
        id: '11',
        company: 'Sashimi Assortiment',
        role: '€18.00',
        description: 'Selectie van 9 stukken verse vis',
        startDate: 'Sashimi',
      },
      {
        id: '12',
        company: 'Maguro Sashimi',
        role: '€14.00',
        description: '5 stukken verse tonijn',
        startDate: 'Sashimi',
      },
      {
        id: '13',
        company: 'Sake Sashimi',
        role: '€12.00',
        description: '5 stukken verse zalm',
        startDate: 'Sashimi',
      },
      {
        id: '14',
        company: 'Hamachi Sashimi',
        role: '€15.00',
        description: '5 stukken verse geelstaart',
        startDate: 'Sashimi',
      },
      // Special Rolls
      {
        id: '15',
        company: 'Zen Special Roll',
        role: '€16.00',
        description: 'Tonijn, zalm, avocado en speciale saus',
        startDate: 'Special Rolls',
      },
      {
        id: '16',
        company: 'Volcano Roll',
        role: '€15.50',
        description: 'Gegrilde vis met spicy mayo',
        startDate: 'Special Rolls',
      },
      {
        id: '17',
        company: 'Caterpillar Roll',
        role: '€14.00',
        description: 'Gegrilde paling met avocado',
        startDate: 'Special Rolls',
      },
      // Sets
      {
        id: '18',
        company: 'Zen Set',
        role: '€28.00',
        description: '8 nigiri, 6 maki rolls en miso soep',
        startDate: 'Sets',
      },
      {
        id: '19',
        company: 'Deluxe Set',
        role: '€45.00',
        description: '12 nigiri, 8 maki rolls, sashimi en soep',
        startDate: 'Sets',
      },
      {
        id: '20',
        company: 'Chef\'s Omakase',
        role: '€65.00',
        description: 'Chef\'s selectie van 15 stukken',
        startDate: 'Sets',
      },
      // Sides & Soups
      {
        id: '21',
        company: 'Miso Soep',
        role: '€4.50',
        description: 'Traditionele miso soep met tofu en zeewier',
        startDate: 'Sides & Soups',
      },
      {
        id: '22',
        company: 'Edamame',
        role: '€5.50',
        description: 'Gezouten sojabonen',
        startDate: 'Sides & Soups',
      },
      {
        id: '23',
        company: 'Gyoza',
        role: '€7.50',
        description: '6 stuks gestoomde dumplings',
        startDate: 'Sides & Soups',
      },
      {
        id: '24',
        company: 'Tempura Mix',
        role: '€9.50',
        description: 'Gefrituurde groenten en garnaal',
        startDate: 'Sides & Soups',
      },
    ],
    // Menu categories (using educations)
    // Users can add new categories by creating educations with:
    // - institution: category name (e.g., "Nigiri", "Maki Rolls", "Sashimi", etc.)
    // Menu items will automatically be grouped under these categories
    educations: [
      {
        id: '1',
        institution: 'Nigiri',
        degree: '',
      },
      {
        id: '2',
        institution: 'Maki Rolls',
        degree: '',
      },
      {
        id: '3',
        institution: 'Sashimi',
        degree: '',
      },
      {
        id: '4',
        institution: 'Special Rolls',
        degree: '',
      },
      {
        id: '5',
        institution: 'Sets',
        degree: '',
      },
      {
        id: '6',
        institution: 'Sides & Soups',
        degree: '',
      },
    ],
    // Awards/Certifications (using certifications)
    certifications: [
      {
        id: '1',
        name: 'Beste Sushi Restaurant',
        issuer: 'Amsterdam Food Awards 2023',
      },
      {
        id: '2',
        name: '5 Sterren',
        issuer: 'Michelin Guide',
      },
      {
        id: '3',
        name: 'Authentic Japanese Cuisine',
        issuer: 'Japan Culinary Association',
      },
      {
        id: '4',
        name: 'Chef\'s Choice',
        issuer: 'Dutch Restaurant Guide',
      },
    ],
    templateStyle: 'sushi' as const,
    colorTheme: 'beige' as const,
  };

  const themeVariables = getThemeCSSVariables('beige');
  const style = Object.entries(themeVariables).reduce(
    (acc, [key, value]) => ({ ...acc, [key]: value }),
    {} as React.CSSProperties
  );

  return (
    <div className="template-sushi" style={style}>
      <SushiTemplate user={sushiUser} />
    </div>
  );
}
