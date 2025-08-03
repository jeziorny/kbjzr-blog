const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');

const postsDirectory = path.join(__dirname, '../content/posts');
const outputFilePath = path.join(__dirname, '../public/posts-data.json');

function generatePostsMeta() {
  const posts = [];
  const files = fs.readdirSync(postsDirectory);

  files.forEach(file => {
    if (file.endsWith('.md')) {
      const filePath = path.join(postsDirectory, file);
      const fileContent = fs.readFileSync(filePath, 'utf8');
      const { data, content } = matter(fileContent);

      // Ensure slug is derived from filename if not present in frontmatter
      const slug = data.slug || file.replace(/\.md$/, '');

      posts.push({
        id: `content/posts/${file}`,
        title: data.title || slug,
        slug: slug,
        date: data.date ? new Date(data.date).toISOString() : new Date().toISOString(),
        excerpt: data.excerpt || '',
        tags: data.tags || [],
        featured: data.featured || false,
        body: content // Include markdown content for rendering
      });
    }
  });

  // Sort posts by date, newest first
  posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  fs.writeFileSync(outputFilePath, JSON.stringify({ posts }, null, 2));
  console.log(`Generated ${posts.length} posts in public/posts-data.json`);
}

generatePostsMeta();