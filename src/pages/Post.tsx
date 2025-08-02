import { useParams, Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { BlogHeader } from "@/components/BlogHeader";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Mail } from "lucide-react";
import { TinaMarkdown } from "tinacms/dist/rich-text";
import { useState, useEffect } from "react";
import client from "../../tina/__generated__/client";

const Post = () => {
  const { slug } = useParams<{ slug: string }>();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Direct client call instead of useTina (which has DataCloneError)
  useEffect(() => {
    if (!slug) return;
    
    console.log(`🚀 Loading post: ${slug}`);
    
    client.request({
      query: `{ post(relativePath: "${slug}.md") { title date excerpt tags featured body } }`,
      variables: {}
    }).then((result) => {
      console.log('✅ Post loaded successfully:', result);
      setData(result);
      setLoading(false);
    }).catch((err) => {
      console.error('❌ Failed to load post:', err);
      setError(err);
      setLoading(false);
    });
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen bg-background font-brutal">
        <BlogHeader />
        <main className="container mx-auto px-4 pt-8 pb-12">
          <div className="max-w-4xl mx-auto text-center py-16">
            <div className="bg-brutal-green border-4 border-brutal-shadow shadow-brutal p-8">
              <h1 className="font-brutal font-black text-3xl text-brutal-shadow">
                ŁADOWANIE...
              </h1>
            </div>
          </div>
        </main>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-background font-brutal">
        <BlogHeader />
        <main className="container mx-auto px-4 pt-8 pb-12">
          <div className="max-w-4xl mx-auto text-center py-16">
            <div className="bg-red-500 border-4 border-brutal-shadow shadow-brutal p-8">
              <h1 className="font-brutal font-black text-3xl text-white mb-4">
                BŁĄD TINACMS
              </h1>
              <p className="text-white text-sm">{error.message || String(error)}</p>
            </div>
          </div>
        </main>
      </div>
    );
  }

  if (!data || !data.data || !data.data.post) {
    return (
      <div className="min-h-screen bg-background font-brutal">
        <BlogHeader />
        <main className="container mx-auto px-4 pt-8 pb-12">
          <div className="max-w-4xl mx-auto text-center py-16">
            <div className="bg-brutal-pink border-4 border-brutal-shadow shadow-brutal p-8">
              <h1 className="font-brutal font-black text-3xl text-white mb-4">
                404 - POST NIE ZNALEZIONY
              </h1>
              <Link to="/">
                <Button className="bg-white text-brutal-shadow border-4 border-brutal-shadow shadow-brutal font-brutal font-bold">
                  POWRÓT DO BLOGA
                </Button>
              </Link>
            </div>
          </div>
        </main>
      </div>
    );
  }

  const post = data.data.post;

  return (
    <>
      <Helmet>
        <title>{post.title} - KBJZR</title>
        <meta name="description" content={post.excerpt} />
        <meta property="og:title" content={`${post.title} - KBJZR`} />
        <meta property="og:description" content={post.excerpt} />
        <meta property="og:url" content={`https://kbjzr.pl/posts/${slug}`} />
        <meta property="og:type" content="article" />
        <meta property="article:published_time" content={post.date} />
        <meta property="article:author" content="Jakub Jeziorny" />
        <meta property="article:section" content="Technologia" />
        {post.tags && post.tags.map(tag => (
          <meta key={tag} property="article:tag" content={tag} />
        ))}
        <link rel="canonical" href={`https://kbjzr.pl/posts/${slug}`} />
        
        {/* JSON-LD Structured Data */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BlogPosting",
            "headline": post.title,
            "description": post.excerpt,
            "datePublished": post.date,
            "author": {
              "@type": "Person",
              "name": "Jakub Jeziorny",
              "url": "https://kbjzr.pl"
            },
            "publisher": {
              "@type": "Person",
              "name": "Jakub Jeziorny"
            },
            "mainEntityOfPage": {
              "@type": "WebPage",
              "@id": `https://kbjzr.pl/posts/${slug}`
            },
            "url": `https://kbjzr.pl/posts/${slug}`,
            "keywords": post.tags ? post.tags.join(", ") : "",
            "inLanguage": "pl-PL"
          })}
        </script>
      </Helmet>
      
      <div className="min-h-screen bg-background font-brutal">
        <BlogHeader />
        
        <main className="container mx-auto px-4 pt-8 pb-12">
          {/* Back button */}
          <Link to="/">
            <Button 
              variant="outline"
              className="mb-8 bg-brutal-blue text-white border-4 border-brutal-shadow shadow-brutal font-brutal font-bold text-lg px-6 py-3 hover:bg-brutal-green hover:shadow-brutal-hover hover:transform hover:-translate-x-1 hover:-translate-y-1 transition-all duration-150"
            >
              <ArrowLeft className="h-5 w-5 mr-2" />
              POWRÓT DO BLOGA
            </Button>
          </Link>

          {/* Article */}
          <article className="max-w-4xl mx-auto">
            {/* Title */}
            <header className="mb-12 bg-brutal-blue p-12 border-4 border-brutal-shadow shadow-brutal">
              <h1 className="font-brutal font-black text-3xl lg:text-5xl text-white leading-tight text-center transform -rotate-1">
                {post.title.toUpperCase()}
              </h1>
              <div className="w-32 h-2 bg-brutal-yellow mx-auto mt-6 transform rotate-2" />
              
              {/* Post meta */}
              <div className="mt-8 text-center">
                <time className="text-white font-brutal font-medium text-lg">
                  {new Date(post.date).toLocaleDateString('pl-PL', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </time>
                {post.tags && post.tags.length > 0 && (
                  <div className="mt-4 flex flex-wrap justify-center gap-2">
                    {post.tags.map(tag => (
                      <span 
                        key={tag}
                        className="bg-brutal-green text-brutal-shadow px-3 py-1 border-2 border-brutal-shadow font-brutal font-bold text-sm uppercase"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </header>

            {/* Content */}
            <div className="bg-white p-8 lg:p-12 border-4 border-brutal-shadow shadow-brutal mb-8">
              <div className="prose prose-xl max-w-none prose-headings:font-brutal prose-headings:font-black prose-headings:text-brutal-shadow prose-p:text-xl prose-p:text-brutal-shadow prose-p:font-medium prose-p:leading-relaxed prose-p:mb-8 prose-strong:font-black prose-em:font-bold prose-a:text-brutal-blue prose-a:font-bold prose-a:underline hover:prose-a:text-brutal-green">
                <TinaMarkdown 
                  content={post.body} 
                  components={{
                    h1: () => null, // Hide h1 in content since we show title in header
                    h2: (props) => <h2 className="font-brutal font-black text-3xl text-brutal-shadow mb-6 mt-12 uppercase tracking-tight" {...props} />,
                    h3: (props) => <h3 className="font-brutal font-black text-2xl text-brutal-shadow mb-4 mt-8 uppercase tracking-tight" {...props} />,
                    p: (props) => <p className="text-xl text-brutal-shadow font-medium leading-relaxed mb-8" {...props} />,
                    blockquote: (props) => <blockquote className="border-l-8 border-brutal-green bg-gray-50 p-6 my-12 not-italic" {...props} />,
                    strong: (props) => <strong className="font-black" {...props} />,
                    em: (props) => <em className="font-bold italic" {...props} />,
                    a: (props) => <a className="text-brutal-blue font-bold underline hover:text-brutal-green" {...props} />,
                    ol: (props) => <ol className="mb-8" {...props} />,
                    ul: (props) => <ul className="mb-8" {...props} />,
                    li: (props) => <li className="text-xl text-brutal-shadow font-medium leading-relaxed mb-4" {...props} />,
                    lic: (props) => <span className="text-xl text-brutal-shadow font-medium leading-relaxed" {...props} />,
                  }}
                />
              </div>
            </div>

            {/* Contact CTA */}
            <div className="mt-12 text-center">
              <a 
                href="mailto:jakub.jeziorny@gmail.com"
                className="inline-flex items-center bg-brutal-green text-black border-4 border-brutal-shadow shadow-brutal font-brutal font-bold text-lg px-8 py-4 hover:bg-brutal-yellow hover:shadow-brutal-hover hover:transform hover:-translate-x-1 hover:-translate-y-1 transition-all duration-150"
              >
                <Mail className="h-5 w-5 mr-2" />
                NAPISZ DO MNIE
              </a>
            </div>
            
            {/* Back button at the end */}
            <div className="mt-12 text-center">
              <Link to="/">
                <Button 
                  variant="outline"
                  className="bg-brutal-blue text-white border-4 border-brutal-shadow shadow-brutal font-brutal font-bold text-lg px-6 py-3 hover:bg-brutal-green hover:shadow-brutal-hover hover:transform hover:-translate-x-1 hover:-translate-y-1 transition-all duration-150"
                >
                  <ArrowLeft className="h-5 w-5 mr-2" />
                  POWRÓT DO BLOGA
                </Button>
              </Link>
            </div>
          </article>
        </main>

        {/* Footer */}
        <footer className="bg-brutal-shadow text-white py-8 mt-16">
          <div className="container mx-auto px-4 text-center">
            <div className="flex justify-center space-x-4 mb-4">
              <div className="w-6 h-6 bg-brutal-green border-2 border-white transform rotate-45" />
              <div className="w-6 h-6 bg-brutal-blue border-2 border-white transform rotate-45" />
              <div className="w-6 h-6 bg-brutal-yellow border-2 border-white transform rotate-45" />
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

export default Post;