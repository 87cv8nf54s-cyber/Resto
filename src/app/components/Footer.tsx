import Image from 'next/image';

export default function Footer() {
  return (
    <footer className="border-t bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center mb-4">
              <Image
                src="/logo.png"
                alt="ZZPCV Logo"
                width={120}
                height={40}
                className="h-8 w-auto"
              />
            </div>
            <p className="text-sm text-muted-foreground max-w-md">
              Zichtbaar zelfstandig. Snel en volledig in control.
            </p>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-foreground mb-4">Navigatie</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <a href="/" className="hover:text-foreground transition-colors">
                  Home
                </a>
              </li>
              <li>
                <a href="/templates" className="hover:text-foreground transition-colors">
                  Templates
                </a>
              </li>
              <li>
                <a href="/pricing" className="hover:text-foreground transition-colors">
                  Prijzen
                </a>
              </li>
              <li>
                <a href="/faq" className="hover:text-foreground transition-colors">
                  FAQ
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-foreground mb-4">Contact</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <a href="mailto:info@zzpcv.nl" className="hover:text-foreground transition-colors">
                  info@zzpcv.nl
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t text-sm text-muted-foreground text-center">
          <p>&copy; {new Date().getFullYear()} ZZPCV. Alle rechten voorbehouden.</p>
          <div className="mt-2 flex flex-wrap justify-center gap-4">
            <a href="/privacy" className="hover:text-foreground transition-colors underline">
              Privacy Policy
            </a>
            <span>|</span>
            <a href="/terms" className="hover:text-foreground transition-colors underline">
              Algemene Voorwaarden
            </a>
            <span>|</span>
            <a href="/delete-account" className="hover:text-foreground transition-colors underline">
              Account Verwijderen
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
