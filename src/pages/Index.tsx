import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { AuthorCard } from "@/components/AuthorCard";
import { BlogHeader } from "@/components/BlogHeader";
import { BlogPost } from "@/components/BlogPost";

interface PostSummary {
  id: string;
  title: string;
  slug: string;
  date: string;
}

interface PostsData {
  posts: PostSummary[];
}

const Index = () => {
  const [data, setData] = useState<PostsData | null>(null);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    fetch("/posts-data.json")
      .then((response) => {
        if (!response.ok) throw new Error("Nie udało się wczytać listy wpisów.");
        return response.json() as Promise<PostsData>;
      })
      .then(setData)
      .catch(setError);
  }, []);

  const pageState = error
    ? <p className="page-message">{error.message}</p>
    : !data
      ? <p className="page-message">Wczytywanie wpisów…</p>
      : null;

  return (
    <>
      <Helmet>
        <title>KBJZR — technologia, produkty, biznes</title>
        <meta content="Blog Jakuba Jeziornego — o zarządzaniu produktem, technologii, AI i biznesie." name="description" />
        <link href="https://kbjzr.pl/" rel="canonical" />
      </Helmet>

      <div className="site-page">
        <BlogHeader showNewsletter={false} />
        <main className="site-frame site-main">
          <section className="home-content" aria-labelledby="posts-title">
            <header className="home-introduction">
              <h1 id="posts-title">Wpisy</h1>
              <p>O produktach, technologii, biznesie i rzeczach, które warto przemyśleć.</p>
            </header>

            {pageState || (
              <div className="post-feed">
                {data.posts.map((post) => (
                  <BlogPost date={post.date} href={`/posts/${post.slug}`} key={post.id} title={post.title} />
                ))}
              </div>
            )}
          </section>
          <AuthorCard />
        </main>
        <footer className="site-footer">KBJZR · 2026</footer>
      </div>
    </>
  );
};

export default Index;
