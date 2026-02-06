'use client';

import { RestoTemplate } from '@/components/templates/RestoTemplate';
import { mockUser } from '@/app/data/mockUser';
import { getThemeCSSVariables } from '@/lib/themes';
import type { User } from '@/types/user';

export default function RestoTemplatePage() {
  // Create restaurant-focused mock data
  const restoUser: User = {
    ...mockUser,
    companyName: 'La Bella Vista',
    naam: 'La Bella Vista',
    bio: 'Bij La Bella Vista combineren we authentieke Italiaanse tradities met moderne culinaire technieken. Onze passie voor verse ingrediënten en ambachtelijke bereiding komt terug in elk gerecht. Geniet van een onvergetelijke culinaire ervaring in het hart van Amsterdam.',
    profilePicture: '/profile.png',
    logo: '/logo.png',
    phoneNumber: '+31 20 123 4567',
    companyEmail: 'info@labellavista.nl',
    address: {
      street: 'Prinsengracht 123',
      city: 'Amsterdam',
      postalCode: '1015 GC',
      country: 'Nederland',
    },
    linkedinUrl: 'https://instagram.com/labellavista',
    websiteUrl: 'https://labellavista.nl',
    // Menu items (using workExperiences)
    // Users can add menu items by creating workExperiences with:
    // - company: dish name
    // - role: price
    // - description: dish description
    // - startDate: category name (must match one of the categories in educations)
    workExperiences: [
      // Voorgerechten
      {
        id: '1',
        company: 'Bruschetta Classica',
        role: '€8.90',
        description: 'Geroosterd brood met verse tomaten, knoflook, basilicum en extra vierge olijfolie',
        startDate: 'Voorgerechten',
      },
      {
        id: '2',
        company: 'Antipasto Misto',
        role: '€12.50',
        description: 'Selectie van Italiaanse vleeswaren, kaas, olijven en gegrilde groenten',
        startDate: 'Voorgerechten',
      },
      {
        id: '3',
        company: 'Carpaccio di Manzo',
        role: '€14.90',
        description: 'Dun gesneden rauwe ossenhaas met rucola, Parmezaanse kaas en truffelolie',
        startDate: 'Voorgerechten',
      },
      {
        id: '4',
        company: 'Burrata Caprese',
        role: '€13.50',
        description: 'Verse burrata met tomaten, basilicum en balsamico glaze',
        startDate: 'Voorgerechten',
      },
      {
        id: '5',
        company: 'Arancini Siciliani',
        role: '€9.50',
        description: 'Gefrituurde risotto balletjes gevuld met mozzarella en ragù',
        startDate: 'Voorgerechten',
      },
      // Hoofdgerechten
      {
        id: '6',
        company: 'Margherita Pizza',
        role: '€14.50',
        description: 'Verse tomaten, mozzarella, basilicum en extra vierge olijfolie',
        startDate: 'Hoofdgerechten',
      },
      {
        id: '7',
        company: 'Truffel Risotto',
        role: '€24.90',
        description: 'Romige risotto met zwarte truffel en Parmezaanse kaas',
        startDate: 'Hoofdgerechten',
      },
      {
        id: '8',
        company: 'Osso Buco alla Milanese',
        role: '€28.50',
        description: 'Traditioneel gestoofd kalfsvlees met saffraan risotto',
        startDate: 'Hoofdgerechten',
      },
      {
        id: '9',
        company: 'Lasagne della Casa',
        role: '€18.90',
        description: 'Huisgemaakte lasagne met ragù, bechamelsaus en Parmezaanse kaas',
        startDate: 'Hoofdgerechten',
      },
      {
        id: '10',
        company: 'Tagliatelle al Tartufo',
        role: '€22.50',
        description: 'Verse tagliatelle met zwarte truffel, boter en Parmezaanse kaas',
        startDate: 'Hoofdgerechten',
      },
      {
        id: '11',
        company: 'Branzino al Forno',
        role: '€26.90',
        description: 'Gegrilde zeebaars met citroen, kruiden en gegrilde groenten',
        startDate: 'Hoofdgerechten',
      },
      {
        id: '12',
        company: 'Bistecca alla Fiorentina',
        role: '€42.00',
        description: 'Gegrilde T-bone steak (800g) met kruiden en olijfolie',
        startDate: 'Hoofdgerechten',
      },
      // Desserts
      {
        id: '13',
        company: 'Tiramisu',
        role: '€9.50',
        description: 'Huisgemaakte tiramisu met espresso en mascarpone',
        startDate: 'Desserts',
      },
      {
        id: '14',
        company: 'Panna Cotta',
        role: '€8.50',
        description: 'Vanille panna cotta met verse bessen en frambozensaus',
        startDate: 'Desserts',
      },
      {
        id: '15',
        company: 'Cannoli Siciliani',
        role: '€9.90',
        description: 'Gevulde cannoli met ricotta, chocolade en pistachenoten',
        startDate: 'Desserts',
      },
      {
        id: '16',
        company: 'Gelato della Casa',
        role: '€7.50',
        description: 'Drie bollen huisgemaakt ijs (vanille, chocolade, pistache)',
        startDate: 'Desserts',
      },
      // Dranken
      {
        id: '17',
        company: 'Espresso',
        role: '€2.50',
        description: 'Sterke Italiaanse espresso',
        startDate: 'Dranken',
      },
      {
        id: '18',
        company: 'Cappuccino',
        role: '€3.50',
        description: 'Espresso met gestoomde melk en melkschuim',
        startDate: 'Dranken',
      },
      {
        id: '19',
        company: 'Chianti Classico',
        role: '€28.00',
        description: 'Glas Italiaanse rode wijn (per fles)',
        startDate: 'Dranken',
      },
      {
        id: '20',
        company: 'Prosecco',
        role: '€32.00',
        description: 'Italiaanse mousserende wijn (per fles)',
        startDate: 'Dranken',
      },
      {
        id: '21',
        company: 'Aperol Spritz',
        role: '€8.50',
        description: 'Aperol, prosecco en soda met schijfje sinaasappel',
        startDate: 'Dranken',
      },
    ],
    // Menu categories (using educations)
    // Users can add new categories by creating educations with:
    // - institution: category name (e.g., "Voorgerechten", "Hoofdgerechten", "Desserts", "Dranken")
    // Menu items will automatically be grouped under these categories
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
        institution: 'Dranken',
        degree: '',
      },
    ],
    templateStyle: 'resto' as const,
    colorTheme: 'beige' as const,
  };

  const themeVariables = getThemeCSSVariables('beige');
  const style = Object.entries(themeVariables).reduce(
    (acc, [key, value]) => ({ ...acc, [key]: value }),
    {} as React.CSSProperties
  );

  return (
    <div className="template-resto" style={style}>
      <RestoTemplate user={restoUser} />
    </div>
  );
}
