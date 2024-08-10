import { RoughNotation } from "react-rough-notation";

export default function Highlight({
    children,
    type,
    order,
}) {
    return (
        <RoughNotation
            type={type}
            order={order}
            color="#5f58ff"
            animate
            className="dark:text-neutral-100"
        >
            {children}
        </RoughNotation>
    );
}
