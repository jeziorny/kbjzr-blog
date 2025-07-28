# Plan aktualizacji układu strony głównej bloga do jednej kolumny

Ten dokument opisuje obecny stan kodu pliku `src/pages/Index.tsx` oraz planowane zmiany mające na celu przekształcenie układu strony głównej bloga z wielokolumnowego na jednokolumnowy.

---

## Obecny stan kodu (`src/pages/Index.tsx`)

Obecnie plik `src/pages/Index.tsx` definiuje układ strony głównej bloga, który wykorzystuje siatkę (grid) z wieloma kolumnami na większych ekranach, w tym sidebar dla karty autora.

Kluczowe fragmenty kodu odpowiedzialne za układ:

```typescript
// ... (importy)

const blogPosts = [
  // ... (hardkodowana lista postów)
];

const Index = () => {
  return (
    <>
      {/* ... (Helmet i BlogHeader) */}

      <main className="container mx-auto px-4 pt-8 pb-12">
        {/* Główny kontener siatki, definiujący 4 kolumny na dużych ekranach */}
        <div className="grid lg:grid-cols-4 gap-8">
          {/* Sekcja postów, zajmująca 3 z 4 kolumn na dużych ekranach */}
          <div className="lg:col-span-3">
            {/* Wewnętrzna siatka dla postów, definiująca 2 kolumny na średnich i dużych ekranach */}
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-2">
              {blogPosts.map((post, index) => (
                <BlogPost
                  key={index}
                  title={post.title}
                  href={post.href}
                  featured={post.featured}
                />
              ))}
            </div>
          </div>

          {/* Sidebar dla karty autora, zajmujący 1 z 4 kolumn na dużych ekranach */}
          <div className="lg:col-span-1">
            <AuthorCard />
          </div>
        </div>
      </main>

      {/* ... (Footer) */}
    </>
  );
};

export default Index;
```

---

## Planowane zmiany

Celem jest uproszczenie układu strony głównej do pojedynczej kolumny, co oznacza usunięcie sidebara `AuthorCard` i rozciągnięcie sekcji postów na całą dostępną szerokość.

### Kroki do wprowadzenia zmian:

1.  **Usunięcie sidebara `AuthorCard`:**
    *   Usunąć import `AuthorCard` z pliku `src/pages/Index.tsx`.
    *   Usunąć komponent `<AuthorCard />` z renderowanej struktury JSX.
    *   Usunąć otaczający `div` z klasą `lg:col-span-1`, który zawierał `AuthorCard`.

2.  **Dostosowanie układu siatki dla postów:**
    *   Zmienić klasę `grid lg:grid-cols-4` w głównym kontenerze siatki na `grid grid-cols-1` (lub `grid lg:grid-cols-1` jeśli chcemy zachować responsywność, ale zawsze jedną kolumnę na dużych ekranach).
    *   Zmienić klasę `lg:col-span-3` dla kontenera postów na `col-span-1` (lub usunąć, jeśli kontener postów ma zajmować całą szerokość domyślnie).
    *   Dostosować klasy `md:grid-cols-2 lg:grid-cols-2` w wewnętrznej siatce dla postów na `grid-cols-1`, aby zawsze wyświetlały posty w jednej kolumnie.

### Pseudokod planowanych zmian w `src/pages/Index.tsx`:

```typescript
import { Helmet } from "react-helmet-async";
import { BlogHeader } from "@/components/BlogHeader";
import { BlogPost } from "@/components/BlogPost";
// import { AuthorCard } from "@/components/AuthorCard"; // Usunąć import

const blogPosts = [
  // ... (hardkodowana lista postów)
];

const Index = () => {
  return (
    <>
      <Helmet>
        {/* ... */}
      </Helmet>

      <div className="min-h-screen bg-background font-brutal">
        <BlogHeader />

      <main className="container mx-auto px-4 pt-8 pb-12">
        {/* Zmieniony główny kontener siatki na jedną kolumnę */}
        <div className="grid grid-cols-1 gap-8">
          {/* Sekcja postów, teraz zajmująca całą szerokość */}
          <div className="col-span-1">
            {/* Wewnętrzna siatka dla postów, zmieniona na jedną kolumnę */}
            <div className="grid grid-cols-1 gap-6">
              {blogPosts.map((post, index) => (
                <BlogPost
                  key={index}
                  title={post.title}
                  href={post.href}
                  featured={post.featured}
                />
              ))}
            </div>
          </div>

          {/* Sidebar AuthorCard - USUNIĘTY */}
          {/* <div className="lg:col-span-1">
            <AuthorCard />
          </div> */}
        </div>
      </main>

      {/* ... (Footer) */}
      </div>
    </>
  );
};

export default Index;
```