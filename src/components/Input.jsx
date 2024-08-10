export default function Input({
    type,
    id,
    name,
    placeholder,
}) {
    return (<input
        required
        type={type}
        id={id}
        name={name}
        placeholder={placeholder}
        className="mt-2 px-3 py-2 border border-neutral-200 dark:border-neutral-800 rounded text-neutral-800 dark:text-neutral-200 bg-transparent placeholder:text-sm text-sm placeholder:text-neutral-400 focus:outline-none focus:border focus:border-neutral-800 dark:focus:border-neutral-200 "
    />)
}
