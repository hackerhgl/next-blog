import CategoriesSection from "components/categories-section";

import Hero from "./hero";
import { FewPostsSection } from "components/few-posts-section";
import { fetchPosts } from "api";

export default async function RootPage() {
  const posts = await fetchPosts();
  const fakePosts = new Array(4).fill(posts[0]);
  return (
    <div>
      <Hero />
      <CategoriesSection />
      <div className="h-10" />
      <FewPostsSection posts={fakePosts} label="Latest logs:" />
      <FewPostsSection posts={fakePosts} label="Most viewed logs:" />
      <div className="h-10" />
    </div>
  );
}
