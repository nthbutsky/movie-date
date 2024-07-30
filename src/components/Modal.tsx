import { useClickOutside } from "@/hooks/useClickOutside";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";

type TProps = {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
};

export const Modal = ({ isOpen, onClose, children }: TProps) => {
  const containerRef = useClickOutside(isOpen, onClose);

  return (
    <>
      {isOpen && (
        <>
          <div className="absolute left-0 top-0 z-50 h-full w-full bg-zinc-50 opacity-50 transition-all ease-in-out dark:bg-zinc-900"></div>
          <div
            className="group/main container absolute left-1/2 top-1/2 z-50 w-[calc(100%-32px)] -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-md bg-zinc-50 shadow-glow shadow-violet-600 dark:bg-zinc-900 sm:w-full lg:max-w-[720px]"
            ref={containerRef}
          >
            <button
              type="button"
              className="group/btn absolute right-0 z-20 mr-4 mt-4 inline-flex h-8 w-8 items-center justify-center rounded-md border border-zinc-300 bg-zinc-50 transition-[bottom] ease-in-out hover:border-violet-300 hover:bg-violet-100 lg:-bottom-12 lg:left-1/2 lg:mr-0 lg:mt-0 lg:-translate-x-1/2 lg:-translate-y-1/2 lg:group-hover/main:bottom-0"
              onClick={onClose}
            >
              <FontAwesomeIcon
                icon={faXmark}
                size="lg"
                className="text-zinc-400 group-hover/btn:text-violet-400"
              />
            </button>
            {children}
          </div>
        </>
      )}
    </>
  );
};
