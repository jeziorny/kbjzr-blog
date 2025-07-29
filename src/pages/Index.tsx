import { Helmet } from "react-helmet-async";
import { BlogHeader } from "@/components/BlogHeader";
import { BlogPost } from "@/components/BlogPost";
import { AuthorCard } from "@/components/AuthorCard";
import { useTina } from "tinacms/dist/react";
import client from "../tina/__generated__/client";

const Index = () => {
  const { data, loading } = useTina({
    query: `{ postConnection { edges { node { id title slug featured excerpt } } } }`,
    variables: {},
  });

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

  if (!data || !data.postConnection) {
    return (
      <div className="min-h-screen bg-background font-brutal">
        <BlogHeader />
        <main className="container mx-auto px-4 pt-8 pb-12">
          <div className="max-w-4xl mx-auto text-center py-16">
            <div className="bg-brutal-pink border-4 border-brutal-shadow shadow-brutal p-8">
              <h1 className="font-brutal font-black text-3xl text-white mb-4">
                BŁĄD ŁADOWANIA POSTÓW
              </h1>
            </div>
          </div>
        </main>
      </div>
    );
  }

  const blogPosts = data.postConnection.edges.map((edge) => edge.node);

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
            <div className="grid grid-cols-1 gap-6">
              {blogPosts.map((post) => (
                <BlogPost
                  key={post.id}
                  title={post.title}
                  href={`/posts/${post.slug}`}
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