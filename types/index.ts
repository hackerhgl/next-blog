import { Stats } from "fs"; // title: "This is example one UPDATE"
import { ReadTimeResults } from "reading-time";

export interface Post {
  path: string;
  slug: string;
  content: string;
  stat: Stats;
  readTime: ReadTimeResults;
  data: {
    title: string;
    author: string;
    category: string;
    image: string;
    tags: string[];
  };
}