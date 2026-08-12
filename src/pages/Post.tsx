import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import Markdown from "markdown-to-jsx";
import { Link, useParams } from "react-router-dom";
import { AuthorCard } from "@/components/AuthorCard";
import { BlogHeader } from "@/components/BlogHeader";

interface PostData {
  title: string;
  slug: string;
  date: string;
  excerpt: string;
  tags?: string[];
  body: string;
}

interface PostsData {
  posts: PostData[];
}

const Post = () => {
  const { slug } = useParams<{ slug: string }>();
  const [post, setPost] = useState<PostData | null>(null);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (!slug) return;

    fetch("/posts-data.json")
      .then((response) => {
        if (!response.ok) throw new Error("Nie udało się wczytać wpisu.");
        return response.json() as Promise<PostsData>;
      })
      .then((result) => {
        const foundPost = result.posts.find((entry) => entry.slug === slug);
        if (!foundPost) throw new Error("Nie znaleziono tego wpisu.");
        setPost(foundPost);
      })
      .catch(setError);
  }, [slug]);

  if (error) {
    return (
      <div className="site-page">
        <BlogHeader />
        <main className="site-frame site-main">
          <p className="page-message article">{error.message} <Link to="/">Wróć do wpisów.</Link></p>
          <AuthorCard />
        </main>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="site-page">
        <BlogHeader />
        <main className="site-frame site-main">
          <p className="page-message article">Wczytywanie wpisu…</p>
          <AuthorCard />
        </main>
      </div>
    );
  }

  const displayDate = post.date.slice(0, 10);
  const tags = post.tags?.filter(Boolean) ?? [];

  return (
    <>
      <Helmet>
        <title>{post.title} — KBJZR</title>
        <meta content={post.excerpt || post.title} name="description" />
        <meta content={`${post.title} — KBJZR`} property="og:title" />
        <meta content={post.excerpt || post.title} property="og:description" />
        <meta content={`https://kbjzr.pl/posts/${slug}`} property="og:url" />
        <meta content="article" property="og:type" />
        <meta content={post.date} property="article:published_time" />
        <link href={`https://kbjzr.pl/posts/${slug}`} rel="canonical" />
      </Helmet>

      <div className="site-page">
        <BlogHeader />
        <main className="site-frame site-main">
          <article className="article">
            <header className="article-header">
              <time dateTime={post.date}>{displayDate}</time>
              {tags.length > 0 && <span className="article-tags">{tags.join(", ")}</span>}
              <h1>{post.title}</h1>
            </header>
            <div className="article-body">
              <Markdown options={{ overrides: { h1: () => null } }}>{post.body}</Markdown>
            </div>
            <footer className="article-footer">
              <a href="mailto:jakub.jeziorny@gmail.com">Napisz do mnie</a>
              <Link to="/">Wróć do wpisów</Link>
            </footer>
          </article>
          <AuthorCard />
        </main>
        <footer className="site-footer">KBJZR · 2026</footer>
      </div>
    </>
  );
};

export default Post;
