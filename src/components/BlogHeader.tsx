import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Send } from "lucide-react";
import { Link } from "react-router-dom";

export const BlogHeader = () => {
  const [email, setEmail] = useState("");

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    // ConvertKit integration - redirect to ConvertKit form
    const convertKitForm = document.createElement('form');
    convertKitForm.action = 'https://app.convertkit.com/forms/7968392/subscriptions';
    convertKitForm.method = 'post';
    convertKitForm.target = '_blank';
    
    const emailInput = document.createElement('input');
    emailInput.type = 'email';
    emailInput.name = 'email_address';
    emailInput.value = email;
    
    convertKitForm.appendChild(emailInput);
    document.body.appendChild(convertKitForm);
    convertKitForm.submit();
    document.body.removeChild(convertKitForm);
    
    setEmail("");
  };

  return (
    <header className="relative bg-brutal-green border-4 border-brutal-shadow overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="grid grid-cols-8 h-full">
          {Array.from({ length: 32 }).map((_, i) => (
            <div
              key={i}
              className="border border-brutal-shadow/20"
              style={{
                animationDelay: `${i * 0.1}s`,
              }}
            />
          ))}
        </div>
      </div>

      <div className="relative z-10 container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
          {/* Logo */}
          <div className="text-center lg:text-left">
            <Link to="/">
              <h1 className="font-brutal font-black text-5xl lg:text-7xl text-brutal-shadow tracking-tight mb-2 animate-slide-in-brutal hover:text-brutal-blue transition-colors duration-150">
                KBJZR
              </h1>
            </Link>
            <div className="w-full h-2 bg-brutal-blue shadow-brutal transform rotate-1" />
          </div>

          {/* Navigation */}
          <div className="flex flex-col sm:flex-row gap-4">
            <Link to="/">
              <Button 
                variant="outline" 
                className="bg-brutal-blue text-white border-4 border-brutal-shadow shadow-brutal font-brutal font-bold text-lg px-8 py-3 hover:bg-brutal-pink hover:shadow-brutal-hover hover:transform hover:-translate-x-1 hover:-translate-y-1 transition-all duration-150"
              >
                Blog
              </Button>
            </Link>
            
            <Link to="/about.html">
              <Button 
                variant="outline" 
                className="bg-brutal-pink text-white border-4 border-brutal-shadow shadow-brutal font-brutal font-bold text-lg px-8 py-3 hover:bg-brutal-blue hover:shadow-brutal-hover hover:transform hover:-translate-x-1 hover:-translate-y-1 transition-all duration-150"
              >
                O mnie
              </Button>
            </Link>
          </div>

          {/* Newsletter */}
          <div className="bg-brutal-shadow p-6 border-4 border-brutal-shadow shadow-brutal max-w-md w-full lg:w-auto">
            <h2 className="font-brutal font-bold text-white text-lg mb-4 uppercase tracking-wide">
              ZAPISZ SIĘ NA POSTY NA MAILA
            </h2>
            <form onSubmit={handleSubscribe} className="flex gap-2">
              <Input
                type="email"
                placeholder="Twój email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="border-2 border-white bg-white text-brutal-shadow font-brutal font-medium focus:ring-4 focus:ring-brutal-blue"
                required
              />
              <Button
                type="submit"
                variant="secondary"
                className="bg-brutal-green hover:bg-brutal-blue text-brutal-shadow font-brutal font-bold px-6 border-2 border-white transition-all duration-150 hover:shadow-brutal-hover hover:transform hover:-translate-x-1 hover:-translate-y-1"
              >
                <Send className="h-4 w-4" />
              </Button>
            </form>
          </div>
        </div>
      </div>
    </header>
  );
};