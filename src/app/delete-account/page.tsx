import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
import { Mail } from 'lucide-react';

export default function DeleteAccountPage() {
  const emailAddress = 'info@zzpcv.nl';
  const subject = 'Verzoek tot verwijdering account';
  const emailBody = encodeURIComponent(`Beste ZZPCV team,

Ik verzoek om verwijdering van mijn account en alle bijbehorende persoonsgegevens.

Reden voor verwijdering:
[Geef hier uw reden op]

Ik bevestig dat dit verzoek wordt ingediend vanaf het e-mailadres dat gekoppeld is aan mijn account.

Met vriendelijke groet,
[Uw naam]`);

  const mailtoLink = `mailto:${emailAddress}?subject=${encodeURIComponent(subject)}&body=${emailBody}`;

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      
      <main className="flex-1">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="bg-white rounded-lg shadow-lg p-8 sm:p-12">
            <h1 className="text-4xl font-bold text-foreground mb-4">
              Account Verwijderen
            </h1>
            <p className="text-sm text-muted-foreground mb-8">
              Laatst bijgewerkt: {new Date().toLocaleDateString('nl-NL', { year: 'numeric', month: 'long', day: 'numeric' })}
            </p>

            <div className="prose prose-lg max-w-none mb-8">
              <p className="text-lg text-muted-foreground mb-6">
                Wij respecteren uw recht om uw account en persoonsgegevens te laten verwijderen in overeenstemming met de Algemene Verordening Gegevensbescherming (AVG/GDPR).
              </p>

              <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-6">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <svg className="h-5 w-5 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div className="ml-3">
                    <p className="text-sm text-yellow-700">
                      <strong>Belangrijk:</strong> Uw verzoek kan alleen worden verwerkt als het wordt ingediend vanaf het e-mailadres dat gekoppeld is aan uw account. Dit is nodig om uw identiteit te verifiëren en uw privacy te beschermen.
                    </p>
                  </div>
                </div>
              </div>

              <h2 className="text-2xl font-bold mt-8 mb-4">Hoe werkt het verwijderingsproces?</h2>
              <ol className="list-decimal list-inside space-y-3 mb-6">
                <li>
                  <strong>Stuur een e-mail</strong> naar ons met uw verzoek tot accountverwijdering
                </li>
                <li>
                  <strong>Vermeld de reden</strong> voor uw verzoek (dit helpt ons onze service te verbeteren)
                </li>
                <li>
                  <strong>Verificatie:</strong> Wij zullen uw identiteit verifiëren door te controleren of het e-mailadres overeenkomt met het account
                </li>
                <li>
                  <strong>Verwerking:</strong> Na verificatie zullen wij uw account en alle bijbehorende gegevens binnen 30 dagen verwijderen
                </li>
              </ol>

              <h2 className="text-2xl font-bold mt-8 mb-4">Wat wordt er verwijderd?</h2>
              <p className="mb-4">Bij verwijdering van uw account worden de volgende gegevens permanent verwijderd:</p>
              <ul className="list-disc list-inside space-y-2 mb-6">
                <li>Uw accountgegevens en profielinformatie</li>
                <li>Uw CV-template en alle ingevoerde gegevens</li>
                <li>Uw abonnementsgegevens</li>
                <li>Alle andere persoonsgegevens die aan uw account zijn gekoppeld</li>
              </ul>

              <div className="bg-blue-50 border-l-4 border-blue-400 p-4 mb-6">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <svg className="h-5 w-5 text-blue-400" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div className="ml-3">
                    <p className="text-sm text-blue-700">
                      <strong>Let op:</strong> Sommige gegevens kunnen worden bewaard indien dit wettelijk verplicht is (bijvoorbeeld voor belastingdoeleinden). Wij zullen u hierover informeren indien van toepassing.
                    </p>
                  </div>
                </div>
              </div>

              <h2 className="text-2xl font-bold mt-8 mb-4">Verzoek indienen</h2>
              <p className="mb-4">
                Klik op de onderstaande knop om een e-mail te openen met een vooraf ingevuld verzoek. <strong>Zorg ervoor dat u deze e-mail verzendt vanaf het e-mailadres dat gekoppeld is aan uw account.</strong>
              </p>
              <p className="mb-6 text-muted-foreground">
                <strong>Graag verzoeken wij u om een reden voor de verwijdering op te geven.</strong> Dit helpt ons om onze service te verbeteren en eventuele problemen op te lossen.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 items-center">
                <a
                  href={mailtoLink}
                  className="inline-flex items-center justify-center rounded-md bg-primary px-8 py-3 text-base font-medium text-primary-foreground shadow-sm transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                >
                  <Mail className="w-5 h-5 mr-2" />
                  Verstuur Verwijderingsverzoek
                </a>
                <p className="text-sm text-muted-foreground">
                  Of stuur een e-mail naar{' '}
                  <a href={`mailto:${emailAddress}?subject=${encodeURIComponent(subject)}`} className="text-primary hover:underline">
                    {emailAddress}
                  </a>
                </p>
              </div>

              <div className="mt-8 pt-8 border-t">
                <h2 className="text-2xl font-bold mb-4">Vragen?</h2>
                <p className="mb-4">
                  Heeft u vragen over het verwijderingsproces of wilt u meer informatie? Neem dan contact met ons op via{' '}
                  <a href={`mailto:${emailAddress}`} className="text-primary hover:underline">
                    {emailAddress}
                  </a>
                  {' '}of bekijk onze{' '}
                  <a href="/privacy" className="text-primary hover:underline">
                    Privacy Policy
                  </a>
                  {' '}voor meer informatie over hoe wij omgaan met uw gegevens.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
