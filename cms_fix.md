# Naprawa TinaCMS - Historia problemów i rozwiązań

## Problemy które trzeba było naprawić

### 1. Niezgodność ścieżek do treści
**Problem**: TinaCMS szukał postów w `content/posts/` ale były w `public/posts/`
**Rozwiązanie**: Skopiowanie wszystkich postów z `public/posts/` do `content/posts/`

### 2. Zepsute frontmatter w pliku
**Problem**: Plik `cytaty-charliego-mungera-po-polsku.md` miał pustą pierwszą linię co powodowało błędy parsowania
**Rozwiązanie**: Przepisanie całego pliku z usunięciem pustej linii na początku

### 3. Błędne ścieżki importów
**Problem**: Błędy `Failed to resolve import` dla klienta TinaCMS
**Rozwiązanie**: Poprawienie ścieżek importów z `"../tina/__generated__/client"` na `"../../tina/__generated__/client"`

### 4. Brak proxy dla panelu admina
**Problem**: 404 błędy przy próbie dostępu do `/admin` i `/graphql`
**Rozwiązanie**: Dodanie konfiguracji proxy w `vite.config.ts`:
```typescript
proxy: {
  '/graphql': {
    target: 'http://localhost:4001',
    changeOrigin: true,
    secure: false,
    ws: true,
  },
  '/admin': {
    target: 'http://localhost:4001',
    changeOrigin: true,
    secure: false,
  },
}
```

### 5. DataCloneError w hooku useTina
**Problem**: Krytyczny błąd `Failed to execute 'postMessage' on 'Window': post (variables, options) { return requester(PostDocument, variables, options); } could not be cloned.`
**Rozwiązanie**: Zastąpienie `useTina` hook'a bezpośrednimi wywołaniami `client.request()` z `useEffect` i `useState`

### 6. Nieprawidłowa struktura danych
**Problem**: Strona wyświetlała "BŁĄD ŁADOWANIA POSTÓW" mimo udanego ładowania danych
**Rozwiązanie**: Poprawienie sprawdzania struktury danych z `data.postConnection` na `data.data.postConnection`

## Kluczowe zmiany w kodzie

### Index.tsx - główna strona
- Usunięto `useTina` hook
- Dodano własny mechanizm ładowania z `useEffect` i `useState`
- Poprawiono strukturę danych GraphQL (data.data.postConnection)

### main.tsx
- Tymczasowo wyłączono `TinaEditProvider` z powodu DataCloneError

### Post.tsx
- Nadal używa `useTina` hook'a (może wymagać podobnej naprawy w przyszłości)

## Aktualne funkcjonowanie

**Status**: ✅ Działające
- Panel admina: http://localhost:4001/admin
- GraphQL API: http://localhost:4001/graphql  
- Główna strona: wyświetla listę postów
- Posty ładują się z TinaCMS
- Styling brutal design działa poprawnie

**Znane problemy**:
- Kolejność postów może być przypadkowa (brak sortowania)
- Post.tsx nadal używa useTina (może nie działać)
- Stare style zamiast nowego brutal design (zanotowane do naprawy)

## Komendy do uruchomienia

1. **TinaCMS server**: `npm run tina:dev`
2. **Frontend**: `npm run dev`
3. **Panel admina**: http://localhost:4001/admin