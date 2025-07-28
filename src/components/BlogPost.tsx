import { Link } from "react-router-dom";

interface BlogPostProps {
  title: string;
  excerpt?: string;
  date?: string;
  href: string;
  featured?: boolean;
}

export const BlogPost = ({ title, excerpt, date, href, featured = false }: BlogPostProps) => {
  const cardClasses = featured 
    ? "bg-gradient-to-br from-brutal-blue to-brutal-pink text-white" 
    : "bg-card text-card-foreground group-hover:bg-gradient-to-br group-hover:from-brutal-blue group-hover:to-brutal-pink group-hover:text-white";

  const isExternalLink = href.startsWith('http');

  const cardContent = (
    <div className="flex flex-col h-full">
      <h2 className={`
        font-brutal font-black text-xl lg:text-2xl mb-4 
        leading-tight tracking-tight uppercase
        ${featured ? 'text-white' : 'text-brutal-shadow'}
        transition-colors duration-150
      `}>
        {title}
      </h2>
      
      {excerpt && (
        <p className={`
          font-brutal text-sm lg:text-base mb-4 line-clamp-3
          ${featured ? 'text-white/90' : 'text-muted-foreground'}
        `}>
          {excerpt}
        </p>
      )}
      
      {date && (
        <div className="mt-auto">
          <span className={`
            font-brutal font-bold text-xs uppercase tracking-wider
            ${featured ? 'text-white/80' : 'text-brutal-blue'}
          `}>
            {date}
          </span>
        </div>
      )}
      
      {/* Decorative element */}
      <div className="overflow-hidden">
        <div className={`
          w-full h-1 mt-4 transition-transform duration-150
          ${featured ? 'bg-brutal-yellow' : 'bg-brutal-green'}
        `} />
      </div>
    </div>
  );

  const commonClasses = `
    ${cardClasses}
    border-4 border-brutal-shadow shadow-brutal 
    p-6 hover:shadow-brutal-hover 
    transition-all duration-150 cursor-pointer group overflow-hidden
    ${featured ? 'animate-glow-pulse' : ''}
    animate-slide-in-brutal block
  `;

  if (isExternalLink) {
    return (
      <a 
        href={href}
        target="_blank" 
        rel="noopener noreferrer"
        className={commonClasses}
      >
        {cardContent}
      </a>
    );
  }

  return (
    <Link to={href} className={commonClasses}>
      {cardContent}
    </Link>
  );
};