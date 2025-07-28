# Plan implementacji CMS (Decap CMS)

Ten dokument opisuje krok po kroku proces wdrożenia i konfiguracji Decap CMS dla bloga, z priorytetem na testowanie lokalne.

### Krok 1: Stworzenie plików konfiguracyjnych CMS

W pierwszej kolejności musimy dodać pliki, które umożliwią działanie panelu administracyjnego CMS.

1.  **Utwórz plik `index.html` dla panelu administracyjnego:**
    *   **Lokalizacja:** `public/admin/index.html`
    *   **Zawartość:**
        ```html
        <!doctype html>
        <html>
        <head>
          <meta charset="utf-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          <title>Content Manager</title>
          <script src="https://identity.netlify.com/v1/netlify-identity-widget.js"></script>
        </head>
        <body>
          <!-- Include the script that builds the page and powers Decap CMS -->
          <script src="https://unpkg.com/decap-cms@^3.0.0/dist/decap-cms.js"></script>
        </body>
        </html>
        ```

2.  **Utwórz plik konfiguracyjny `config.yml`:**
    *   **Lokalizacja:** `public/admin/config.yml`
    *   **Zawartość (do testów lokalnych):**
        ```yaml
        # Konfiguracja do testów lokalnych
        backend:
          name: local

        # Folder dla mediów (np. obrazków)
        media_folder: "public/assets/images"
        public_folder: "/assets/images"
        
        # Definicja kolekcji treści - w tym przypadku postów
        collections:
          - name: "posts"
            label: "Posty"
            folder: "public/posts" # Istniejący folder z postami
            create: true
            slug: "{{slug}}"
            fields:
              - {label: "Tytuł", name: "title", widget: "string"}
              - {label: "Data", name: "date", widget: "datetime"}
              - {label: "Treść", name: "body", widget: "markdown"}
        ```

### Krok 2: Ujednolicenie struktury postów

Musimy się upewnić, że wszystkie istniejące pliki `.md` w folderze `public/posts` mają spójną strukturę `frontmatter` na początku pliku.

*   **Sprawdź każdy plik `.md`:** Upewnij się, że na samej górze każdego pliku znajdują się co najmniej pola `title` i `date`. Jeśli ich nie ma, dodaj je.
*   **Przykład:**
    ```markdown
    ---
    title: "Przykładowy tytuł posta"
    date: "2024-07-27T10:00:00.000Z"
    ---
    
    # Treść posta
    
    To jest treść mojego posta...
    ```

### Krok 3: Weryfikacja i testowanie lokalne

Po wykonaniu powyższych kroków, możemy przetestować działanie CMS-a lokalnie.

1.  **Uruchom serwer deweloperski:**
    ```bash
    npm run dev
    ```
2.  **Otwórz panel administracyjny w przeglądarce:**
    *   Przejdź pod adres: `http://localhost:5173/admin/`
3.  **Testuj:**
    *   Sprawdź, czy widzisz listę istniejących postów.
    *   Spróbuj edytować jeden z postów.
    *   Spróbuj stworzyć nowy post. Zmiany będą zapisywane bezpośrednio w Twoich lokalnych plikach.

### Krok 4: Konfiguracja pod GitHub (po testach)

Gdy będziesz zadowolony z działania CMS-a lokalnie, możemy przełączyć się na backend GitHuba.

1.  **Zaktualizuj `config.yml`:**
    *   Zmień sekcję `backend` w pliku `public/admin/config.yml`:
        ```yaml
        backend:
          name: github
          repo: kbjzr/kbjzr-blog # Upewnij się, że nazwa repozytorium jest poprawna
          branch: main # lub inna główna gałąź
        ```
2.  **Konfiguracja uwierzytelniania przez GitHub:**
    *   Przejdź do ustawień deweloperskich na GitHubie: `Settings` > `Developer settings` > `OAuth Apps`.
    *   Utwórz nową aplikację OAuth z adresem URL Twojego bloga.
    *   Zapisz `Client ID`.
3.  **Wdrożenie:**
    *   Zatwierdź zmiany w Git i wdróż na produkcję.
    *   Sprawdź działanie na produkcji pod adresem `https://twojadomena.pl/admin/`.