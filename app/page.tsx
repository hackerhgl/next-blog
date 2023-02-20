import Image from "next/image";
import { fetchPosts } from "api";
import Link from "next/link";
import dayjs from "dayjs";
import { cx } from "alias";
import Pagination from "./pagination";
import { getEnv, getSafePageNo } from "utils";
import { Post } from "types";

interface Props {
  searchParams: {
    page?: string;
  };
}

// export async function generateStaticParams() {
//   const posts = await Promise.resolve([1, 2]);

//   return posts;
// }

function parsePages(
  posts: Post[],
  rawCurrentPage: Props["searchParams"]["page"]
) {
  const total = posts.length;
  const { PER_PAGE } = getEnv();
  const max = Math.ceil(total / PER_PAGE);
  const currentPage = getSafePageNo(max, rawCurrentPage);
  const offset = (currentPage - 1) * PER_PAGE;
  const paginated = posts.slice(offset, currentPage * PER_PAGE);

  return { paginated, max, currentPage };
}

export default async function Home({ searchParams }: Props) {
  const data = await fetchPosts();
  console.log(searchParams);

  const { paginated, max, currentPage } = parsePages(data, searchParams.page);

  return (
    <>
      {paginated.map((post, i) => {
        const title = post.data.title;
        return (
          <Link
            key={post.path}
            href={post.slug}
            className={cx("block", "my-6", { "mt-0": !i })}
          >
            <Image
              src={"/banner.webp"}
              alt={post.data.title}
              width="1900"
              height="200"
            />
            <div className="my-3" />
            <h1 className="md:text-2xl text-lg font-medium">{title}</h1>
            <div className="my-1" />
            <div className="flex flex-row flex-wrap text-zinc-400 lines text-sm md:text-base">
              <p>{dayjs(post.stat.birthtime).format("MMM D, YYYY")}</p>
              <div className="mx-2" />
              <p>{Math.ceil(post.readTime.minutes)} minutes read</p>
            </div>
          </Link>
        );
      })}
      {max > 1 && (
        <>
          <Pagination currentPage={currentPage} total={max} />
          <div className="h-8" />
        </>
      )}
    </>
  );
}
