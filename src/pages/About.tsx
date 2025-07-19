import { Helmet } from "react-helmet-async";
import { BlogHeader } from "@/components/BlogHeader";

const About = () => {
  return (
    <>
      <Helmet>
        <title>O mnie - KBJZR</title>
        <meta name="description" content="Jakub Jeziorny - COO Grupy Blix. Od 14 lat rozwijam produkty, zespoły i biznesy technologiczne. Historyk i filozof z Poznania." />
        <meta property="og:title" content="O mnie - KBJZR" />
        <meta property="og:description" content="Jakub Jeziorny - COO Grupy Blix. Od 14 lat rozwijam produkty, zespoły i biznesy technologiczne." />
        <meta property="og:url" content="https://kbjzr.pl/about.html" />
        <link rel="canonical" href="https://kbjzr.pl/about.html" />
      </Helmet>
      
      <div className="min-h-screen bg-background font-brutal">
        <BlogHeader />
        
        <main className="container mx-auto px-4 pt-8 pb-12">
          <div className="max-w-4xl mx-auto">
            
            {/* Main content */}
            <div className="bg-white border-4 border-brutal-shadow shadow-brutal p-8 mb-8">
              <h1 className="font-brutal font-black text-4xl text-brutal-shadow mb-8 uppercase tracking-tight">
                O mnie
              </h1>
              
              <div className="prose prose-xl max-w-none">
                <p className="text-xl text-brutal-shadow font-medium leading-relaxed mb-8">
                  Cześć! Jestem <strong className="font-black">Jakub Jeziorny</strong>, COO w 
                  <strong className="font-black"> Grupie Blix</strong>. Od 14 lat rozwijam produkty, 
                  zespoły i biznesy technologiczne.
                </p>

                <div className="border-l-8 border-brutal-green bg-gray-50 p-6 my-12">
                  <p className="text-2xl text-brutal-shadow font-black leading-relaxed mb-4">
                    Pasjonuje mnie budowanie produktów, które mają realny wpływ na życie ludzi.
                  </p>
                  
                  <p className="text-xl text-brutal-shadow font-medium leading-relaxed">
                    Wierzę w siłę zespołu, prostotę rozwiązań i ciągłe uczenie się.
                  </p>
                </div>

                <p className="text-xl text-brutal-shadow font-medium leading-relaxed mb-8">
                  Moje doświadczenie obejmuje zarządzanie produktem w startupach i dużych organizacjach, 
                  budowanie zespołów produktowych oraz skalowanie biznesów technologicznych. 
                  Z wykształcenia jestem historykiem i filozofem, co daje mi unikalne spojrzenie 
                  na technologię i biznes.
                </p>

                <div className="text-center my-12 border-4 border-brutal-blue bg-gray-50 p-8">
                  <p className="text-3xl text-brutal-shadow font-black leading-relaxed mb-4">
                    Co robię obecnie?
                  </p>
                  
                  <p className="text-2xl text-brutal-shadow font-black leading-relaxed">
                    Buduję produkty i zespoły w Grupie Blix
                  </p>
                </div>

                <p className="text-xl text-brutal-shadow font-medium leading-relaxed mb-8">
                  W <strong className="font-black">Grupie Blix</strong> odpowiadam za operacje 
                  i rozwój produktowy. Pracujemy nad rozwiązaniami dla branży automotive, 
                  e-commerce i fintech. Szczególnie fascynuje mnie wykorzystanie AI 
                  w praktycznych zastosowaniach biznesowych.
                </p>

                <div className="border-l-8 border-brutal-yellow bg-gray-50 p-6 my-12 italic">
                  <p className="text-xl text-brutal-shadow font-medium leading-relaxed mb-6">
                    Poza pracą prowadzę podcast o technologii i biznesie, gdzie rozmawiam 
                    z liderami polskiej sceny tech.
                  </p>
                  
                  <p className="text-xl text-brutal-shadow font-black leading-relaxed">
                    Uważam, że najlepsze produkty powstają z zrozumienia prawdziwych potrzeb użytkowników.
                  </p>
                </div>

                <h2 className="font-brutal font-black text-3xl text-brutal-shadow mb-6 mt-12 uppercase">
                  Kontakt
                </h2>
                
                <p className="text-xl text-brutal-shadow font-medium leading-relaxed mb-6">
                  Jeśli chcesz porozmawiać o produktach, biznesie czy technologii, 
                  napisz do mnie na <strong className="font-black">jakub.jeziorny@gmail.com</strong> 
                  lub znajdź mnie na LinkedIn.
                </p>

                <div className="flex flex-wrap gap-4 mt-8">
                  <a 
                    href="mailto:jakub.jeziorny@gmail.com"
                    className="bg-brutal-blue text-white px-6 py-3 border-4 border-brutal-shadow shadow-brutal font-brutal font-bold text-lg hover:bg-brutal-pink hover:shadow-brutal-hover hover:transform hover:-translate-x-1 hover:-translate-y-1 transition-all duration-150"
                  >
                    Email
                  </a>
                  
                  <a 
                    href="https://www.linkedin.com/in/jakubje/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-brutal-green text-brutal-shadow px-6 py-3 border-4 border-brutal-shadow shadow-brutal font-brutal font-bold text-lg hover:bg-brutal-yellow hover:shadow-brutal-hover hover:transform hover:-translate-x-1 hover:-translate-y-1 transition-all duration-150"
                  >
                    LinkedIn
                  </a>
                  
                  <a 
                    href="https://open.spotify.com/show/6jBsm4cYYgp144hpuLvBe9?si=ef5dcf9ca79744c2"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-brutal-pink text-white px-6 py-3 border-4 border-brutal-shadow shadow-brutal font-brutal font-bold text-lg hover:bg-brutal-blue hover:shadow-brutal-hover hover:transform hover:-translate-x-1 hover:-translate-y-1 transition-all duration-150"
                  >
                    Podcast
                  </a>
                </div>
              </div>
            </div>
          </div>
        </main>
        
        {/* Footer */}
        <footer className="bg-brutal-shadow text-white py-8">
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

export default About;