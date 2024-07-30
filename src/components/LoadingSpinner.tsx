import clsx from "clsx";

import { Righteous } from "next/font/google";

const righteous = Righteous({ subsets: ["latin"], weight: "400" });

type TProps = {
  text?: string;
  className?: string;
  isBackground?: boolean;
};

export const LoadingSpinner = ({
  text,
  className,
  isBackground = true,
}: TProps) => {
  return (
    <div
      className={clsx("fixed z-50 w-full animate-fade-in-spinner", className)}
    >
      {isBackground && (
        <div className="absolute left-1/2 top-1/2 z-40 h-64 w-full -translate-x-1/2 -translate-y-1/2 bg-gradient-to-t from-transparent via-zinc-50 to-transparent dark:bg-gradient-to-t dark:from-transparent dark:via-zinc-900 dark:to-transparent" />
      )}

      <div className="absolute left-1/2 top-1/2 z-50 flex -translate-x-1/2 -translate-y-1/2 items-center justify-center gap-2">
        <svg
          className="h-8 w-8 animate-spin text-violet-600"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          ></circle>
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          ></path>
        </svg>
        {text && (
          <span
            className={clsx(
              "text-3xl font-semibold text-violet-600",
              righteous.className,
            )}
          >
            {text}
          </span>
        )}
      </div>
    </div>
  );
};
