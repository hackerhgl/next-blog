import Container from "components/container";
import PostCard from "components/post-card";
import { typography } from "lib/typography";
import Link from "next/link";
import { Post } from "types";

interface PostsSectionProps {
  posts: Post[];
  label: string;
  buttonLabel?: string;
  buttonLink?: string;
}

export async function FewPostsSection({
  posts,
  label,
  buttonLabel,
  buttonLink,
}: PostsSectionProps) {
  const renderButton = buttonLabel && buttonLink;
  return (
    <div className=" bg-black/60 py-12">
      <Container>
        <div className="flex flex-row justify-between items-center">
          <h2 className={typography.subheading}>{label}</h2>
          {renderButton && (
            <Link href={buttonLink} className="font-medium underline">
              {buttonLabel}
            </Link>
          )}
        </div>
        <div className="h-4" />
        <div className="flex flex-row space-x-4">
          {posts.map((post) => {
            return (
              <PostCard
                key={post.getSlug()}
                post={post}
                className="max-w-[30%]"
              />
            );
          })}
        </div>
      </Container>
    </div>
  );
}
