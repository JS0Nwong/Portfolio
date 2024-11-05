export default function GuestbookLists({
  author,
  message,
}: {
  author: string;
  message: string;
}) {
  return (
    <li className="font-geist font-medium text-sm text-neutral-800 dark:text-neutral-200 first:mt-0 mt-2">
      <span className="text-neutral-500 dark:text-neutral-400">{author}: </span>
      {message}
    </li>
  );
}
