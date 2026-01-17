# Pactown Documentation Site

**URL:** `docs.pactown.com`

Dokumentacja dla użytkowników Pactown z inteligentnym systemem linkowania `?q=`.

## Funkcje

- **Smart linking** - linki z `?q=fraza` przekierowują do odpowiedniej funkcjonalności
- **Fuzzy search** - wyszukiwanie z tolerancją błędów
- **Route mapping** - mapowanie fraz na aktualne ścieżki routera
- **Future-proof** - zmiana routera nie psuje starych linków

## Jak działa ?q= linking

```
https://pactown.com/?q=utworz-projekt
→ automatyczne przekierowanie do /dashboard/projects/new

https://pactown.com/?q=ustawienia-konta
→ automatyczne przekierowanie do /settings/account

https://pactown.com/?q=logowanie-github
→ automatyczne przekierowanie do /sign-in?provider=github
```

## Development

```bash
npm install
npm run dev
# http://localhost:3002
```

## Struktura

```
docs-pactown-com/
├── content/           # Dokumentacja w Markdown
│   ├── getting-started/
│   ├── features/
│   └── api/
├── src/
│   ├── app/
│   ├── components/
│   └── lib/
│       ├── routes.ts      # Mapowanie ?q= na ścieżki
│       └── search.ts      # Fuzzy search
└── scripts/
    └── generate-routes.js # Generator mapowań z głównego repo
```-pactown-com