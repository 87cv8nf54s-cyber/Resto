'use client';

import { ThaiTemplate } from '@/components/templates/ThaiTemplate';
import { mockUser } from '@/app/data/mockUser';
import { getThemeCSSVariables } from '@/lib/themes';
import type { User } from '@/types/user';

export default function ThaiTemplatePage() {
  // Create Thai restaurant-focused mock data
  const thaiUser: User = {
    ...mockUser,
    companyName: 'Thai Garden',
    naam: 'Thai Garden',
    bio: 'Authentieke Thaise smaken, vers bereid met passie. Bij Thai Garden combineren we traditionele recepten met verse ingrediënten om uitzonderlijke culinaire ervaringen te creëren.',
    profilePicture: '/profile.png',
    logo: '/Thai/LogoTHAI.png',
    phoneNumber: '+31 20 123 4567',
    companyEmail: 'info@thaigarden.nl',
    address: {
      street: 'Damrak 123',
      city: 'Amsterdam',
      postalCode: '1012 LG',
      country: 'Nederland',
    },
    linkedinUrl: 'https://instagram.com/thaigarden',
    websiteUrl: 'https://thaigarden.nl',
    // Menu items (using workExperiences)
    workExperiences: [
      // Voorgerechten
      {
        id: '1',
        company: 'Tom Yum Goong',
        role: '€8.50',
        description: 'Pittige en zure garnalensoep met citroengras, kaffir limoenblad en chili',
        startDate: 'Voorgerechten',
      },
      {
        id: '2',
        company: 'Som Tam',
        role: '€7.50',
        description: 'Thaise papaya salade met pinda\'s, tomaat en limoen',
        startDate: 'Voorgerechten',
      },
      {
        id: '3',
        company: 'Spring Rolls',
        role: '€6.50',
        description: 'Knapperige loempia\'s gevuld met groenten en kip',
        startDate: 'Voorgerechten',
      },
      // Hoofdgerechten
      {
        id: '4',
        company: 'Pad Thai',
        role: '€14.50',
        description: 'Klassieke Thaise roerbaknoedels met kip, garnalen, taugé en pinda\'s',
        startDate: 'Hoofdgerechten',
      },
      {
        id: '5',
        company: 'Green Curry',
        role: '€15.50',
        description: 'Pittige groene curry met kip, aubergine en Thaise basilicum',
        startDate: 'Hoofdgerechten',
      },
      {
        id: '6',
        company: 'Massaman Curry',
        role: '€16.50',
        description: 'Milde curry met rundvlees, aardappel en pinda\'s',
        startDate: 'Hoofdgerechten',
      },
      {
        id: '7',
        company: 'Pad Krapow',
        role: '€13.50',
        description: 'Geroerbakte kip met Thaise basilicum, chili en rijst',
        startDate: 'Hoofdgerechten',
      },
      {
        id: '8',
        company: 'Pad See Ew',
        role: '€14.00',
        description: 'Brede rijstnoedels met kip, Chinese broccoli en donkere sojasaus',
        startDate: 'Hoofdgerechten',
      },
      // Vegetarisch
      {
        id: '9',
        company: 'Vegetarische Pad Thai',
        role: '€13.50',
        description: 'Klassieke Pad Thai met tofu en groenten',
        startDate: 'Vegetarisch',
      },
      {
        id: '10',
        company: 'Vegetarische Curry',
        role: '€14.50',
        description: 'Groene curry met groenten en tofu',
        startDate: 'Vegetarisch',
      },
      // Desserts
      {
        id: '11',
        company: 'Mango Sticky Rice',
        role: '€7.50',
        description: 'Zoete kleefrijst met verse mango en kokosmelk',
        startDate: 'Desserts',
      },
      {
        id: '12',
        company: 'Coconut Ice Cream',
        role: '€6.50',
        description: 'Huisgemaakt kokosijs met pinda\'s',
        startDate: 'Desserts',
      },
    ],
    // Menu categories (using educations)
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
        institution: 'Vegetarisch',
        degree: '',
      },
      {
        id: '4',
        institution: 'Desserts',
        degree: '',
      },
    ],
    templateStyle: 'thai' as const,
    colorTheme: 'red' as const,
  };

  const themeVariables = getThemeCSSVariables('red');
  const style = Object.entries(themeVariables).reduce(
    (acc, [key, value]) => ({ ...acc, [key]: value }),
    {} as React.CSSProperties
  );

  return (
    <div className="template-thai" style={style}>
      <ThaiTemplate user={thaiUser} />
    </div>
  );
}
