import Navigation from '../components/Navigation';
import Footer from '../components/Footer';

export default function PrivacyPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      
      <main className="flex-1">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <article className="max-w-none">
            <h1 className="text-4xl font-bold mb-2">Privacy Policy – ZZP.CV</h1>
            <p className="text-sm text-muted-foreground mb-8">
              Versie: 1.0<br />
              Laatst bijgewerkt: 6 januari 2026
            </p>

            <p className="text-lg text-muted-foreground mb-4">
              ZZP.CV verwerkt persoonsgegevens met de grootst mogelijke zorgvuldigheid en in overeenstemming met de Algemene Verordening Gegevensbescherming (AVG/GDPR). In dit privacybeleid wordt uiteengezet welke persoonsgegevens worden verwerkt, voor welke doeleinden, op welke grondslagen, hoe lang deze worden bewaard en welke rechten betrokkenen hebben.
            </p>

            <p className="mb-6">
              Dit privacybeleid is van toepassing op alle huidige en toekomstige diensten, websites, applicaties, functionaliteiten en platformonderdelen van ZZP.CV.
            </p>

            <h2 className="text-2xl font-bold mt-8 mb-4">1. Verwerkingsverantwoordelijke</h2>
            <p className="mb-4">
              ZZP.CV<br />
              Eenmanszaak<br />
              KvK-nummer: 87647338<br />
              Vestigingsnummer: 000053550099<br />
              📧 info@zzpcv.nl
            </p>
            <p className="mb-6">
              ZZP.CV is verwerkingsverantwoordelijke in de zin van artikel 4 lid 7 AVG.
            </p>

            <h2 className="text-2xl font-bold mt-8 mb-4">2. Reikwijdte van dit privacybeleid</h2>
            <p className="mb-4">Dit privacybeleid is van toepassing op:</p>
            <ul className="list-disc list-inside mb-6 space-y-2">
              <li>bezoekers van de website zzpcv.nl</li>
              <li>geregistreerde gebruikers</li>
              <li>zelfstandige professionals (zzp&apos;ers) die gebruikmaken van het platform</li>
              <li>alle communicatie met ZZP.CV</li>
              <li>toekomstige functionaliteiten die logisch voortvloeien uit de aard en doelstelling van het platform</li>
            </ul>

            <h2 className="text-2xl font-bold mt-8 mb-4">3. Categorieën persoonsgegevens</h2>

            <h3 className="text-xl font-semibold mt-6 mb-3">3.1 Gebruikerscontent en professionele profielgegevens</h3>
            <p className="mb-4">ZZP.CV verwerkt persoonsgegevens die door de gebruiker zelf worden ingevoerd bij het aanmaken en beheren van een profiel of CV-template, waaronder:</p>
            <ul className="list-disc list-inside mb-4 space-y-2">
              <li>Voor- en achternaam</li>
              <li>Bedrijfsnaam</li>
              <li>Functietitel(s) en beroepsomschrijving</li>
              <li>Bio, samenvatting of professionele introductie</li>
              <li>Werkervaring (rollen, organisaties, periodes)</li>
              <li>Opleidingen, cursussen en certificaten</li>
              <li>Portfolio-informatie</li>
              <li>Profielfoto en/of bedrijfslogo (optioneel)</li>
              <li>Contactgegevens (zoals e-mailadres, telefoonnummer, website of LinkedIn-profiel)</li>
            </ul>
            <p className="mb-6">Deze gegevens vormen gezamenlijk de professionele presentatie van de gebruiker en kunnen publiek toegankelijk zijn via een door de gebruiker gegenereerde URL.</p>

            <h3 className="text-xl font-semibold mt-6 mb-3">3.2 Account- en authenticatiegegevens</h3>
            <p className="mb-4">Voor het gebruik van het platform is een gebruikersaccount vereist. Daarbij worden verwerkt:</p>
            <ul className="list-disc list-inside mb-6 space-y-2">
              <li>E-mailadres</li>
              <li>Gebruikersnaam</li>
              <li>Versleuteld wachtwoord</li>
              <li>Authenticatie- en sessiegegevens</li>
              <li>Tijdelijke verificatie- en reset-tokens</li>
            </ul>

            <h3 className="text-xl font-semibold mt-6 mb-3">3.3 Technische en gebruiksgegevens</h3>
            <p className="mb-4">Bij gebruik van de website en applicatie worden automatisch gegevens verwerkt, waaronder:</p>
            <ul className="list-disc list-inside mb-6 space-y-2">
              <li>IP-adres</li>
              <li>Browser- en apparaattype</li>
              <li>Besturingssysteem</li>
              <li>Datum, tijdstip en duur van sessies</li>
              <li>Pagina-interacties</li>
              <li>Logbestanden en foutmeldingen</li>
            </ul>

            <h3 className="text-xl font-semibold mt-6 mb-3">3.4 Communicatiegegevens</h3>
            <p className="mb-4">Indien contact wordt opgenomen met ZZP.CV worden verwerkt:</p>
            <ul className="list-disc list-inside mb-6 space-y-2">
              <li>Naam</li>
              <li>E-mailadres</li>
              <li>Inhoud van correspondentie</li>
              <li>Metadata van communicatie (zoals datum en tijdstip)</li>
            </ul>

            <h2 className="text-2xl font-bold mt-8 mb-4">4. Doeleinden van de verwerking</h2>
            <p className="mb-4">ZZP.CV verwerkt persoonsgegevens voor de volgende doeleinden:</p>
            <ul className="list-disc list-inside mb-4 space-y-2">
              <li>Het aanmaken, beheren, opslaan en publiceren van professionele profielen en CV-templates</li>
              <li>Het faciliteren van digitale profilering en online zichtbaarheid van zelfstandige professionals</li>
              <li>Het aanbieden, onderhouden en doorontwikkelen van het ZZP.CV-platform</li>
              <li>Het mogelijk maken van relevante platformfunctionaliteiten</li>
              <li>Het onderhouden van een professionele relatie met gebruikers</li>
              <li>Het informeren van gebruikers over platformontwikkelingen, updates en relevante informatie</li>
              <li>Het uitvoeren van analyses en optimalisaties die aansluiten bij professioneel profielgebruik</li>
              <li>Beveiliging, monitoring, fraudepreventie en misbruikdetectie</li>
              <li>Het voldoen aan wettelijke verplichtingen</li>
            </ul>
            <p className="mb-6">
              De verwerking blijft te allen tijde verenigbaar met het oorspronkelijke doel van verzameling.
            </p>

            <h3 className="text-xl font-semibold mt-6 mb-3">4.1 Profiel- en contextgerelateerde communicatie</h3>
            <p className="mb-4">ZZP.CV kan gebruikers benaderen via in-app en push notificaties met informatie die verband houdt met:</p>
            <ul className="list-disc list-inside mb-4 space-y-2">
              <li>het gebruik van het platform</li>
              <li>ontwikkelingen binnen ZZP.CV</li>
              <li>professioneel relevante informatie passend bij zelfstandige professionals</li>
            </ul>
            <p className="mb-6">
              Deze communicatie is gebaseerd op inhoudelijke relevantie en redelijke verwachtingen van de gebruiker. Gebruikers kunnen hiertegen te allen tijde bezwaar maken.
            </p>

            <h2 className="text-2xl font-bold mt-8 mb-4">5. Rechtsgrondslagen (artikel 6 AVG)</h2>
            <p className="mb-4">De verwerking van persoonsgegevens vindt plaats op basis van:</p>
            <ul className="list-disc list-inside mb-4 space-y-2">
              <li><strong>Uitvoering van een overeenkomst</strong></li>
              <li><strong>Toestemming</strong>, waar vereist</li>
              <li><strong>Wettelijke verplichtingen</strong></li>
              <li><strong>Gerechtvaardigd belang</strong>, waaronder:</li>
            </ul>
            <ul className="list-disc list-inside mb-4 ml-6 space-y-2">
              <li>doorontwikkeling en optimalisatie van het platform</li>
              <li>het onderhouden van een professionele gebruikersrelatie</li>
              <li>het aanbieden van relevante, profielgerelateerde informatie</li>
              <li>beveiliging en continuïteit van dienstverlening</li>
            </ul>
            <p className="mb-6">
              Bij verwerking op basis van gerechtvaardigd belang vindt steeds een zorgvuldige belangenafweging plaats.
            </p>

            <h2 className="text-2xl font-bold mt-8 mb-4">6. Cookies en vergelijkbare technieken</h2>
            <p className="mb-4">ZZP.CV maakt gebruik van:</p>
            <ul className="list-disc list-inside mb-4 space-y-2">
              <li><strong>Functionele cookies</strong> (voor correcte werking en authenticatie)</li>
              <li><strong>Analytische cookies (Google Analytics)</strong> voor inzicht in gebruik en prestatie</li>
            </ul>
            <p className="mb-6">
              Google Analytics wordt gebruikt op een privacyvriendelijke wijze. Er worden geen tracking- of advertentiecookies geplaatst zonder toestemming.
            </p>

            <h2 className="text-2xl font-bold mt-8 mb-4">7. Hosting en gegevensopslag binnen de EER</h2>
            <ul className="list-disc list-inside mb-6 space-y-2">
              <li>Alle persoonsgegevens worden verwerkt en opgeslagen binnen de Europese Economische Ruimte (EER)</li>
              <li>Hosting en infrastructuur worden door ZZP.CV zelf beheerd</li>
              <li>Er vindt geen doorgifte van persoonsgegevens plaats buiten de EER</li>
            </ul>

            <h2 className="text-2xl font-bold mt-8 mb-4">8. Externe dienstverleners</h2>
            <p className="mb-4">ZZP.CV maakt beperkt gebruik van externe verwerkers, waaronder:</p>
            <ul className="list-disc list-inside mb-4 space-y-2">
              <li>Resend – uitsluitend voor e-mailvalidatie bij accountregistratie</li>
            </ul>
            <p className="mb-6">
              Deze partijen verwerken persoonsgegevens uitsluitend in opdracht van ZZP.CV en niet voor eigen doeleinden.
            </p>

            <h2 className="text-2xl font-bold mt-8 mb-4">9. Bewaartermijnen</h2>
            <div className="overflow-x-auto mb-6">
              <table className="w-full border-collapse border border-gray-300">
              <thead>
                <tr className="bg-gray-100">
                  <th className="border border-gray-300 px-4 py-2 text-left">Gegevenstype</th>
                  <th className="border border-gray-300 px-4 py-2 text-left">Bewaartermijn</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-gray-300 px-4 py-2">Account- en profielgegevens</td>
                  <td className="border border-gray-300 px-4 py-2">Tot verwijdering door gebruiker</td>
                </tr>
                <tr>
                  <td className="border border-gray-300 px-4 py-2">Communicatie</td>
                  <td className="border border-gray-300 px-4 py-2">Maximaal 6 maanden</td>
                </tr>
                <tr>
                  <td className="border border-gray-300 px-4 py-2">Log- en beveiligingsgegevens</td>
                  <td className="border border-gray-300 px-4 py-2">Maximaal 6 maanden</td>
                </tr>
                <tr>
                  <td className="border border-gray-300 px-4 py-2">Back-ups</td>
                  <td className="border border-gray-300 px-4 py-2">Volgens beveiligde retentie</td>
                </tr>
              </tbody>
            </table>
            </div>
            <p className="mb-6">
              Bij verwijdering van een account worden persoonsgegevens direct verwijderd, tenzij wettelijke bewaarplichten anders vereisen.
            </p>

            <h2 className="text-2xl font-bold mt-8 mb-4">10. Beveiliging</h2>
            <p className="mb-4">ZZP.CV treft passende technische en organisatorische maatregelen, waaronder:</p>
            <ul className="list-disc list-inside mb-6 space-y-2">
              <li>SSL/TLS-versleuteling</li>
              <li>Versleutelde opslag van wachtwoorden</li>
              <li>Toegangsbeperkingen</li>
              <li>Logging en monitoring</li>
              <li>Regelmatige beveiligingsupdates</li>
            </ul>

            <h2 className="text-2xl font-bold mt-8 mb-4">11. Rechten van betrokkenen</h2>
            <p className="mb-4">Gebruikers hebben het recht op:</p>
            <ul className="list-disc list-inside mb-4 space-y-2">
              <li>inzage</li>
              <li>rectificatie</li>
              <li>verwijdering</li>
              <li>beperking van verwerking</li>
              <li>dataportabiliteit</li>
              <li>bezwaar tegen verwerking op basis van gerechtvaardigd belang</li>
            </ul>
            <p className="mb-4">Verzoeken kunnen worden ingediend via:</p>
            <p className="mb-6">📧 info@zzpcv.nl</p>

            <h2 className="text-2xl font-bold mt-8 mb-4">12. Klachten</h2>
            <p className="mb-6">
              Gebruikers hebben het recht een klacht in te dienen bij de Autoriteit Persoonsgegevens.
            </p>

            <h2 className="text-2xl font-bold mt-8 mb-4">13. Wijzigingen in dit privacybeleid</h2>
            <p className="mb-6">
              ZZP.CV behoudt zich het recht voor dit privacybeleid te wijzigen. Functionele en inhoudelijke uitbreidingen die binnen de reikwijdte van dit beleid vallen, kunnen worden doorgevoerd zonder voorafgaande herziening. De meest actuele versie is altijd beschikbaar via zzpcv.nl.
            </p>

            <h2 className="text-2xl font-bold mt-8 mb-4">Slotbepaling</h2>
            <p className="mb-6">
              ZZP.CV verkoopt geen persoonsgegevens aan derden en gebruikt gegevens uitsluitend in lijn met dit privacybeleid.
            </p>
          </article>
        </div>
      </main>

      <Footer />
    </div>
  );
}
