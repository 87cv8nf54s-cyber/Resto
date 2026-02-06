"use client";

import { useState } from 'react';
import Link from 'next/link';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
import { ChevronDown, ChevronUp } from 'lucide-react';

interface FAQItem {
  id: string;
  question: string;
  answer: React.ReactNode;
}

export default function FAQPage() {
  const [openItems, setOpenItems] = useState<Record<string, boolean>>({});

  const toggleItem = (id: string) => {
    setOpenItems(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const faqItems: FAQItem[] = [
    {
      id: '0',
      question: 'Wat is een zzp website?',
      answer: (
        <div className="space-y-3">
          <p>
            Een zzp website is een professionele website specifiek ontworpen voor zelfstandigen zonder personeel (zzp&apos;ers). Een zzp website is meer dan alleen een online visitekaartje – het is een krachtig instrument om je zelfstandigheid te tonen, je diensten te presenteren en je professionele identiteit te versterken.
          </p>
          <p>
            Een goede zzp website bevat meestal:
          </p>
          <ul className="list-disc list-inside space-y-2 ml-4">
            <li>Je professionele profiel en achtergrond</li>
            <li>Overzicht van je diensten en expertise</li>
            <li>Portfolio of voorbeelden van je werk</li>
            <li>Contactgegevens en KvK-informatie</li>
            <li>Testimonials of referenties</li>
          </ul>
          <p>
            Een zzp website helpt je niet alleen om gevonden te worden door potentiële opdrachtgevers, maar ook om je zelfstandigheid aan te tonen aan instanties zoals de Belastingdienst. Het is een essentieel onderdeel van je professionele online aanwezigheid als zzp&apos;er.
          </p>
        </div>
      )
    },
    {
      id: '0b',
      question: 'Wat is het verschil tussen een normale website en een zzp website?',
      answer: (
        <div className="space-y-3">
          <p>
            Hoewel een zzp website technisch gezien een normale website is, zijn er belangrijke verschillen in doel, inhoud en functionaliteit:
          </p>
          <p><strong>Normale website:</strong></p>
          <ul className="list-disc list-inside space-y-2 ml-4">
            <li>Kan voor verschillende doeleinden zijn (bedrijven, organisaties, persoonlijke blogs)</li>
            <li>Focus ligt vaak op producten, diensten of informatie</li>
            <li>Niet specifiek gericht op het aantonen van zelfstandigheid</li>
          </ul>
          <p><strong>Zzp website:</strong></p>
          <ul className="list-disc list-inside space-y-2 ml-4">
            <li>Specifiek ontworpen voor zelfstandigen zonder personeel</li>
            <li>Focus op het presenteren van je professionele profiel als ondernemer</li>
            <li>Helpt bij het aantonen van zelfstandigheid (belangrijk voor Wet DBA/VBAR)</li>
            <li>Toont je ervaring, expertise en portfolio op een manier die relevant is voor zzp&apos;ers</li>
            <li>Vaak geoptimaliseerd voor het tonen van je zzp cv en professionele achtergrond</li>
          </ul>
          <p>
            Een zzp website is dus meer dan een standaard website – het is een strategisch instrument dat specifiek is afgestemd op de behoeften en uitdagingen van zelfstandig ondernemers. Het helpt je niet alleen om gevonden te worden, maar ook om je zelfstandigheid te onderbouwen en je professionele identiteit te versterken.
          </p>
        </div>
      )
    },
    {
      id: '0c',
      question: 'Hoe is een zzp website goed om een zzp cv te tonen?',
      answer: (
        <div className="space-y-3">
          <p>
            Een zzp website is de perfecte manier om je <strong>zzp cv</strong> te presenteren. In plaats van een statisch PDF-bestand, biedt een zzp website een dynamische en interactieve manier om je professionele achtergrond te tonen.
          </p>
          <p><strong>Voordelen van een zzp website voor je zzp cv:</strong></p>
          <ul className="list-disc list-inside space-y-2 ml-4">
            <li><strong>Altijd actueel:</strong> Je kunt je <strong>zzp cv</strong> op je zzp website direct bijwerken wanneer je nieuwe projecten afrondt of nieuwe vaardigheden ontwikkelt</li>
            <li><strong>Visueel aantrekkelijk:</strong> Een zzp website laat je <strong>zzp cv</strong> zien in een professioneel ontwerp, wat veel indrukwekkender is dan een standaard PDF</li>
            <li><strong>Breed bereik:</strong> Je <strong>zzp cv</strong> op je zzp website is 24/7 toegankelijk voor potentiële opdrachtgevers, zonder dat je handmatig bestanden hoeft te delen</li>
            <li><strong>Interactief:</strong> Je kunt links toevoegen naar projecten, portfolio-items of referenties, wat je <strong>zzp cv</strong> veel rijker maakt dan een papieren versie</li>
            <li><strong>Zoekmachine vriendelijk:</strong> Je <strong>zzp cv</strong> op je zzp website kan gevonden worden via zoekmachines, waardoor opdrachtgevers jou kunnen vinden op basis van je expertise</li>
          </ul>
          <p>
            Met een zzp website transformeer je je <strong>zzp cv</strong> van een statisch document naar een levend, interactief profiel dat je professionele identiteit versterkt en je kansen op nieuwe opdrachten vergroot. Het is de moderne manier om je <strong>zzp cv</strong> te presenteren en jezelf te onderscheiden van andere zzp&apos;ers.
          </p>
        </div>
      )
    },
    {
      id: '1',
      question: 'Waarom heeft elke zzp\'er een eigen zzp website nodig?',
      answer: (
        <div className="space-y-3">
          <p>
            Een eigen zzp website is als zzp&apos;er geen luxe, maar een basisvoorwaarde voor professioneel ondernemen. Het is je digitale visitekaartje, laat zien dat je serieus bent en helpt potentiële opdrachtgevers jou te vinden. Met een goede zzp website:
          </p>
          <ul className="list-disc list-inside space-y-2 ml-4">
            <li>Sta je <strong>24/7 zichtbaar online</strong> met je zzp website</li>
            <li>Win je sneller vertrouwen van klanten dankzij je professionele zzp website</li>
            <li>Laat je duidelijk zien wie je bent en wat je aanbiedt via je zzp website</li>
          </ul>
          <p>
            Zonder een zzp website loop je kansen mis. Klanten zoeken jou online – zorg dat ze je daar ook vinden met een professionele zzp website.
          </p>
        </div>
      )
    },
    {
      id: '2',
      question: 'Is LinkedIn niet hetzelfde als een eigen zzp website?',
      answer: (
        <div className="space-y-3">
          <p>
            Veel zzp&apos;ers vragen zich af of een LinkedIn-profiel voldoende is. <strong>Het antwoord: nee.</strong> LinkedIn is een belangrijk netwerkplatform, maar het is <strong>géén volwaardig alternatief voor een eigen zzp website</strong>.
          </p>
          <p><strong>Waarom niet?</strong></p>
          <ul className="list-disc list-inside space-y-2 ml-4">
            <li><strong>Ook werknemers hebben LinkedIn</strong>. Het profiel van een zzp&apos;er en een werknemer ogen vaak identiek.</li>
            <li>Als jij je professioneel wilt <strong>onderscheiden als zelfstandig ondernemer</strong>, is alleen een LinkedIn-profiel niet overtuigend genoeg. Een eigen zzp website maakt het verschil.</li>
            <li>Voor opdrachtgevers en instanties zoals de <a href="https://www.belastingdienst.nl/wps/wcm/connect/nl/zzp/content/regels-werken-als-zzper-wet-dba" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Belastingdienst</a> (bijv. onder de Wet DBA) is een <strong>eigen zzp website een krachtig signaal van zelfstandigheid</strong>.</li>
          </ul>
          <p>Met een eigen zzp website:</p>
          <ul className="list-disc list-inside space-y-2 ml-4">
            <li>Ben jij <strong>online vindbaar</strong> en optioneel onder je eigen domeinnaam (<a href="http://www.jouwdomein.nl" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">www.jouwdomein.nl</a>) via je zzp website</li>
            <li>Presenteer je professioneel je aanbod, portfolio, tarieven en contactinformatie op je zzp website</li>
            <li>Laat je zien dat je een echte ondernemer bent, met zichtbare ondernemersidentiteit dankzij je zzp website</li>
          </ul>
          <p>
            <strong>Conclusie:</strong> LinkedIn is waardevol, maar als zzp&apos;er heb je óók een eigen zzp website nodig om zichtbaar, onderscheidend en overtuigend te zijn.
          </p>
        </div>
      )
    },
    {
      id: '3',
      question: 'Hoe maak ik als zzp\'er eenvoudig een zzp website?',
      answer: (
        <div className="space-y-3">
          <p>
            Met de app van <a href="https://zzpcv.nl" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline font-semibold">ZZP.CV</a> maak je in 3 stappen een professionele zzp website:
          </p>
          <ol className="list-decimal list-inside space-y-2 ml-4">
            <li>Vul je bedrijfsgegevens en ervaring in voor je zzp website</li>
            <li>Kies een template en accentkleur die bij jou past voor je zzp website</li>
            <li>Publiceer je zzp website met 1 druk op de knop</li>
          </ol>
          <p>
            Je hebt geen technische kennis nodig om je zzp website te maken. Alles werkt via je mobiel, supersnel en zonder gedoe met hosting, domeinnamen of design. Binnen minuten heb je een professionele zzp website online.
          </p>
        </div>
      )
    },
    {
      id: '4',
      question: 'Wat is ZZP.CV precies?',
      answer: (
        <div className="space-y-3">
          <p>
            <a href="https://zzpcv.nl" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline font-semibold">ZZP.CV</a> is een <strong>mobiele app</strong> waarmee zzp&apos;ers binnen enkele minuten een eigen zzp website kunnen maken en publiceren. Je kiest een professioneel ontwerp, vult je info in en je zzp website staat direct online.
          </p>
          <p><strong>Uniek aan ZZP.CV:</strong></p>
          <ul className="list-disc list-inside space-y-2 ml-4">
            <li>📱 Volledig mobiel, altijd en overal aanpasbaar voor je zzp website</li>
            <li>🎨 Templates afgestemd op zzp-profielen voor je zzp website</li>
            <li>✨ Snel, eenvoudig en direct online met je zzp website</li>
            <li>💼 Ideaal voor startende én ervaren zelfstandigen om hun zzp website te maken</li>
          </ul>
          <p>
            Of je nu tekstschrijver, coach, consultant of vakman bent – met <a href="https://zzpcv.nl" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline font-semibold">ZZP.CV</a> ziet jouw zzp website er professioneel uit.
          </p>
        </div>
      )
    },
    {
      id: '5',
      question: 'Is een zzp website ook belangrijk voor de Wet DBA?',
      answer: (
        <div className="space-y-3">
          <p>
            Ja. De <a href="https://www.belastingdienst.nl/wps/wcm/connect/nl/zzp/content/regels-werken-als-zzper-wet-dba" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline font-semibold">Wet DBA</a> bepaalt wanneer jij als zelfstandige mag werken zonder loondienstrelatie. Een van de belangrijkste signalen dat je écht zzp&apos;er bent, is dat je:
          </p>
          <ul className="list-disc list-inside space-y-2 ml-4">
            <li>Meerdere opdrachtgevers hebt</li>
            <li>Zelf je tarieven bepaalt</li>
            <li>Een <strong>professionele online aanwezigheid</strong> hebt met een zzp website</li>
          </ul>
          <p>
            Een eigen zzp website met je diensten, contactgegevens en <a href="https://www.kvk.nl/zelfstandig/" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">KvK-vermelding</a> helpt je te profileren als echte ondernemer – iets waar zowel opdrachtgevers als de Belastingdienst op letten. Een zzp website is dus essentieel voor je zelfstandigheid.
          </p>
          <p>
            Met <a href="https://zzpcv.nl" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline font-semibold">ZZP.CV</a> maak je snel een professionele zzp website en laat je direct zien: ik ben zelfstandig, professioneel en zichtbaar.
          </p>
        </div>
      )
    },
    {
      id: '6',
      question: 'Wat kost ZZP.CV?',
      answer: (
        <div className="space-y-3">
          <p>
            Je kunt <a href="https://zzpcv.nl" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline font-semibold">ZZP.CV</a> <strong>gratis proberen</strong>. Na registratie heb je <strong>3 dagen toegang</strong> tot alle functies, inclusief publicatie van je zzp website.
          </p>
          <p>
            Daarna kies je voor een <strong>transparant jaarabonnement van €7,99 per maand</strong> om jouw zzp website online te houden. Eén duidelijke prijs, alles inbegrepen. Geen verborgen kosten, geen extra&apos;s, wel volledige vrijheid om je zzp website te beheren.
          </p>
        </div>
      )
    },
    {
      id: '7',
      question: 'Heb ik technische kennis nodig?',
      answer: (
        <div className="space-y-3">
          <p>
            Nee. <a href="https://zzpcv.nl" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline font-semibold">ZZP.CV</a> is gemaakt voor zzp&apos;ers zónder technische achtergrond om een zzp website te maken. Je hoeft niets te coderen. De app begeleidt je stap voor stap. Jij levert de inhoud – ZZP.CV regelt de rest voor je zzp website:
          </p>
          <ul className="list-disc list-inside space-y-2 ml-4">
            <li>Hosting voor je zzp website</li>
            <li>Ontwerp van je zzp website</li>
            <li>Responsief design (werkt op mobiel en desktop) voor je zzp website</li>
          </ul>
        </div>
      )
    },
    {
      id: '8',
      question: 'Word ik beter gevonden met ZZP.CV?',
      answer: (
        <div className="space-y-3">
          <p>
            <strong>Ja – omdat je zzp website altijd actueel, professioneel en direct live is.</strong> Met <a href="https://zzpcv.nl" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline font-semibold">ZZP.CV</a> heb je geen developer nodig en geen ingewikkelde portalen of CMS-systemen om je zzp website te maken.
          </p>
          <ul className="list-disc list-inside space-y-2 ml-4">
            <li>✔️ Binnen 10 minuten staat je zzp website online</li>
            <li>✔️ Wijzigingen voer je zelf door via de app op je zzp website</li>
            <li>✔️ Elke update staat <strong>binnen enkele seconden live</strong> op je zzp website</li>
            <li>✔️ Je zzp website ziet er verzorgd uit op mobiel én desktop</li>
          </ul>
          <p>
            Doordat je snel kunt reageren en je zzp website altijd actueel houdt, bouw je vertrouwen op bij opdrachtgevers én vergroot je je zichtbaarheid met je zzp website.
          </p>
          <p>
            <strong>En dat zonder technische kennis of gedoe.</strong>
          </p>
        </div>
      )
    },
    {
      id: '9',
      question: 'Kan ik mijn zzp website zelf aanpassen?',
      answer: (
        <div className="space-y-3">
          <p>
            Ja. Via de app pas je eenvoudig je zzp website aan – tekst, foto&apos;s en stijl – wanneer je maar wilt. Alles realtime. Geen gedoe met webbouwers of ingewikkelde software voor je zzp website.
          </p>
          <p>Je kunt op je zzp website:</p>
          <ul className="list-disc list-inside space-y-2 ml-4">
            <li>Je diensten aanpassen op je zzp website</li>
            <li>Projecten toevoegen aan je zzp website</li>
            <li>Kleuren wijzigen van je zzp website</li>
            <li>Updates plaatsen op je zzp website</li>
          </ul>
          <p>
            Jij houdt de controle over je zzp website, wij regelen de techniek.
          </p>
        </div>
      )
    },
    {
      id: '10',
      question: 'Wat gebeurt er na de gratis proefperiode?',
      answer: (
        <div className="space-y-3">
          <p>
            Na 3 dagen verloopt je proefversie. Kies je voor het jaarabonnement (€7,99 per maand), dan blijft je zzp website online. Eén duidelijke prijs, alles inbegrepen.
          </p>
          <p>
            Kies je niet, dan wordt je zzp website tijdelijk offline gehaald. Je gegevens blijven veilig opgeslagen, dus je kunt later altijd weer je zzp website activeren.
          </p>
        </div>
      )
    },
    {
      id: '11',
      question: 'Voor wie is ZZP.CV geschikt?',
      answer: (
        <div className="space-y-3">
          <p>
            Voor alle zelfstandigen zonder personeel die een zzp website willen maken. Bijvoorbeeld:
          </p>
          <ul className="list-disc list-inside space-y-2 ml-4">
            <li>Freelancers die een zzp website nodig hebben</li>
            <li>Consultants die hun zzp website willen maken</li>
            <li>Coaches die een zzp website willen</li>
            <li>Creatieven die hun zzp website nodig hebben</li>
            <li>Technische vakmensen die een zzp website willen</li>
            <li>Startende ondernemers die hun eerste zzp website maken</li>
          </ul>
          <p>
            Of je nu fulltime ondernemer bent of pas begint: <a href="https://zzpcv.nl" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline font-semibold">ZZP.CV</a> helpt jou een zzp website te maken om <strong>zichtbaar, professioneel en compliant</strong> te ondernemen.
          </p>
        </div>
      )
    },
    {
      id: '12',
      question: 'Hoe koppel ik mijn eigen domein aan mijn zzp website?',
      answer: (
        <div className="space-y-3">
          <p>
            Heb je al een domein gekocht bij een hostingpartij en wil je dit koppelen aan je zzp website? Dan moet je de <strong>DNS-instellingen</strong> aanpassen bij je hostingpartij voor je zzp website.
          </p>
          <p>
            Je moet twee <strong>A-records</strong> toevoegen of aanpassen voor je zzp website:
          </p>
          <ul className="list-disc list-inside space-y-2 ml-4">
            <li><strong>A-record 1:</strong> Naam: @ (of leeg), Waarde: <code className="bg-gray-100 px-2 py-1 rounded">167.172.44.51</code></li>
            <li><strong>A-record 2:</strong> Naam: www, Waarde: <code className="bg-gray-100 px-2 py-1 rounded">167.172.44.51</code></li>
          </ul>
          <p>
            De exacte stappen verschillen per hostingpartij, maar het proces is over het algemeen hetzelfde: log in op het beheerpaneel van je hostingpartij, navigeer naar de DNS-instellingen, en pas de A-records aan naar het IP-adres <code className="bg-gray-100 px-2 py-1 rounded">167.172.44.51</code> voor je zzp website.
          </p>
          <p>
            <strong>Let op:</strong> DNS-wijzigingen kunnen tot 48 uur duren voordat ze wereldwijd actief zijn voor je zzp website, maar meestal werkt het binnen enkele uren.
          </p>
          <p>
            Voor <strong>uitgebreide stapsgewijze instructies</strong> per hostingpartij (Hostnet, TransIP, Mijndomein, Strato en meer) om je domein aan je zzp website te koppelen, bekijk ons kennisartikel: <Link href="/kennis/dns-instellingen-eigen-domein" className="text-primary hover:underline font-semibold">DNS-instellingen voor je eigen domein configureren</Link>.
          </p>
        </div>
      )
    }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      
      <main className="flex-1">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <article className="max-w-none">
            <h1 className="text-4xl font-bold mb-8">Veelgestelde vragen over ZZP.CV</h1>

            <div className="space-y-4">
              {faqItems.map((item) => {
                const isOpen = openItems[item.id] || false;
                return (
                  <div key={item.id} className="border border-gray-200 rounded-lg overflow-hidden">
                    <button
                      onClick={() => toggleItem(item.id)}
                      className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gray-50 transition-colors"
                      aria-expanded={isOpen}
                    >
                      <h2 className="text-lg font-semibold pr-4">{item.question}</h2>
                      <div className="flex-shrink-0">
                        {isOpen ? (
                          <ChevronUp className="w-5 h-5 text-gray-500" />
                        ) : (
                          <ChevronDown className="w-5 h-5 text-gray-500" />
                        )}
                      </div>
                    </button>
                    {isOpen && (
                      <div className="px-6 py-4 bg-gray-50 border-t border-gray-200 animate-in fade-in duration-200">
                        <div className="text-gray-700 leading-relaxed">
                          {item.answer}
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Kennis Items Section */}
            <div id="kennis" className="mt-16">
              <h2 className="text-3xl font-bold mb-8">Kennis</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Link 
                  href="/kennis/website-voor-zzpers" 
                  className="border border-gray-200 rounded-lg p-6 hover:border-primary hover:shadow-md transition-all group"
                >
                  <h3 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors">
                    Website voor zzp&apos;ers: waarom een eigen website steeds belangrijker wordt
                  </h3>
                  <p className="text-muted-foreground text-sm">
                    Ontdek waarom een eigen website voor zzp&apos;ers steeds belangrijker wordt en hoe het je helpt professioneel over te komen.
                  </p>
                </Link>
                <Link 
                  href="/kennis/website-nodig-2026" 
                  className="border border-gray-200 rounded-lg p-6 hover:border-primary hover:shadow-md transition-all group"
                >
                  <h3 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors">
                    Heeft een zzp&apos;er in 2026 nog een website nodig? En waarom die steeds belangrijker wordt
                  </h3>
                  <p className="text-muted-foreground text-sm">
                    Lees waarom een eigen website in 2026 steeds belangrijker wordt voor zzp&apos;ers en hoe het helpt bij zelfstandige positionering.
                  </p>
                </Link>
                <Link 
                  href="/kennis/website-wet-dba" 
                  className="border border-gray-200 rounded-lg p-6 hover:border-primary hover:shadow-md transition-all group"
                >
                  <h3 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors">
                    Hoe een eigen website je positie als zzp&apos;er versterkt in het licht van Wet DBA en zelfstandigheid
                  </h3>
                  <p className="text-muted-foreground text-sm">
                    Ontdek hoe een eigen website je zelfstandige positie versterkt en bijdraagt aan transparantie in het licht van de Wet DBA.
                  </p>
                </Link>
                <Link 
                  href="/kennis/dns-instellingen-eigen-domein" 
                  className="border border-gray-200 rounded-lg p-6 hover:border-primary hover:shadow-md transition-all group"
                >
                  <h3 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors">
                    DNS-instellingen voor je eigen domein configureren
                  </h3>
                  <p className="text-muted-foreground text-sm">
                    Leer hoe je DNS-instellingen aanpast om je eigen domein te koppelen aan je ZZPCV website. Met links naar instructies van Hostnet, TransIP, Mijndomein en Strato.
                  </p>
                </Link>
              </div>
            </div>

            <section className="mt-12 pt-8 sm:pt-12 pb-8 sm:pb-12 bg-primary/5 rounded-lg">
              <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
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
          </article>
        </div>
      </main>

      <Footer />
    </div>
  );
}

