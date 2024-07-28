import clsx from "clsx";

export const ScrollIndicator = ({ className }: { className?: string }) => {
  return (
    <div className={clsx(className)}>
      <div className="before:animate-scroll-indicator relative box-border h-12 w-8 rounded-2xl border-2 border-violet-600 bg-violet-100 before:absolute before:left-2/4 before:top-0 before:h-2 before:w-2 before:-translate-x-2/4 before:translate-y-2/4 before:rounded-[50%] before:bg-violet-600 before:content-['']"></div>
    </div>
  );
};
