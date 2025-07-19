import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { BlogHeader } from "@/components/BlogHeader";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Mail } from "lucide-react";
import Markdown from "markdown-to-jsx";

interface PostData {
  title: string;
  date: string;
  excerpt: string;
  tags: string[];
  content: string;
}

const Post = () => {
  const { slug } = useParams<{ slug: string }>();
  const [post, setPost] = useState<PostData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadPost = async () => {
      if (!slug) {
        setError("Nie znaleziono posta");
        setLoading(false);
        return;
      }

      try {
        // Load post metadata
        const metaResponse = await fetch('/posts-meta.json');
        const metadata = await metaResponse.json();
        const postMeta = metadata.posts.find((p: any) => p.slug === slug);
        
        if (!postMeta) {
          setError("Post nie został znaleziony");
          setLoading(false);
          return;
        }

        // Load post content
        const contentResponse = await fetch(`/${postMeta.file}`);
        const rawContent = await contentResponse.text();
        
        // Simple frontmatter parser
        const frontmatterRegex = /^---\s*\n([\s\S]*?)\n---\s*\n([\s\S]*)$/;
        const match = rawContent.match(frontmatterRegex);
        
        if (match) {
          const frontmatter = match[1];
          const content = match[2];
          
          // Parse frontmatter
          const meta: any = {};
          frontmatter.split('\n').forEach(line => {
            const [key, ...valueParts] = line.split(':');
            if (key && valueParts.length > 0) {
              const value = valueParts.join(':').trim().replace(/^["']|["']$/g, '');
              if (key.trim() === 'tags') {
                meta[key.trim()] = value.replace(/[\[\]]/g, '').split(',').map((tag: string) => tag.trim().replace(/["']/g, ''));
              } else {
                meta[key.trim()] = value;
              }
            }
          });
          
          setPost({
            title: meta.title || postMeta.title,
            date: meta.date || postMeta.date,
            excerpt: meta.excerpt || postMeta.excerpt,
            tags: meta.tags || postMeta.tags,
            content: content
          });
        } else {
          setError("Błąd parsowania posta");
        }
      } catch (err) {
        setError("Błąd ładowania posta");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    loadPost();
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

  if (error || !post) {
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
        {post.tags.map(tag => (
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
            "keywords": post.tags.join(", "),
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
                {post.tags.length > 0 && (
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
                <Markdown
                  options={{
                    overrides: {
                      h1: {
                        props: {
                          className: "font-brutal font-black text-4xl text-brutal-shadow mb-8 uppercase tracking-tight"
                        }
                      },
                      h2: {
                        props: {
                          className: "font-brutal font-black text-3xl text-brutal-shadow mb-6 mt-12 uppercase tracking-tight"
                        }
                      },
                      h3: {
                        props: {
                          className: "font-brutal font-black text-2xl text-brutal-shadow mb-4 mt-8 uppercase tracking-tight"
                        }
                      },
                      p: {
                        props: {
                          className: "text-xl text-brutal-shadow font-medium leading-relaxed mb-8"
                        }
                      },
                      blockquote: {
                        props: {
                          className: "border-l-8 border-brutal-green bg-gray-50 p-6 my-12 not-italic"
                        }
                      },
                      strong: {
                        props: {
                          className: "font-black"
                        }
                      },
                      em: {
                        props: {
                          className: "font-bold italic"
                        }
                      }
                    }
                  }}
                >
                  {post.content}
                </Markdown>
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