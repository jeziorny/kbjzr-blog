import { Helmet } from "react-helmet-async";
import { BlogHeader } from "@/components/BlogHeader";

const About = () => {
  return (
    <>
      <Helmet>
        <title>O mnie — KBJZR</title>
        <meta content="Jakub Jeziorny — COO Grupy Blix. Od 14 lat rozwijam produkty, zespoły i biznesy technologiczne." name="description" />
        <link href="https://kbjzr.pl/about.html" rel="canonical" />
      </Helmet>

      <div className="site-page">
        <BlogHeader />
        <main className="site-frame site-main">
          <article className="article about-content">
            <header className="article-header">
              <h1>O mnie</h1>
            </header>
            <div className="article-body">
              <p>Jestem Jakub Jeziorny, COO w Grupie Blix. Od 14 lat rozwijam produkty, zespoły i biznesy technologiczne.</p>
              <p>Moje doświadczenie obejmuje zarządzanie produktem w startupach i dużych organizacjach, budowanie zespołów produktowych oraz skalowanie biznesów technologicznych. Z wykształcenia jestem historykiem i filozofem z Poznania.</p>
              <p>W Grupie Blix odpowiadam za operacje i rozwój produktowy. Pracujemy nad rozwiązaniami dla automotive, e-commerce i fintech; szczególnie interesuje mnie praktyczne wykorzystanie AI w biznesie.</p>
              <p>Poza pracą prowadzę podcast o technologii i biznesie, w którym rozmawiam z liderami polskiej sceny tech.</p>
            </div>
            <footer className="article-footer">
              <a href="mailto:jakub.jeziorny@gmail.com">Email</a>
              <a href="https://www.linkedin.com/in/jakubjeziorny/" rel="noreferrer" target="_blank">LinkedIn</a>
              <a href="https://open.spotify.com/show/6jBsm4cYYgp144hpuLvBe9?si=ef5dcf9ca79744c2" rel="noreferrer" target="_blank">Podcast</a>
            </footer>
          </article>
        </main>
        <footer className="site-footer">KBJZR · 2026</footer>
      </div>
    </>
  );
};

export default About;
