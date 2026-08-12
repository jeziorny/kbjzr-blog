import { Link } from "react-router-dom";

interface BlogPostProps {
  title: string;
  date?: string;
  href: string;
}

export const BlogPost = ({ title, date, href }: BlogPostProps) => {
  const displayDate = date ? date.slice(0, 10) : undefined;
  const isExternalLink = href.startsWith("http");
  const content = (
    <>
      <span className="post-row-title">{title}</span>
      {displayDate && <time dateTime={date}>{displayDate}</time>}
    </>
  );

  if (isExternalLink) {
    return <a className="post-row" href={href} rel="noreferrer" target="_blank">{content}</a>;
  }

  return <Link className="post-row" to={href}>{content}</Link>;
};
