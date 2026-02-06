import Link from 'next/link';
import Image from 'next/image';
import Navigation from './components/Navigation';
import Footer from './components/Footer';

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />

      <main className="flex-1">
        <section className="relative border-b overflow-hidden">
          {/* Gradient Background with animated particles */}
          <div className="absolute inset-0 bg-gradient-to-b from-blue-950 via-blue-900 to-black">
            {/* Animated particles effect */}
            <div className="absolute inset-0">
              <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl animate-pulse"></div>
              <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-blue-400/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
              <div className="absolute bottom-1/4 left-1/3 w-96 h-96 bg-blue-600/15 rounded-full blur-3xl animate-pulse delay-2000"></div>
            </div>
            {/* Grid pattern overlay */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
          </div>
          
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32 sm:py-40">
            <div className="text-center">
              {/* Main Headline */}
              <h1 className="text-5xl sm:text-7xl lg:text-8xl font-bold text-white mb-6 leading-tight tracking-tight">
                Je professionele
                <br />
                <span className="bg-gradient-to-r from-blue-400 via-blue-300 to-blue-500 bg-clip-text text-transparent">
                  website in minuten
                </span>
              </h1>
              
              {/* Subheadline */}
              <p className="text-xl sm:text-2xl text-gray-300 mb-12 max-w-3xl mx-auto leading-relaxed font-light">
                Laat zien dat je zelfstandig onderneemt.
                <br />
                Snel online met je zzp website, zonder verborgen kosten en volledig in eigen regie.
              </p>
              
              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-6">
                <a 
                  href="#" 
                  className="inline-flex items-center justify-center rounded-lg bg-white text-black px-6 py-3 text-sm font-medium shadow-xl transition-all hover:bg-gray-100 hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-blue-950"
                >
                  <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
                  </svg>
                  Download voor iOS
                </a>
                <a 
                  href="#" 
                  className="inline-flex items-center justify-center rounded-lg bg-white text-black px-6 py-3 text-sm font-medium shadow-xl transition-all hover:bg-gray-100 hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-blue-950"
                >
                  <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M3,20.5V3.5C3,2.91 3.34,2.39 3.84,2.15L13.69,12L3.84,21.85C3.34,21.6 3,21.09 3,20.5M16.81,15.12L6.05,21.34L14.54,12.85L16.81,15.12M20.16,10.81C20.5,11.08 20.75,11.5 20.75,12C20.75,12.5 20.5,12.92 20.16,13.19L17.19,15.45L14.54,12.85L17.19,10.25L20.16,10.81M6.05,2.66L16.81,8.88L14.54,11.15L6.05,2.66Z"/>
                  </svg>
                  Download voor Android
                </a>
              </div>
              
              {/* Secondary link */}
              <p className="text-sm text-gray-400 mt-6">
                Of <Link href="/templates" className="text-blue-300 hover:text-blue-200 hover:underline transition-colors">bekijk eerst de templates</Link>
              </p>
            </div>
          </div>
        </section>

        <section id="features" className="relative pt-16 sm:pt-20 pb-8 sm:pb-12 bg-background overflow-hidden">
          {/* Subtle gradient background */}
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-blue-100/30 to-transparent">
            {/* Subtle particles */}
            <div className="absolute inset-0">
              <div className="absolute top-1/3 left-1/3 w-72 h-72 bg-blue-500/12 rounded-full blur-3xl"></div>
              <div className="absolute bottom-1/3 right-1/3 w-72 h-72 bg-blue-600/10 rounded-full blur-3xl"></div>
            </div>
            {/* Subtle grid pattern */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808006_1px,transparent_1px),linear-gradient(to_bottom,#80808006_1px,transparent_1px)] bg-[size:40px_40px]"></div>
          </div>

          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground mb-6 flex items-center justify-center gap-4">
                Waarom{' '}
                <Image
                  src="/logo.png"
                  alt="ZZPCV"
                  width={200}
                  height={67}
                  className="h-12 sm:h-16 lg:h-20 w-auto"
                  priority
                />
                ?
              </h2>
              <p className="text-xl sm:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                Alles wat je nodig hebt om als ZZP&apos;er professioneel online zichtbaar te zijn en jouw ondernemerschap overtuigend te laten zien.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl border border-gray-200 shadow-lg p-8 hover:shadow-xl transition-shadow flex flex-col h-full">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center mb-6 shadow-lg flex-shrink-0">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4 flex-shrink-0">
                  Onderstreept jouw ondernemerschap.
                </h3>
                <p className="text-gray-700 leading-relaxed flex-grow">
                  Een eigen website helpt om je profiel als ondernemer te onderbouwen: diensten, portfolio, werkwijze en contactgegevens op één plek. Dat geeft opdrachtgevers meer vertrouwen en helpt bij het aantonen van zelfstandigheid.
                </p>
              </div>
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl border border-gray-200 shadow-lg p-8 hover:shadow-xl transition-shadow flex flex-col h-full">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center mb-6 shadow-lg flex-shrink-0">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4 flex-shrink-0">
                  Binnen 10 minuten live, zonder gedoe
                </h3>
                <p className="text-gray-700 leading-relaxed flex-grow">
                  Download de app, kies een template en vul je gegevens in. Hosting, techniek en instellingen regelen wij op de achtergrond. Jij focust op je werk.
                </p>
              </div>
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl border border-gray-200 shadow-lg p-8 hover:shadow-xl transition-shadow flex flex-col h-full">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center mb-6 shadow-lg flex-shrink-0">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4 flex-shrink-0">
                  Volledige controle over je eigen website
                </h3>
                <p className="text-gray-700 leading-relaxed flex-grow">
                  Beheer en wijzig je website zelf, wanneer jij dat wilt. Geen extra kosten, geen tussenpersonen en geen wachttijden. Jij bent in controle over je online profiel, vandaag, morgen en wanneer jouw onderneming daarom vraagt.
                </p>
              </div>
            </div>
            
            {/* Waarom ZZPCV - Verwijzing naar FAQ en Kennis */}
            <div className="mt-12 text-center">
              <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
                Wil je meer weten over waarom een eigen website belangrijk is voor zzp&apos;ers? Bekijk onze veelgestelde vragen en kennisartikelen voor uitgebreide informatie over zelfstandigheid, de Wet DBA en het belang van een professionele online presentatie.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <Link href="/faq" className="inline-flex items-center justify-center rounded-md border border-input bg-background px-6 py-2 text-sm font-medium shadow-sm transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2">
                  Bekijk FAQ
                </Link>
                <Link href="/faq#kennis" className="inline-flex items-center justify-center rounded-md border border-input bg-background px-6 py-2 text-sm font-medium shadow-sm transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2">
                  Bekijk Kennisartikelen
                </Link>
              </div>
            </div>
          </div>
        </section>

        <section className="relative py-16 sm:py-24 bg-muted/50 overflow-hidden">
          {/* Subtle gradient background */}
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-blue-100/25 to-transparent">
            {/* Subtle particles */}
            <div className="absolute inset-0">
              <div className="absolute top-1/2 left-1/2 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
            </div>
            {/* Subtle grid pattern */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808006_1px,transparent_1px),linear-gradient(to_bottom,#80808006_1px,transparent_1px)] bg-[size:44px_44px]"></div>
          </div>
          
          <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-card rounded-lg border shadow-sm p-8 sm:p-10">
              <h2 className="text-2xl sm:text-3xl font-bold text-card-foreground mb-6 text-center">
                Waarom jouw eigen ZZP-website belangrijk is
              </h2>
              <div className="prose prose-sm max-w-none">
                <p className="text-muted-foreground text-lg mb-6">
                  Als zelfstandig ondernemer wil je vertrouwen wekken bij potentiële opdrachtgevers en duidelijk laten zien dat je een echte ondernemer bent, niet iemand in loondienst.
                </p>
                <div className="bg-primary/5 border-l-4 border-primary p-4 mb-6 rounded-r">
                  <p className="text-muted-foreground mb-2">
                    Volgens de <a href="https://www.rijksoverheid.nl/onderwerpen/zelfstandigen-zonder-personeel-zzp/voorkomen-van-schijnzelfstandigheid" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline font-medium">Rijksoverheid</a> kan een ZZP&apos;er zijn zelfstandigheid aantonen door bijvoorbeeld actief op zoek te zijn naar verschillende opdrachtgevers, regelmatig andere opdrachten uitvoert, <strong className="text-foreground">een website beheert</strong> en een KvK-inschrijving heeft.
                  </p>
                </div>
                <p className="text-muted-foreground mb-4">
                  Bovendien is een eigen website <strong className="text-foreground">verplicht volgens de Nederlandse wetgeving</strong> voor ZZP&apos;ers die onder de <strong>DBA (Deregulering Beoordeling Arbeidsrelaties)</strong> of <strong>VBAR (Verklaring Arbeidsrelatie)</strong> vallen. Dit is een wettelijke eis om schijnzelfstandigheid te voorkomen en aan te tonen dat je een echte ondernemer bent.
                </p>
                <p className="text-muted-foreground mb-4">Een eigen website helpt je hierbij:</p>
                <ul className="space-y-3 text-muted-foreground">
                  <li className="flex items-start">
                    <span className="text-primary mr-2">•</span>
                    <span>Bewijs je zelfstandigheid richting opdrachtgevers en Belastingdienst</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-primary mr-2">•</span>
                    <span>Vergroot je zichtbaarheid en professionele uitstraling</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-primary mr-2">•</span>
                    <span>Presenteer je diensten, portfolio en contactinformatie op één plek</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <section className="relative py-16 sm:py-20 overflow-hidden">
          {/* Subtle gradient background */}
          <div className="absolute inset-0 bg-gradient-to-b from-blue-100/40 via-blue-50/20 to-transparent">
            {/* Subtle particles */}
            <div className="absolute inset-0">
              <div className="absolute top-1/4 right-1/4 w-64 h-64 bg-blue-400/15 rounded-full blur-3xl"></div>
              <div className="absolute bottom-1/4 left-1/4 w-64 h-64 bg-blue-500/12 rounded-full blur-3xl"></div>
            </div>
            {/* Subtle grid pattern */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-[size:32px_32px]"></div>
          </div>
          
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground mb-6">Hoe werkt het?</h2>
              <p className="text-xl sm:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                Download de app en maak binnen minuten je professionele website. Alles in één handige app.
              </p>
            </div>
            {/* Creative Timeline Flow */}
            <div className="relative">
              {/* Progress Line - Hidden on mobile, visible on desktop */}
              <div className="hidden md:block absolute top-12 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 via-blue-400 to-blue-500 opacity-20"></div>
              
              <div className="grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-4">
                {/* Step 1 */}
                <div className="relative group">
                  <div className="flex flex-col items-center">
                    {/* Step Badge with Icon */}
                    <div className="relative z-10 mb-6">
                      <div className="w-24 h-24 bg-gradient-to-br from-blue-500 to-blue-600 rounded-3xl flex flex-col items-center justify-center shadow-xl group-hover:scale-110 group-hover:shadow-2xl transition-all duration-300">
                        <div className="absolute -top-2 -right-2 w-8 h-8 bg-blue-400 rounded-full flex items-center justify-center shadow-lg">
                          <span className="text-sm font-bold text-white">1</span>
                        </div>
                        <svg className="w-10 h-10 text-white mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                        </svg>
                      </div>
                    </div>
                    
                    {/* Connector Arrow - Hidden on mobile */}
                    <div className="hidden md:block absolute top-12 left-[60%] w-[40%] h-0.5 bg-gradient-to-r from-blue-500 to-transparent opacity-30"></div>
                    
                    {/* Content Card */}
                    <div className="bg-white/80 backdrop-blur-sm rounded-2xl border border-gray-200 shadow-lg p-6 w-full group-hover:shadow-xl transition-all duration-300">
                      <h3 className="text-xl font-bold text-gray-900 mb-3 text-center">Download de app</h3>
                      <p className="text-gray-700 leading-relaxed text-center text-sm">Haal de app op uit de App Store of Google Play Store. Beschikbaar voor iOS en Android.</p>
                    </div>
                  </div>
                </div>

                {/* Step 2 */}
                <div className="relative group">
                  <div className="flex flex-col items-center">
                    <div className="relative z-10 mb-6">
                      <div className="w-24 h-24 bg-gradient-to-br from-blue-500 to-blue-600 rounded-3xl flex flex-col items-center justify-center shadow-xl group-hover:scale-110 group-hover:shadow-2xl transition-all duration-300">
                        <div className="absolute -top-2 -right-2 w-8 h-8 bg-blue-400 rounded-full flex items-center justify-center shadow-lg">
                          <span className="text-sm font-bold text-white">2</span>
                        </div>
                        <svg className="w-10 h-10 text-white mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17V7m0 10a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h2a2 2 0 012 2m0 10a2 2 0 002 2h2a2 2 0 002-2M9 7a2 2 0 012-2h2a2 2 0 012 2m0 10V7m0 10a2 2 0 002 2h2a2 2 0 002-2V7a2 2 0 00-2-2h-2a2 2 0 00-2 2" />
                        </svg>
                      </div>
                    </div>
                    
                    <div className="hidden md:block absolute top-12 left-[60%] w-[40%] h-0.5 bg-gradient-to-r from-blue-500 to-transparent opacity-30"></div>
                    
                    <div className="bg-white/80 backdrop-blur-sm rounded-2xl border border-gray-200 shadow-lg p-6 w-full group-hover:shadow-xl transition-all duration-300">
                      <h3 className="text-xl font-bold text-gray-900 mb-3 text-center">Selecteer template</h3>
                      <p className="text-gray-700 leading-relaxed text-center text-sm">Kies uit verschillende professionele templates die passen bij jouw vakgebied en stijl.</p>
                    </div>
                  </div>
                </div>

                {/* Step 3 */}
                <div className="relative group">
                  <div className="flex flex-col items-center">
                    <div className="relative z-10 mb-6">
                      <div className="w-24 h-24 bg-gradient-to-br from-blue-500 to-blue-600 rounded-3xl flex flex-col items-center justify-center shadow-xl group-hover:scale-110 group-hover:shadow-2xl transition-all duration-300">
                        <div className="absolute -top-2 -right-2 w-8 h-8 bg-blue-400 rounded-full flex items-center justify-center shadow-lg">
                          <span className="text-sm font-bold text-white">3</span>
                        </div>
                        <svg className="w-10 h-10 text-white mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                        </svg>
                      </div>
                    </div>
                    
                    <div className="hidden md:block absolute top-12 left-[60%] w-[40%] h-0.5 bg-gradient-to-r from-blue-500 to-transparent opacity-30"></div>
                    
                    <div className="bg-white/80 backdrop-blur-sm rounded-2xl border border-gray-200 shadow-lg p-6 w-full group-hover:shadow-xl transition-all duration-300">
                      <h3 className="text-xl font-bold text-gray-900 mb-3 text-center">Vul informatie in</h3>
                      <p className="text-gray-700 leading-relaxed text-center text-sm">Voeg je persoonlijke gegevens, ervaring, portfolio en contactinformatie toe.</p>
                    </div>
                  </div>
                </div>

                {/* Step 4 */}
                <div className="relative group">
                  <div className="flex flex-col items-center">
                    <div className="relative z-10 mb-6">
                      <div className="w-24 h-24 bg-gradient-to-br from-blue-500 to-blue-600 rounded-3xl flex flex-col items-center justify-center shadow-xl group-hover:scale-110 group-hover:shadow-2xl transition-all duration-300">
                        <div className="absolute -top-2 -right-2 w-8 h-8 bg-blue-400 rounded-full flex items-center justify-center shadow-lg">
                          <span className="text-sm font-bold text-white">4</span>
                        </div>
                        <svg className="w-10 h-10 text-white mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                        </svg>
                      </div>
                    </div>
                    
                    <div className="bg-white/80 backdrop-blur-sm rounded-2xl border border-gray-200 shadow-lg p-6 w-full group-hover:shadow-xl transition-all duration-300">
                      <h3 className="text-xl font-bold text-gray-900 mb-3 text-center">Lanceer je website</h3>
                      <p className="text-gray-700 leading-relaxed text-center text-sm">Publiceer en beheer je website en deel je professionele profiel met de wereld.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="relative pt-8 sm:pt-12 pb-16 sm:pb-20 bg-primary/5 overflow-hidden">
          {/* Subtle gradient background */}
          <div className="absolute inset-0 bg-gradient-to-b from-blue-100/30 via-primary/5 to-blue-100/30">
            {/* Subtle particles */}
            <div className="absolute inset-0">
              <div className="absolute top-1/2 left-1/4 w-80 h-80 bg-blue-500/15 rounded-full blur-3xl"></div>
              <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-blue-600/12 rounded-full blur-3xl"></div>
            </div>
            {/* Subtle grid pattern */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-[size:36px_36px]"></div>
          </div>
          
          <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">Klaar om te beginnen?</h2>
            <p className="text-lg text-muted-foreground mb-8">
              Download de app en maak binnen minuten je professionele website. Of bekijk eerst de templates.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-6">
              <a href="#" className="inline-flex items-center justify-center rounded-md bg-primary px-8 py-3 text-base font-medium text-primary-foreground shadow-sm transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2">
                <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
                </svg>
                Download voor iOS
              </a>
              <a href="#" className="inline-flex items-center justify-center rounded-md border border-input bg-background px-8 py-3 text-base font-medium shadow-sm transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2">
                <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M3,20.5V3.5C3,2.91 3.34,2.39 3.84,2.15L13.69,12L3.84,21.85C3.34,21.6 3,21.09 3,20.5M16.81,15.12L6.05,21.34L14.54,12.85L16.81,15.12M20.16,10.81C20.5,11.08 20.75,11.5 20.75,12C20.75,12.5 20.5,12.92 20.16,13.19L17.19,15.45L14.54,12.85L17.19,10.25L20.16,10.81M6.05,2.66L16.81,8.88L14.54,11.15L6.05,2.66Z"/>
                </svg>
                Download voor Android
              </a>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/templates" className="inline-flex items-center justify-center rounded-md border border-input bg-background px-6 py-2 text-sm font-medium shadow-sm transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2">
                Bekijk Templates
              </Link>
              <Link href="/pricing" className="inline-flex items-center justify-center rounded-md border border-input bg-background px-6 py-2 text-sm font-medium shadow-sm transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2">
                Bekijk Prijzen
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
