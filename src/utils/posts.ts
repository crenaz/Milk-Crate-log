import { getCollection } from "astro:content";

export async function getAllPosts() {
  const posts = await getCollection("blog");

  return posts
    .filter((p) => !p.data.draft)
    .sort((a, b) => b.data.pubDate - a.data.pubDate);
}
