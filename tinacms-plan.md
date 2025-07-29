# Plan migracji do TinaCMS

Oto szczegółowy plan, krok po kroku, jak przeprowadzić migrację z obecnego systemu na TinaCMS.

### Analiza obecnej implementacji

**Co możemy wykorzystać:**

1.  **Struktura postów (`public/posts/*.md`):** Istniejące pliki Markdown z `frontmatter` są idealne dla TinaCMS.
2.  **Komponenty React (`src/pages/Index.tsx`, `src/pages/Post.tsx`):** Logika i wygląd stron pozostaną w większości bez zmian. Zmienimy tylko sposób dostarczania danych.
3.  **Stos technologiczny (Vite, React):** TinaCMS ma oficjalne wsparcie dla tego stosu.

**Co usuniemy lub zastąpimy:**

1.  **Skrypt `scripts/generate-posts-meta.cjs`:** Zostanie zastąpiony przez API danych TinaCMS.
2.  **Plik `public/posts-meta.json`:** Nie będzie już potrzebny.
3.  **Pliki po Decap CMS (`public/admin/`):** Zostaną usunięte.
4.  **Logika wczytywania danych:** Ręczne wywołania `fetch()` zostaną zastąpione przez hooki i funkcje TinaCMS.

---

### Plan migracji

**Krok 1: Porządki**
*   Usunięcie niepotrzebnych już plików i katalogów związanych z Decap CMS.
    *   `rm -rf public/admin`

**Krok 2: Instalacja i konfiguracja TinaCMS**
*   Dodanie wymaganych zależności TinaCMS do projektu za pomocą `npm`.
*   Uruchomienie komendy `npx @tinacms/cli init` w celu automatycznego stworzenia podstawowej konfiguracji.
*   Stworzenie pliku `tina/config.ts` i zdefiniowanie w nim schematu postów, który będzie odpowiadał istniejącej strukturze `frontmatter`.

**Krok 3: Integracja TinaCMS z aplikacją React**
*   Modyfikacja pliku `vite.config.ts` w celu zapewnienia poprawnej współpracy z TinaCMS.
*   Aktualizacja głównego pliku aplikacji (`src/App.tsx` lub `src/main.tsx`), aby "opakować" ją w dostawcę kontekstu TinaCMS.

**Krok 4: Refaktoryzacja wczytywania danych**
*   **Strona główna (`src/pages/Index.tsx`):** Zastąpienie wczytywania pliku `posts-meta.json` zapytaniem do API TinaCMS.
*   **Strona posta (`src/pages/Post.tsx`):** Użycie hooka `useTina` do pobrania treści posta i włączenia trybu edycji na żywo.

**Krok 5: Ostateczne czyszczenie**
*   Usunięcie skryptu `scripts/generate-posts-meta.cjs`.
*   Usunięcie pliku `public/posts-meta.json`.
*   Aktualizacja skryptów `dev` i `build` w pliku `package.json`, aby usunąć wywołania starego skryptu.
