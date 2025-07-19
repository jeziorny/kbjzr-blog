import { Helmet } from "react-helmet-async";
import { BlogHeader } from "@/components/BlogHeader";
import { BlogPost } from "@/components/BlogPost";
import { AuthorCard } from "@/components/AuthorCard";

const blogPosts = [
  {
    title: "Pilność",
    href: "/posts/pilnosc",
    slug: "pilnosc",
    featured: true,
    excerpt: "O tym, dlaczego pilność może być pułapką i jak znajdować właściwe priorytety."
  },
  {
    title: "Prymat działania nad intelektem: inteligencja znaczy mniej niż myślisz",
    href: "/posts/prymat-dzialania-nad-intelektem-inteligencja-znaczy-mniej-niz-myslisz",
    slug: "prymat-dzialania-nad-intelektem-inteligencja-znaczy-mniej-niz-myslisz",
    featured: false,
    excerpt: "Dlaczego konsekwentne działanie przeważa nad inteligencją w osiąganiu celów."
  },
  {
    title: "Push i pull w zarządzaniu produktem",
    href: "/posts/push-i-pull-w-zarzadzaniu-produktem",
    slug: "push-i-pull-w-zarzadzaniu-produktem",
    excerpt: "Dwa fundamentalne podejścia do zarządzania produktem i kiedy je stosować."
  },
  {
    title: "Blogi, tęsknię za nimi",
    href: "/posts/blogi-tesknie-za-nimi",
    slug: "blogi-tesknie-za-nimi",
    excerpt: "Refleksja o upadku blogowania i powrocie do osobistego pisania."
  },
  {
    title: "AI in The Box: okulary od Meta",
    href: "/posts/meta-ray-bans",
    slug: "meta-ray-bans",
    excerpt: "Analiza okularów Meta Ray-Ban jako przykładu udanego produktu AI."
  },
  {
    title: "Apple Vision Pro",
    href: "/posts/apple-vision-pro",
    slug: "apple-vision-pro",
    excerpt: "Pierwsze wrażenia z najnowszego produktu Apple i przyszłość AR/VR."
  },
  {
    title: "Influencer marketing to loteria",
    href: "/posts/influencer-marketing-to-loteria",
    slug: "influencer-marketing-to-loteria",
    excerpt: "Dlaczego influencer marketing jest nieprzewidywalny i jak z tym radzić."
  },
  {
    title: "Screenless i hardware jako klient AI. O Humane AI Pin.",
    href: "/posts/screenless-i-hardware-jako-klient-ai-o-humane-ai-pin",
    slug: "screenless-i-hardware-jako-klient-ai-o-humane-ai-pin",
    excerpt: "Analiza Humane AI Pin i przyszłości urządzeń bez ekranów."
  },
  {
    title: "10 lekcji z treningu siłowego",
    href: "/posts/10-lekcji-z-treningu-silowego",
    slug: "10-lekcji-z-treningu-silowego",
    excerpt: "Czego nauczył mnie trening siłowy o konsekwencji, cierpliwości i wytrwałości."
  },
  {
    title: "102 cytaty Charliego Mungera po polsku",
    href: "/posts/cytaty-charliego-mungera-po-polsku",
    slug: "cytaty-charliego-mungera-po-polsku",
    excerpt: "Najlepsze cytaty Charliego Mungera przetłumaczone na język polski."
  },
  {
    title: "Tak zwany \"europejski pesymizm\" w technologii",
    href: "/posts/tak-zwany-europejski-pesymizm-w-technologii",
    slug: "tak-zwany-europejski-pesymizm-w-technologii",
    excerpt: "O różnicach w podejściu do technologii między Europą a Stanami Zjednoczonymi."
  },
  {
    title: "Chcesz wygrać czy być mądrzejszy?",
    href: "/posts/chcesz-wygrac-czy-byc-madrzejszy",
    slug: "chcesz-wygrac-czy-byc-madrzejszy",
    excerpt: "O dylemacie między konkurowaniem a uczeniem się w biznesie."
  },
  {
    title: "Zarządzanie produktem: startup vs. duża organizacja",
    href: "/posts/zarzadzanie-produktem-startup-vs-duza-organizacja",
    slug: "zarzadzanie-produktem-startup-vs-duza-organizacja",
    excerpt: "Kluczowe różnice w zarządzaniu produktem w startupach i dużych firmach."
  }
];

const Index = () => {
  return (
    <>
      <Helmet>
        <title>KBJZR - Blog o technologii, produktach i biznesie</title>
        <meta name="description" content="Blog Jakuba Jeziorniskiego - COO Grupy Blix. Piszę o zarządzaniu produktem, technologii, AI i biznesie. Rozwój produktu i zespołu w startupach." />
        <link rel="canonical" href="https://kbjzr.pl/" />
      </Helmet>
      
      <div className="min-h-screen bg-background font-brutal">
        <BlogHeader />
      
      <main className="container mx-auto px-4 pt-8 pb-12">
        <div className="grid lg:grid-cols-4 gap-8">
          {/* Blog posts */}
          <div className="lg:col-span-3">
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
          
          {/* Author sidebar */}
          <div className="lg:col-span-1">
            <AuthorCard />
          </div>
        </div>
      </main>
      
      {/* Footer */}
      <footer className="bg-brutal-shadow text-white py-8 mt-16">
        <div className="container mx-auto px-4 text-center">
          <div className="flex justify-center space-x-4 mb-4">
            <div className="w-6 h-6 bg-brutal-green border-2 border-white transform rotate-45" />
            <div className="w-6 h-6 bg-brutal-blue border-2 border-white transform rotate-45" />
            <div className="w-6 h-6 bg-brutal-pink border-2 border-white transform rotate-45" />
          </div>
          <p className="font-brutal font-bold text-sm uppercase tracking-wider">
            KBJZR © 2025 - BLOG O TECHNOLOGII I BIZNESIE
          </p>
        </div>
      </footer>
      </div>
    </>
  );
};

export default Index;
