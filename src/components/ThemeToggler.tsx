import { useTheme } from "next-themes";

import { ETheme } from "@/types/theme";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMoon } from "@fortawesome/free-regular-svg-icons";
import { faSun } from "@fortawesome/free-regular-svg-icons";

export function ThemeToggler() {
  const { theme, setTheme } = useTheme();

  return (
    <button
      type="button"
      className="group inline-flex rounded-full bg-zinc-50 px-3 py-2 shadow-zinc-800 ring-1 ring-zinc-300 backdrop-blur transition hover:ring-red-200 dark:bg-zinc-800 dark:ring-zinc-600 dark:hover:ring-zinc-400"
      onClick={() =>
        setTheme(theme === ETheme.DARK ? ETheme.LIGHT : ETheme.DARK)
      }
    >
      <FontAwesomeIcon
        icon={faSun}
        size="lg"
        className="h-6 w-6 text-red-400 transition group-hover:text-red-600 dark:hidden dark:fill-red-50"
      />
      <FontAwesomeIcon
        icon={faMoon}
        size="lg"
        className="hidden h-6 w-6 text-zinc-500 transition dark:block dark:group-hover:text-zinc-400"
      />
    </button>
  );
}
