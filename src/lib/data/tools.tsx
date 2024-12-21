import { RxShadow, RxColorWheel, RxKeyboard } from "react-icons/rx";

export const tools: {
  title: string;
  href: string;
  icon: JSX.Element;
  description?: string;
}[] = [
  {
    title: "Gradiant Generator",
    href: "/tools/gradient-generator",
    icon: <RxShadow />,
  },
  {
    title: "Color Picker",
    href: "/tools/color-picker",
    icon: <RxColorWheel />,
  },
  {
    title: "Progress",
    href: "/docs/primitives/progress",
    icon: <RxShadow />,
  },
  {
    title: "Scroll-area",
    href: "/docs/primitives/scroll-area",
    icon: <RxShadow />,
  },
  {
    title: "Tabs",
    href: "/docs/primitives/tabs",
    icon: <RxShadow />,
  },
  {
    title: "Snippets",
    href: "/tools/snippets",
    icon: <RxKeyboard />,
  },
];
