import { Profile } from '@/types/profile';

export const mockProfile: Profile = {
  name: 'Jan van der Berg',
  company: {
    name: 'Van der Berg Consultancy',
    kvk: '12345678',
    btw: 'NL123456789B01',
    location: 'Amsterdam, Nederland',
  },
  bio: 'Ervaren consultant met meer dan 15 jaar expertise in strategisch advies en digitale transformatie. Gespecialiseerd in het begeleiden van middelgrote en grote organisaties bij complexe veranderingsprocessen. Focus op duurzame groei, innovatie en het creëren van waarde voor stakeholders. Gepassioneerd over het verbinden van technologie en business om tastbare resultaten te behalen.',
  education: [
    'Master of Business Administration (MBA) - Rotterdam School of Management',
    'Bachelor Bedrijfskunde - Universiteit van Amsterdam',
    'Certified Scrum Master (CSM)',
  ],
  photo: '/api/placeholder/400/400',
  logo: '/api/placeholder/200/100',
  contact: {
    email: 'jan.vanderberg@example.com',
    linkedIn: 'https://www.linkedin.com/in/janvanderberg',
    location: 'Amsterdam, Nederland',
    phone: '+31 6 12345678',
    website: 'https://www.vanderbergconsultancy.nl',
  },
  portfolio: [
    {
      companyName: 'TechCorp International',
      description: 'Leidinggevende rol bij digitale transformatie van legacy systemen naar cloud-gebaseerde oplossingen. Begeleiding van een team van 25 professionals en coördinatie met internationale stakeholders. Resultaat: 40% kostenreductie en verbeterde schaalbaarheid.',
      startDate: '2022-01',
      endDate: null,
      linkedInUrl: 'https://www.linkedin.com/company/techcorp',
    },
    {
      companyName: 'GreenEnergy Solutions',
      description: 'Strategisch advies voor duurzaamheidsinitiatieven en implementatie van ESG-rapportage. Ontwikkeling van roadmap voor koolstofneutraliteit in 2030. Training van managementteam en opzetten van monitoring framework.',
      startDate: '2020-06',
      endDate: '2021-12',
      linkedInUrl: 'https://www.linkedin.com/company/greenenergy',
    },
    {
      companyName: 'FinanceHub BV',
      description: 'Herstructurering van financiële processen en implementatie van nieuwe ERP-systemen. Begeleiding van change management traject en training van gebruikers. Focus op automatisering en efficiëntieverbetering.',
      startDate: '2018-03',
      endDate: '2020-05',
      linkedInUrl: 'https://www.linkedin.com/company/financehub',
    },
    {
      companyName: 'RetailMax Group',
      description: 'Ontwikkeling van omnichannel strategie en implementatie van nieuwe e-commerce platform. Analyse van klantreis en optimalisatie van conversie. Resultaat: 60% groei in online omzet binnen eerste jaar.',
      startDate: '2016-09',
      endDate: '2018-02',
      linkedInUrl: 'https://www.linkedin.com/company/retailmax',
    },
  ],
};
