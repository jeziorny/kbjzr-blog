import { Button } from "@/components/ui/button";

export const BlogNavigation = () => {
  return (
    <nav className="bg-background py-6 relative">
      {/* Background grid */}
      <div className="absolute inset-0 opacity-5">
        <div 
          className="w-full h-full bg-repeat opacity-50"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='60' height='60' viewBox='0 0 60 60'%3E%3Cg fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='0.1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Button 
            variant="outline" 
            className="bg-brutal-blue text-white border-4 border-brutal-shadow shadow-brutal font-brutal font-bold text-lg px-8 py-3 hover:bg-brutal-pink hover:shadow-brutal-hover hover:transform hover:-translate-x-1 hover:-translate-y-1 transition-all duration-150"
          >
            Blog
          </Button>
          
          <Button 
            variant="outline" 
            className="bg-brutal-pink text-white border-4 border-brutal-shadow shadow-brutal font-brutal font-bold text-lg px-8 py-3 hover:bg-brutal-blue hover:shadow-brutal-hover hover:transform hover:-translate-x-1 hover:-translate-y-1 transition-all duration-150"
          >
            O mnie
          </Button>
        </div>
      </div>
    </nav>
  );
};