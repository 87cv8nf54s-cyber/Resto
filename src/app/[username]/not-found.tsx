import Link from "next/link";

export default function NotFound() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-background">
      <div className="text-center px-4">
        <h1 className="text-6xl font-bold text-accent mb-4">404</h1>
        <h2 className="text-2xl font-medium text-foreground mb-2">
          Gebruiker niet gevonden
        </h2>
        <p className="text-muted mb-8">
          Deze pagina bestaat niet of is niet meer beschikbaar.
        </p>
        <Link
          href="/"
          className="inline-block px-6 py-3 bg-accent text-white rounded-lg hover:bg-accent-dark transition-colors"
        >
          Terug naar home
        </Link>
      </div>
    </main>
  );
}
