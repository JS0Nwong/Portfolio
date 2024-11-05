import * as React from "react";
import { cn } from "@/lib/utils";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { tools } from "@/lib/data/index";

export function NavDropdown() {
  return (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger className="font-geist m-0 p-0 font-medium text-neutral-800 dark:text-neutral-300 bg-transparent ">
            tools
          </NavigationMenuTrigger>
          <NavigationMenuContent className="bg-white dark:bg-zinc-950">
            <ul className="grid gap-1 p-2 md:grid-cols-2 w-[350px]">
              {tools.map((component) => (
                <ListItem
                  key={component.title}
                  title={component.title}
                  href={component.href}
                  icon={component.icon}
                >
                  {component.description}
                </ListItem>
              ))}
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
}

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a"> & { icon: React.ReactNode }
>(({ className, title, icon, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "block relative select-none rounded-md px-2 py-3 leading-none no-underline outline-none transition-colors text-muted-foreground  hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground ",
            className
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none flex gap-2">
            {icon} {title}
          </div>
          <p className="line-clamp-2 text-sm leading-snug text-neutral-400 dark:text-neutral-600">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  );
});
ListItem.displayName = "ListItem";
