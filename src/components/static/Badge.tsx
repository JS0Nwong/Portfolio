
export default function Badge({
  text,
  icon,
}: {
  text: string;
  icon: React.ReactNode;
}) {
  return (
    <span className="select-none inline-flex items-center bg-neutral-200/50 text-neutral-900 text-sm font-medium me-0.5 px-2 py-0.5 rounded dark:bg-neutral-800/50 dark:text-neutral-100 border border-1 border-neutral-300 dark:border-neutral-700">
      {icon}
      {text}
    </span>
  );
}
