import Image from "next/image";
import styles from "./page.module.css";
import { fetchPosts } from "api";
import Link from "next/link";
import Logo from "components/logo";
import dayjs from "dayjs";

export default async function Home() {
  const data = await fetchPosts();

  return (
    <>
      <title>Blog static</title>
      <meta name="description" content="Generated by create next app" />
      <main className="mx-auto  md:max-w-3xl">
        <Logo />
        <div className="my-4" />
        {data.map((v) => {
          const title = v.data.title;

          return (
            <Link key={v.path} href={v.slug} className="my-8 block">
              <Image
                src={"/banner.webp"}
                alt={v.data.title}
                width="1900"
                height="200"
              />
              <div className="my-4" />
              <h1 className="text-2xl font-semibold">{title}</h1>
              <div className="my-2" />
              <div className="flex flex-row flex-wrap">
                <p>By {v.data.author}</p>
                <div className="mx-2" />
                <p>{dayjs(v.stat.birthtime).format("MMM D, YYYY")}</p>
                <div className="mx-2" />
                <p>{Math.ceil(v.readTime.minutes)} minutes read</p>
              </div>
            </Link>
          );
        })}
      </main>
    </>
  );
}
