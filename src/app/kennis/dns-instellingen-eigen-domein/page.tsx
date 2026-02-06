import Navigation from '../../components/Navigation';
import Footer from '../../components/Footer';
import Link from 'next/link';

export default function DNSInstellingenEigenDomeinPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      
      <main className="flex-1">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <article className="max-w-none">
            <Link href="/faq#kennis" className="text-primary hover:underline text-sm mb-4 inline-block">
              ← Terug naar FAQ
            </Link>
            
            <h1 className="text-4xl font-bold mb-8">DNS-instellingen voor je eigen domein configureren</h1>

            <div className="prose prose-lg max-w-none">
              <p className="text-lg text-muted-foreground mb-6">
                Heb je al een domein gekocht bij een hostingpartij en wil je dit koppelen aan je ZZPCV website? Dan moet je de DNS-instellingen aanpassen bij je hostingpartij. Dit is een eenvoudige handeling die je zelf kunt uitvoeren.
              </p>

              <h2 className="text-2xl font-bold mt-8 mb-4">Welke DNS-records moet je aanpassen?</h2>
              <p className="mb-4">
                Om je eigen domein te koppelen aan je ZZPCV website, moet je twee A-records toevoegen of aanpassen bij je hostingpartij:
              </p>
              
              <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 mb-6">
                <h3 className="text-lg font-semibold mb-4">A-record 1:</h3>
                <ul className="list-none space-y-2 mb-4">
                  <li><strong>Naam:</strong> @ (of leeg laten, afhankelijk van je hostingpartij)</li>
                  <li><strong>Type:</strong> A</li>
                  <li><strong>Waarde:</strong> 167.172.44.51</li>
                  <li><strong>TTL:</strong> 3600 (of automatisch)</li>
                </ul>
                
                <h3 className="text-lg font-semibold mb-4 mt-6">A-record 2:</h3>
                <ul className="list-none space-y-2">
                  <li><strong>Naam:</strong> www</li>
                  <li><strong>Type:</strong> A</li>
                  <li><strong>Waarde:</strong> 167.172.44.51</li>
                  <li><strong>TTL:</strong> 3600 (of automatisch)</li>
                </ul>
              </div>

              <h2 className="text-2xl font-bold mt-8 mb-4">Hoe pas je DNS-instellingen aan?</h2>
              <p className="mb-4">
                De exacte stappen verschillen per hostingpartij, maar het proces is over het algemeen hetzelfde:
              </p>
              
              <ol className="list-decimal list-inside space-y-3 mb-6 ml-4">
                <li>Log in op het beheerpaneel van je hostingpartij (waar je je domein hebt gekocht)</li>
                <li>Navigeer naar de DNS-instellingen of DNS-beheer sectie</li>
                <li>Zoek naar de bestaande A-records voor @ en www</li>
                <li>Pas de waarde van beide A-records aan naar <strong>167.172.44.51</strong>, of voeg nieuwe A-records toe als ze nog niet bestaan</li>
                <li>Sla de wijzigingen op</li>
              </ol>

              <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mb-6 rounded-r">
                <p className="text-sm">
                  <strong>Let op:</strong> DNS-wijzigingen kunnen tot 48 uur duren voordat ze wereldwijd actief zijn, maar meestal werkt het binnen enkele uren. Je kunt de status controleren met online DNS-check tools.
                </p>
              </div>

              <h2 className="text-2xl font-bold mt-8 mb-4">Stapsgewijze instructies per hostingpartij</h2>
              <p className="mb-6">
                Elke hostingpartij heeft een eigen interface, maar de basisprincipes zijn hetzelfde. Hieronder vind je links naar de specifieke instructies van de grootste hostingpartijen in Nederland:
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                <a 
                  href="https://helpdesk.hostnet.nl/hc/nl-nl/articles/360014581437-DNS-wijzigen" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="border border-gray-200 rounded-lg p-6 hover:border-primary hover:shadow-md transition-all group"
                >
                  <h3 className="text-lg font-semibold mb-2 group-hover:text-primary transition-colors">
                    Hostnet
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Bekijk de stapsgewijze instructies voor het aanpassen van DNS-records bij Hostnet.
                  </p>
                </a>

                <a 
                  href="https://www.transip.nl/knowledgebase/dns/305-dns-nameservers-aanpassen-via-controlepaneel" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="border border-gray-200 rounded-lg p-6 hover:border-primary hover:shadow-md transition-all group"
                >
                  <h3 className="text-lg font-semibold mb-2 group-hover:text-primary transition-colors">
                    TransIP
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Lees hoe je DNS-records aanpast in het TransIP controlepaneel.
                  </p>
                </a>

                <a 
                  href="https://mijndomein.zendesk.com/hc/nl/articles/8662529546769-DNS-Instellen" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="border border-gray-200 rounded-lg p-6 hover:border-primary hover:shadow-md transition-all group"
                >
                  <h3 className="text-lg font-semibold mb-2 group-hover:text-primary transition-colors">
                    Mijndomein
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Volg de handleiding voor het wijzigen van DNS-records bij Mijndomein.
                  </p>
                </a>

                <a 
                  href="https://www.strato.nl/faq/domeinnaam/welke-dns-items-kun-je-bij-STRATO-configureren/#waar" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="border border-gray-200 rounded-lg p-6 hover:border-primary hover:shadow-md transition-all group"
                >
                  <h3 className="text-lg font-semibold mb-2 group-hover:text-primary transition-colors">
                    Strato
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Bekijk de instructies voor het aanpassen van DNS-records in het Strato controlepaneel.
                  </p>
                </a>
              </div>

              <h2 className="text-2xl font-bold mt-8 mb-4">Na het aanpassen van de DNS-instellingen</h2>
              <p className="mb-4">
                Zodra je de DNS-records hebt aangepast:
              </p>
              <ul className="list-disc list-inside space-y-2 mb-6 ml-4">
                <li>Wacht tot de DNS-wijzigingen zijn doorgevoerd (meestal binnen enkele uren)</li>
                <li>Controleer in de ZZPCV app of je domein correct is gekoppeld</li>
                <li>Test of je website bereikbaar is via je eigen domein (zowel met als zonder www)</li>
              </ul>

              <p className="mb-6">
                Heb je vragen of loop je tegen problemen aan? Neem dan contact op met de support van je hostingpartij of raadpleeg hun kennisbank voor aanvullende hulp.
              </p>
            </div>
          </article>
        </div>
      </main>

      <Footer />
    </div>
  );
}
