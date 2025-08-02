# KBJZR Blog

Blog technologiczny Jakuba Jeziorniskiego - COO Grupy Blix. Tematyka: zarządzanie produktem, technologia, AI i biznes.

## Stack technologiczny

- **Frontend**: React 18 + TypeScript + Vite
- **Styling**: TailwindCSS z custom "brutal" design system  
- **CMS**: TinaCMS (headless CMS)
- **Routing**: React Router DOM
- **UI Components**: Radix UI + shadcn/ui
- **Markdown**: markdown-to-jsx dla renderowania postów

## Aktualne funkcjonowanie

### ✅ Działające funkcjonalności
- **Główna strona**: Lista postów z TinaCMS w brutal design
- **Panel admina**: http://localhost:4001/admin (TinaCMS)
- **GraphQL API**: http://localhost:4001/graphql
- **Ładowanie treści**: Bezpośrednie wywołania client.request()
- **Responsywność**: Grid layout z sidebar'em autora

### ⚠️ Znane problemy
- Kolejność postów nie jest sortowana chronologicznie
- Post.tsx używa useTina hook'a (może nie działać z powodu DataCloneError)
- Niektóre style mogą pokazywać starą szatę graficzną zamiast brutal design

## Uruchomienie projektu

### Wymagania
- Node.js 18+
- npm

### Instalacja i uruchomienie

1. **Instalacja dependencies**:
```bash
npm install
```

2. **Uruchomienie TinaCMS server** (terminal 1):
```bash
npm run tina:dev
```

3. **Uruchomienie frontend dev server** (terminal 2):
```bash
npm run dev
```

### Dostęp do aplikacji
- **Blog**: http://localhost:5173
- **Panel admina**: http://localhost:4001/admin
- **GraphQL Playground**: http://localhost:4001/graphql

## Struktura projektu

```
src/
├── components/          # Komponenty UI (BlogHeader, BlogPost, AuthorCard)
├── pages/              # Strony (Index.tsx, Post.tsx)
├── App.tsx             # Główny komponent aplikacji
└── main.tsx            # Entry point

content/posts/          # Pliki Markdown z postami (źródło TinaCMS)
public/posts/           # Stare pliki postów (legacy)
tina/                   # Konfiguracja TinaCMS
├── config.ts           # Schema i ustawienia
└── __generated__/      # Wygenerowany klient GraphQL
```

## TinaCMS - Content Management

### Panel admina
- Dostęp: http://localhost:4001/admin
- Edycja postów w interfejsie WYSIWYG
- Zarządzanie metadanymi (tytuł, slug, tagi, data)

### Schema postów
- **title**: Tytuł posta
- **slug**: Fragment URL (opcjonalny)
- **date**: Data publikacji  
- **excerpt**: Zajawka/opis
- **tags**: Lista tagów
- **featured**: Czy post wyróżniony
- **body**: Treść w rich-text/Markdown

### GraphQL API
Endpoint: `http://localhost:4001/graphql`

Przykładowe query:
```graphql
{
  postConnection {
    edges {
      node {
        id
        title
        slug
        featured
        excerpt
        date
        tags
        body
      }
    }
  }
}
```

## Rozwiązane problemy

Szczegółowa historia napraw znajduje się w `cms_fix.md`. Główne naprawy:
- Naprawiono ścieżki do treści (content/posts/ vs public/posts/)
- Usunięto DataCloneError przez zastąpienie useTina bezpośrednimi wywołaniami
- Dodano proxy w Vite dla panelu admina
- Poprawiono strukturę danych GraphQL

## Development

### Dodawanie nowych postów
1. Przez panel admina: http://localhost:4001/admin
2. Lub bezpośrednio: stwórz plik .md w `content/posts/`

### Modyfikacja stylów
- Brutal design system: `src/index.css`
- Komponenty UI: `src/components/ui/`
- TailwindCSS config: `tailwind.config.js`

### Build
```bash
npm run build
```

### Deploy
Build tworzy folder `dist/` gotowy do deploy'u na dowolnym static hosting.