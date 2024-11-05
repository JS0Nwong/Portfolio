import { Link } from "react-router-dom";

export default function BlogListItem({ slug }: { slug: string }) {
  return (
    <Link
      to={`/blog/${slug}`}
      className="rounded-md py-1 flex flex-col -mx-3 px-3"
    >
      <h1 className="text-md font-semibold text-neutral-800 dark:text-neutral-200">
        Blog Title
      </h1>
      <span className="text-sm text-neutral-400 font-medium">
        900,00 views &#x00B7; <span className="text-neutral-500">Aug 2024</span>
      </span>
    </Link>
  );
}
