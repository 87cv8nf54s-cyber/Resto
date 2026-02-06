import Link from 'next/link';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';

export default function PricingPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />

      <main className="flex-1">
        <section className="border-b bg-background">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 sm:pt-32 pb-12 sm:pb-16">
            <div className="text-center">
              <h1 className="text-4xl sm:text-6xl font-bold text-foreground mb-6">
                Eén prijs.
                <br />
                <span className="text-primary">Alles inbegrepen.</span>
              </h1>
              <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
                Geen kleine lettertjes of technische extra&apos;s.
                <br />
                Alles zit in één vast abonnement, jij houdt de regie.
              </p>
              
              {/* Feature bullets */}
              <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mt-8">
                <div className="flex items-center text-lg text-foreground">
                  <svg className="w-6 h-6 text-primary mr-3 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Geen webbouwer, geen extra kosten</span>
                </div>
                <div className="flex items-center text-lg text-foreground">
                  <svg className="w-6 h-6 text-primary mr-3 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Zelf beheren, direct aanpassen</span>
                </div>
                <div className="flex items-center text-lg text-foreground">
                  <svg className="w-6 h-6 text-primary mr-3 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Eén vaste prijs</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="pt-12 sm:pt-16 pb-12 sm:pb-16 bg-muted/50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-2xl mx-auto">
              <div className="bg-card rounded-lg border-2 border-primary shadow-md p-8 relative">
                <div className="mb-6">
                  <h3 className="text-2xl font-bold text-card-foreground mb-2">Eén prijs, alles inbegrepen</h3>
                  <p className="text-muted-foreground">Voor ZZP&apos;ers die hun online identiteit volledig in eigen hand willen nemen. Transparant, zonder verborgen kosten.</p>
                </div>
                <div className="mb-6">
                  <div className="flex items-baseline">
                    <span className="text-4xl font-bold text-card-foreground">€7,99</span>
                    <span className="text-muted-foreground ml-2">/maand</span>
                  </div>
                  <p className="text-sm text-muted-foreground mt-2">excl. BTW, maandelijks gefactureerd</p>
                </div>
                <ul className="space-y-3 mb-8">
                  <li className="flex items-start">
                    <svg className="w-5 h-5 text-primary mr-3 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-muted-foreground">Toegang tot 5 templates</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="w-5 h-5 text-primary mr-3 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-muted-foreground">6 accent kleuren</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="w-5 h-5 text-primary mr-3 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-muted-foreground">Website als subdomein</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="w-5 h-5 text-primary mr-3 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-muted-foreground">Onbeperkt aanpassen van website content en templates/kleuren</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="w-5 h-5 text-primary mr-3 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-muted-foreground">Optie tot eigen domein toevoegen</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="w-5 h-5 text-primary mr-3 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-muted-foreground">SSL certificaat inbegrepen</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="w-5 h-5 text-primary mr-3 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-muted-foreground">Ingericht om zelfstandig ondernemerschap te onderbouwen</span>
                  </li>
                </ul>
                <div className="flex flex-col sm:flex-row gap-3 mb-2">
                  <a href="#" className="flex-1 inline-flex items-center justify-center rounded-md bg-primary px-6 py-3 text-base font-medium text-primary-foreground shadow-sm transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2">
                    <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
                    </svg>
                    Download voor iOS
                  </a>
                  <a href="#" className="flex-1 inline-flex items-center justify-center rounded-md border border-input bg-background px-6 py-3 text-base font-medium shadow-sm transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2">
                    <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M3,20.5V3.5C3,2.91 3.34,2.39 3.84,2.15L13.69,12L3.84,21.85C3.34,21.6 3,21.09 3,20.5M16.81,15.12L6.05,21.34L14.54,12.85L16.81,15.12M20.16,10.81C20.5,11.08 20.75,11.5 20.75,12C20.75,12.5 20.5,12.92 20.16,13.19L17.19,15.45L14.54,12.85L17.19,10.25L20.16,10.81M6.05,2.66L16.81,8.88L14.54,11.15L6.05,2.66Z"/>
                    </svg>
                    Download voor Android
                  </a>
                </div>
                <p className="text-xs text-muted-foreground text-center">Sluit abonnement af in de app</p>
              </div>
            </div>
          </div>
        </section>

        <section className="py-12 sm:py-16 bg-muted/30">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <div className="bg-card rounded-lg border shadow-sm p-8">
                <h3 className="text-2xl font-bold text-card-foreground mb-4">
                  Nog niet overtuigd? Kijk eerst even mee.
                </h3>
                
                <p className="text-muted-foreground mb-6">
                  Download de app kosteloos en zie hoe een template eruitziet met <strong className="font-medium text-card-foreground">jouw eigen gegevens</strong>. Je gegevens worden live in de templates getoond.
                </p>
                
                <div>
                  <Link href="/templates" className="inline-flex items-center justify-center rounded-md border border-input bg-background px-6 py-3 text-base font-medium shadow-sm transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2">
                    Of bekijk de templates
                    <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </Link>
                </div>
              </div>
              <div className="bg-card rounded-lg border shadow-sm p-8">
                <h3 className="text-2xl font-bold text-card-foreground mb-4">
                  Vragen? We helpen je graag
                </h3>
                <p className="text-muted-foreground mb-6">
                  Wil je meer weten over hoe het werkt, wat er allemaal inbegrepen zit, of heb je vragen over je eigen domein? Bekijk onze veelgestelde vragen voor uitgebreide antwoorden.
                </p>
                <Link href="/faq" className="inline-flex items-center justify-center rounded-md border border-input bg-background px-6 py-3 text-base font-medium shadow-sm transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2">
                  Bekijk veelgestelde vragen
                  <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
