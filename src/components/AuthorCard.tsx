import { Button } from "@/components/ui/button";
import { ExternalLink, Podcast, Linkedin, Mail } from "lucide-react";

export const AuthorCard = () => {
  return (
    <aside className="bg-card border-4 border-brutal-shadow shadow-brutal p-6 sticky top-8">
      {/* Author header */}
      <div className="bg-brutal-green text-white p-4 border-2 border-brutal-shadow mb-6 text-center">
        <h3 className="font-brutal font-black text-xl text-brutal-shadow uppercase tracking-wide">
          JAKUB JEZIORNY
        </h3>
        <p className="font-brutal font-bold text-sm text-brutal-shadow mt-1">
          COO @ GRUPA BLIX
        </p>
      </div>

      {/* Bio */}
      <div className="bg-background p-4 border-2 border-brutal-shadow mb-6">
        <p className="font-brutal text-sm leading-relaxed text-foreground">
          COO w Grupie Blix. Od 14 lat rozwijam produkty, zespoły i biznesy technologiczne. 
          Historyk i filozof z Poznania.
        </p>
      </div>

      {/* Social links */}
      <div className="space-y-3">
        <Button 
          variant="outline"
          className="w-full bg-brutal-blue text-white border-2 border-brutal-shadow shadow-brutal font-brutal font-bold hover:bg-brutal-pink hover:shadow-brutal-hover hover:transform hover:-translate-x-1 hover:-translate-y-1 transition-all duration-150"
          onClick={() => window.open('https://www.linkedin.com/in/jakubjeziorny/', '_blank')}
        >
          <Linkedin className="h-4 w-4 mr-2" />
          LinkedIn
        </Button>
        
        <Button 
          variant="outline"
          className="w-full bg-brutal-pink text-white border-2 border-brutal-shadow shadow-brutal font-brutal font-bold hover:bg-brutal-blue hover:shadow-brutal-hover hover:transform hover:-translate-x-1 hover:-translate-y-1 transition-all duration-150"
          onClick={() => window.open('https://open.spotify.com/show/6jBsm4cYYgp144hpuLvBe9?si=ef5dcf9ca79744c2', '_blank')}
        >
          <Podcast className="h-4 w-4 mr-2" />
          Podcast
        </Button>
        
        <Button 
          variant="outline"
          className="w-full bg-brutal-yellow text-brutal-shadow border-2 border-brutal-shadow shadow-brutal font-brutal font-bold hover:bg-brutal-green hover:text-white hover:shadow-brutal-hover hover:transform hover:-translate-x-1 hover:-translate-y-1 transition-all duration-150"
          onClick={() => window.open('mailto:jakub.jeziorny@gmail.com', '_blank')}
        >
          <Mail className="h-4 w-4 mr-2" />
          Kontakt
        </Button>
      </div>

      {/* Decorative bottom element */}
      <div className="mt-6 flex justify-center space-x-2">
        <div className="w-4 h-4 bg-brutal-blue border-2 border-brutal-shadow transform rotate-45" />
        <div className="w-4 h-4 bg-brutal-green border-2 border-brutal-shadow transform rotate-45" />
        <div className="w-4 h-4 bg-brutal-pink border-2 border-brutal-shadow transform rotate-45" />
      </div>
    </aside>
  );
};