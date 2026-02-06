import Navigation from '../components/Navigation';
import Footer from '../components/Footer';

export default function TermsPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      
      <main className="flex-1">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <article className="max-w-none">
            <h1 className="text-4xl font-bold mb-2">Algemene Voorwaarden – ZZP.CV</h1>
            <p className="text-sm text-muted-foreground mb-8">
              Versie: 1.1<br />
              Laatst bijgewerkt: 6 januari 2026
            </p>

            <p className="text-lg text-muted-foreground mb-4">
              Deze algemene voorwaarden zijn van toepassing op het gebruik van het platform ZZP.CV, waaronder begrepen de website (zzpcv.nl), mobiele applicaties en alle bijbehorende huidige en toekomstige diensten en functionaliteiten.
            </p>

            <p className="mb-6">
              Door registratie en/of gebruik van het platform verklaart de gebruiker kennis te hebben genomen van en akkoord te gaan met deze algemene voorwaarden.
            </p>

            <h2 className="text-2xl font-bold mt-8 mb-4">Artikel 1 – Definities</h2>
            <p className="mb-4">In deze algemene voorwaarden wordt verstaan onder:</p>
            <ul className="list-disc list-inside mb-6 space-y-2">
              <li><strong>ZZP.CV:</strong> de eenmanszaak handelend onder de naam ZZP.CV, ingeschreven bij de Kamer van Koophandel onder nummer 87647338.</li>
              <li><strong>Platform:</strong> de website zzpcv.nl, mobiele applicaties en alle bijbehorende diensten en functionaliteiten.</li>
              <li><strong>Gebruiker:</strong> iedere natuurlijke persoon die gebruikmaakt van het platform en handelt in de uitoefening van een beroep of bedrijf.</li>
              <li><strong>Account:</strong> het persoonlijke gebruikersaccount waarmee toegang wordt verkregen tot het platform.</li>
              <li><strong>Gebruikerscontent:</strong> alle door de gebruiker ingevoerde, geüploade of gegenereerde gegevens, waaronder CV-informatie, profielgegevens, teksten, afbeeldingen en contactgegevens.</li>
              <li><strong>Abonnement:</strong> de betaalde overeenkomst die de gebruiker afsluit om de persoonlijke website actief te publiceren.</li>
              <li><strong>Free trial:</strong> de gratis proefperiode van drie (3) kalenderdagen na registratie.</li>
              <li><strong>Overeenkomst:</strong> de overeenkomst tussen ZZP.CV en de gebruiker die tot stand komt door acceptatie van deze voorwaarden en gebruik van het platform.</li>
            </ul>

            <h2 className="text-2xl font-bold mt-8 mb-4">Artikel 2 – Zakelijk karakter van de dienstverlening</h2>
            <ul className="list-disc list-inside mb-6 space-y-2">
              <li>De diensten van ZZP.CV zijn uitsluitend bedoeld voor gebruik door zelfstandige professionals (zzp&apos;ers) en andere zakelijke gebruikers.</li>
              <li>Door registratie en gebruik van het platform verklaart de gebruiker te handelen in de uitoefening van een beroep of bedrijf.</li>
              <li>De overeenkomst tussen ZZP.CV en de gebruiker is geen consumentenovereenkomst.</li>
              <li>Consumentenbescherming, waaronder het wettelijke herroepingsrecht, is niet van toepassing.</li>
            </ul>

            <h2 className="text-2xl font-bold mt-8 mb-4">Artikel 3 – Dienstverlening</h2>
            <p className="mb-4">ZZP.CV biedt een digitaal platform waarmee gebruikers:</p>
            <ul className="list-disc list-inside mb-4 space-y-2">
              <li>een professioneel CV en profiel kunnen aanmaken;</li>
              <li>een persoonlijke website kunnen genereren;</li>
              <li>deze website kunnen publiceren, mits een geldig abonnement actief is.</li>
            </ul>
            <p className="mb-4">
              ZZP.CV spant zich in om het platform zorgvuldig en professioneel te exploiteren, maar geeft geen garanties ten aanzien van beschikbaarheid, continuïteit of foutloze werking.
            </p>
            <p className="mb-6">
              ZZP.CV behoudt zich het recht voor om het platform of onderdelen daarvan tijdelijk buiten gebruik te stellen voor onderhoud, updates of verbeteringen.
            </p>

            <h2 className="text-2xl font-bold mt-8 mb-4">Artikel 4 – Account en gebruik</h2>
            <p className="mb-4">Voor gebruik van het platform is een account vereist.</p>
            <p className="mb-4">De gebruiker is verantwoordelijk voor:</p>
            <ul className="list-disc list-inside mb-4 space-y-2">
              <li>het verstrekken van juiste en actuele gegevens;</li>
              <li>het geheimhouden van inloggegevens;</li>
              <li>alle handelingen die via het account plaatsvinden.</li>
            </ul>
            <p className="mb-4">
              Het is niet toegestaan een account over te dragen of ter beschikking te stellen aan derden.
            </p>
            <p className="mb-6">
              ZZP.CV is gerechtigd accounts te blokkeren of te beëindigen bij misbruik of overtreding van deze voorwaarden.
            </p>

            <h2 className="text-2xl font-bold mt-8 mb-4">Artikel 5 – Gebruikerscontent</h2>
            <p className="mb-4">
              De gebruiker is volledig verantwoordelijk voor de inhoud, juistheid en rechtmatigheid van de geplaatste gebruikerscontent.
            </p>
            <p className="mb-4">Het is niet toegestaan gebruikerscontent te plaatsen die:</p>
            <ul className="list-disc list-inside mb-4 space-y-2">
              <li>in strijd is met wet- of regelgeving;</li>
              <li>inbreuk maakt op rechten van derden;</li>
              <li>onrechtmatig, misleidend, discriminerend of schadelijk is.</li>
            </ul>
            <p className="mb-6">
              Door het plaatsen van gebruikerscontent verleent de gebruiker aan ZZP.CV een niet-exclusief, wereldwijd en kosteloos gebruiksrecht om deze content technisch te verwerken, op te slaan en weer te geven ten behoeve van de dienstverlening.
            </p>

            <h2 className="text-2xl font-bold mt-8 mb-4">Artikel 6 – Publicatie en zichtbaarheid</h2>
            <p className="mb-4">
              Tijdens de free trial en bij een actief abonnement kan een persoonlijke website publiek toegankelijk zijn via een unieke URL.
            </p>
            <p className="mb-4">De gebruiker is zelf verantwoordelijk voor:</p>
            <ul className="list-disc list-inside mb-4 space-y-2">
              <li>de zichtbaarheid van de website;</li>
              <li>het delen van de URL met derden;</li>
              <li>de gevolgen van openbare publicatie.</li>
            </ul>
            <p className="mb-6">
              ZZP.CV is niet verantwoordelijk voor het gebruik van openbaar gepubliceerde informatie door derden.
            </p>

            <h2 className="text-2xl font-bold mt-8 mb-4">Artikel 7 – Free trial (proefperiode)</h2>
            <ul className="list-disc list-inside mb-6 space-y-2">
              <li>Na registratie krijgt de gebruiker automatisch toegang tot een gratis proefperiode van drie (3) kalenderdagen.</li>
              <li>Tijdens de free trial kan de gebruiker het platform verkennen en een persoonlijke website aanmaken en publiceren.</li>
              <li>Aan de free trial zijn geen kosten verbonden en er worden geen betaalgegevens gevraagd bij aanvang.</li>
              <li>De free trial geeft geen recht op blijvende publicatie van de website.</li>
              <li>ZZP.CV informeert de gebruiker vóór het aflopen van de free trial.</li>
            </ul>

            <h2 className="text-2xl font-bold mt-8 mb-4">Artikel 8 – Abonnement en betaling</h2>
            <ul className="list-disc list-inside mb-6 space-y-2">
              <li>Voor het actief publiceren en online houden van een persoonlijke website is een betaald abonnement vereist.</li>
              <li>Het abonnement heeft een looptijd van één (1) jaar.</li>
              <li>Na afloop van de free trial dient de gebruiker zelf actief een abonnement af te sluiten.</li>
              <li>Indien geen abonnement wordt afgesloten:</li>
            </ul>
            <ul className="list-disc list-inside mb-4 ml-6 space-y-2">
              <li>wordt de website offline gehaald;</li>
              <li>vervalt de publieke toegankelijkheid van de URL.</li>
            </ul>
            <p className="mb-6">
              Ingevoerde gegevens blijven tijdelijk opgeslagen conform het privacybeleid.
            </p>

            <h2 className="text-2xl font-bold mt-8 mb-4">Artikel 9 – Betaling en app-store aankopen</h2>
            <ul className="list-disc list-inside mb-6 space-y-2">
              <li>Betaling van het abonnement vindt plaats via in-app aankopen via Apple App Store of Google Play Store.</li>
              <li>Abonnementskosten worden vooraf in rekening gebracht.</li>
              <li>ZZP.CV is geen partij bij de betalingsverwerking en is niet verantwoordelijk voor het betaalproces van Apple of Google.</li>
            </ul>

            <h2 className="text-2xl font-bold mt-8 mb-4">Artikel 10 – Looptijd, verlenging en opzegging</h2>
            <ul className="list-disc list-inside mb-6 space-y-2">
              <li>Abonnementen worden automatisch verlengd voor telkens één (1) jaar, tenzij tijdig wordt opgezegd.</li>
              <li>Opzegging kan op ieder moment plaatsvinden via de betreffende app-store en gaat in aan het einde van de lopende abonnementsperiode.</li>
              <li>Bij tussentijdse opzegging vindt geen restitutie van reeds betaalde bedragen plaats.</li>
            </ul>

            <h2 className="text-2xl font-bold mt-8 mb-4">Artikel 11 – Verboden gebruik</h2>
            <p className="mb-4">Het is niet toegestaan het platform te gebruiken voor:</p>
            <ul className="list-disc list-inside mb-6 space-y-2">
              <li>onrechtmatige of frauduleuze doeleinden;</li>
              <li>spam of ongewenste communicatie;</li>
              <li>het verzamelen of misbruiken van gegevens van derden;</li>
              <li>handelingen die de werking van het platform verstoren.</li>
            </ul>

            <h2 className="text-2xl font-bold mt-8 mb-4">Artikel 12 – Intellectuele eigendom</h2>
            <ul className="list-disc list-inside mb-6 space-y-2">
              <li>Alle intellectuele eigendomsrechten met betrekking tot het platform berusten bij ZZP.CV of haar licentiegevers.</li>
              <li>Zonder voorafgaande schriftelijke toestemming is het niet toegestaan onderdelen van het platform te kopiëren, reproduceren of hergebruiken.</li>
            </ul>

            <h2 className="text-2xl font-bold mt-8 mb-4">Artikel 13 – Aansprakelijkheid</h2>
            <ul className="list-disc list-inside mb-6 space-y-2">
              <li>ZZP.CV is niet aansprakelijk voor indirecte schade, gevolgschade, gederfde winst of verlies van gegevens.</li>
              <li>De totale aansprakelijkheid van ZZP.CV is beperkt tot het bedrag dat de gebruiker in de twaalf (12) maanden voorafgaand aan het schadevoorval heeft betaald, met een maximum van € 250,-.</li>
              <li>ZZP.CV is niet aansprakelijk voor handelingen of nalatigheid van derden.</li>
            </ul>

            <h2 className="text-2xl font-bold mt-8 mb-4">Artikel 14 – Beëindiging</h2>
            <p className="mb-4">De gebruiker kan het account op ieder moment zelf verwijderen.</p>
            <p className="mb-4">ZZP.CV kan de overeenkomst beëindigen bij:</p>
            <ul className="list-disc list-inside mb-4 space-y-2">
              <li>overtreding van deze voorwaarden;</li>
              <li>misbruik van het platform;</li>
              <li>wettelijke verplichtingen.</li>
            </ul>
            <p className="mb-6">
              Bij beëindiging worden persoonsgegevens verwerkt conform het privacybeleid.
            </p>

            <h2 className="text-2xl font-bold mt-8 mb-4">Artikel 15 – Privacy en gegevensbescherming</h2>
            <p className="mb-6">
              De verwerking van persoonsgegevens vindt plaats conform het geldende Privacy Policy van ZZP.CV, dat integraal onderdeel uitmaakt van deze voorwaarden.
            </p>

            <h2 className="text-2xl font-bold mt-8 mb-4">Artikel 16 – Wijzigingen</h2>
            <ul className="list-disc list-inside mb-6 space-y-2">
              <li>ZZP.CV behoudt zich het recht voor deze algemene voorwaarden te wijzigen.</li>
              <li>Wijzigingen worden van kracht na publicatie op de website.</li>
              <li>Voortgezet gebruik van het platform geldt als aanvaarding van de gewijzigde voorwaarden.</li>
            </ul>

            <h2 className="text-2xl font-bold mt-8 mb-4">Artikel 17 – Overmacht</h2>
            <p className="mb-6">
              ZZP.CV is niet gehouden tot het nakomen van verplichtingen indien sprake is van overmacht, waaronder storingen in internet, infrastructuur, hosting of externe diensten.
            </p>

            <h2 className="text-2xl font-bold mt-8 mb-4">Artikel 18 – Toepasselijk recht en geschillen</h2>
            <ul className="list-disc list-inside mb-6 space-y-2">
              <li>Op deze algemene voorwaarden is uitsluitend Nederlands recht van toepassing.</li>
              <li>Geschillen worden voorgelegd aan de bevoegde rechter in Nederland.</li>
            </ul>

            <h2 className="text-2xl font-bold mt-8 mb-4">Artikel 19 – Slotbepaling</h2>
            <p className="mb-6">
              Indien één of meer bepalingen ongeldig blijken, blijven de overige bepalingen onverminderd van kracht.
            </p>
          </article>
        </div>
      </main>

      <Footer />
    </div>
  );
}

