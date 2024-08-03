import clsx from "clsx";

import { EMessage } from "@/types/messages";

type TProps = {
  message: string;
  error: boolean;
};

export const Informer = ({ message, error }: TProps) => {
  return (
    <div
      className={clsx(
        "absolute -top-6 -z-10 w-full animate-slide-out overflow-hidden text-ellipsis bg-gradient-to-t bg-clip-text text-center text-xl font-semibold text-transparent",
        {
          "from-zinc-900 via-red-600 to-red-600 dark:from-zinc-300 dark:via-red-600 dark:to-red-600":
            error,
          "from-zinc-900 via-violet-600 to-violet-600 dark:from-zinc-300 dark:via-violet-600 dark:to-violet-600":
            !error,
        },
      )}
    >
      {error ? EMessage.ERROR : message}
    </div>
  );
};
