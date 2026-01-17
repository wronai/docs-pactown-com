'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { Search, ExternalLink, ArrowRight } from 'lucide-react';
import { ROUTE_MAPPINGS, findRoute, getRedirectUrl, RouteMapping } from '@/lib/routes';

export default function HomePage() {
  const searchParams = useSearchParams();
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<RouteMapping[]>([]);
  const [redirecting, setRedirecting] = useState(false);

  // Handle ?q= parameter
  useEffect(() => {
    const q = searchParams.get('q');
    if (q) {
      const redirectUrl = getRedirectUrl(q);
      if (redirectUrl) {
        setRedirecting(true);
        window.location.href = redirectUrl;
      } else {
        setQuery(q);
      }
    }
  }, [searchParams]);

  // Search functionality
  useEffect(() => {
    if (query.length < 2) {
      setResults([]);
      return;
    }

    const normalizedQuery = query.toLowerCase();
    const filtered = ROUTE_MAPPINGS.filter(mapping => 
      mapping.keywords.some(k => k.includes(normalizedQuery)) ||
      mapping.title.toLowerCase().includes(normalizedQuery) ||
      mapping.description.toLowerCase().includes(normalizedQuery)
    );
    setResults(filtered.slice(0, 10));
  }, [query]);

  if (redirecting) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Przekierowywanie...</p>
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen">
      {/* Header */}
      <header className="bg-white border-b">
        <div className="max-w-4xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Pactown Docs</h1>
              <p className="text-gray-600 text-sm">Dokumentacja platformy</p>
            </div>
            <a 
              href="https://pactown.com" 
              className="flex items-center gap-2 text-blue-600 hover:text-blue-800"
            >
              Przejdź do Pactown
              <ExternalLink className="w-4 h-4" />
            </a>
          </div>
        </div>
      </header>

      {/* Search */}
      <section className="bg-gradient-to-b from-blue-50 to-white py-12">
        <div className="max-w-2xl mx-auto px-4">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Szukaj funkcji... np. 'nowy projekt', 'ustawienia'"
              className="w-full pl-12 pr-4 py-4 rounded-xl border border-gray-200 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg"
            />
          </div>

          {/* Search Results */}
          {results.length > 0 && (
            <div className="mt-4 bg-white rounded-xl border shadow-lg overflow-hidden">
              {results.map((result, idx) => (
                <a
                  key={idx}
                  href={`https://pactown.com${result.route}`}
                  className="flex items-center justify-between p-4 hover:bg-gray-50 border-b last:border-b-0"
                >
                  <div>
                    <div className="font-medium text-gray-900">{result.title}</div>
                    <div className="text-sm text-gray-500">{result.description}</div>
                    <div className="text-xs text-blue-600 mt-1">
                      pactown.com{result.route}
                    </div>
                  </div>
                  <ArrowRight className="w-5 h-5 text-gray-400" />
                </a>
              ))}
            </div>
          )}

          {/* No results */}
          {query.length >= 2 && results.length === 0 && (
            <div className="mt-4 bg-white rounded-xl border p-6 text-center">
              <p className="text-gray-600">Nie znaleziono wyników dla "{query}"</p>
              <p className="text-sm text-gray-500 mt-2">
                Spróbuj innych słów kluczowych lub przejrzyj kategorie poniżej
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Quick Links */}
      <section className="py-12">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-xl font-semibold mb-6">Szybkie linki</h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {/* Auth */}
            <div className="bg-white rounded-xl border p-6">
              <h3 className="font-semibold text-gray-900 mb-3">Konto</h3>
              <ul className="space-y-2">
                <li>
                  <a href="https://pactown.com/?q=logowanie" className="text-blue-600 hover:underline text-sm">
                    → Logowanie
                  </a>
                </li>
                <li>
                  <a href="https://pactown.com/?q=rejestracja" className="text-blue-600 hover:underline text-sm">
                    → Rejestracja
                  </a>
                </li>
                <li>
                  <a href="https://pactown.com/?q=ustawienia-konta" className="text-blue-600 hover:underline text-sm">
                    → Ustawienia konta
                  </a>
                </li>
              </ul>
            </div>

            {/* Projects */}
            <div className="bg-white rounded-xl border p-6">
              <h3 className="font-semibold text-gray-900 mb-3">Projekty</h3>
              <ul className="space-y-2">
                <li>
                  <a href="https://pactown.com/?q=nowy-projekt" className="text-blue-600 hover:underline text-sm">
                    → Utwórz projekt
                  </a>
                </li>
                <li>
                  <a href="https://pactown.com/?q=projekty" className="text-blue-600 hover:underline text-sm">
                    → Lista projektów
                  </a>
                </li>
                <li>
                  <a href="https://pactown.com/?q=edytor" className="text-blue-600 hover:underline text-sm">
                    → Edytor Markdown
                  </a>
                </li>
              </ul>
            </div>

            {/* Help */}
            <div className="bg-white rounded-xl border p-6">
              <h3 className="font-semibold text-gray-900 mb-3">Pomoc</h3>
              <ul className="space-y-2">
                <li>
                  <a href="https://pactown.com/?q=dokumentacja" className="text-blue-600 hover:underline text-sm">
                    → Dokumentacja
                  </a>
                </li>
                <li>
                  <a href="https://pactown.com/?q=cennik" className="text-blue-600 hover:underline text-sm">
                    → Cennik
                  </a>
                </li>
                <li>
                  <a href="https://pactown.com/?q=api-docs" className="text-blue-600 hover:underline text-sm">
                    → API Reference
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Info about ?q= */}
      <section className="py-12 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-xl font-semibold mb-4">Jak działają linki ?q=</h2>
          <div className="bg-white rounded-xl border p-6">
            <p className="text-gray-700 mb-4">
              Możesz tworzyć linki do Pactown używając parametru <code className="bg-gray-100 px-2 py-1 rounded">?q=</code>. 
              System automatycznie przekieruje do odpowiedniej funkcjonalności.
            </p>
            <div className="bg-gray-50 rounded-lg p-4 font-mono text-sm">
              <div className="mb-2">
                <span className="text-gray-500">// Link do tworzenia projektu:</span>
              </div>
              <div className="text-blue-600">
                https://pactown.com/?q=utworz-projekt
              </div>
              <div className="mt-4 mb-2">
                <span className="text-gray-500">// Link do ustawień:</span>
              </div>
              <div className="text-blue-600">
                https://pactown.com/?q=ustawienia
              </div>
            </div>
            <p className="text-sm text-gray-500 mt-4">
              Te linki działają nawet gdy wewnętrzne ścieżki ulegną zmianie.
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 border-t">
        <div className="max-w-4xl mx-auto px-4 text-center text-gray-500 text-sm">
          © 2026 Pactown. Wszelkie prawa zastrzeżone.
        </div>
      </footer>
    </main>
  );
}
