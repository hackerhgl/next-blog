"use client";

import { categories } from "lib/categories";
import { PostsArgs, PostsArgsIndexes, PostsProps, PostsSorts } from "./types";
import Dropdown from "components/dropdown";
import { cx } from "alias";
import { useRouter } from "next/navigation";

interface PostsFiltersProps {
  args: PostsArgs;
  indexes: PostsArgsIndexes;
  params: PostsProps["params"];
}

export default function PostsFilters({
  args,
  params,
  indexes,
}: PostsFiltersProps) {
  const categoriesToRender = [{ key: "all", label: "All" }, ...categories];
  const router = useRouter();

  const onSortSelect = (sort: string) => {
    const newParams = [...params.args];
    newParams[indexes.sort] = sort;
    router.push(`/posts/${newParams.join("/")}`);
  };

  return (
    <div className="flex flex-row justify-between items-end">
      <div className="flex flex-col">
        <h2 className="font-medium">Categories</h2>
        <div className="h-2" />
        <div className="flex flex-row flex-wrap space-x-2">
          {categoriesToRender.map((category) => {
            const isSelected = category.key === args.category.toLowerCase();
            return (
              <div
                key={category.key}
                className={cx(
                  "px-4 py-2  cursor-pointer rounded-md shadow shadow-white/0",
                  "hover:bg-zinc-700 transition-all duration-300  hover:shadow-lg hover:shadow-white/5",
                  isSelected ? "bg-zinc-700" : "bg-zinc-800"
                )}
              >
                <p className="text-sm">{category.label}</p>
              </div>
            );
          })}
        </div>
      </div>
      <div className="flex flex-col">
        <Dropdown
          title="Sort"
          items={PostsSorts}
          selected={args.sort}
          onSelect={onSortSelect}
        />
        {/* <SVGDownArrow /> */}
      </div>
    </div>
  );
}
