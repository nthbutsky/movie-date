"use client";

import React, { useState } from "react";

import clsx from "clsx";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconDefinition } from "@fortawesome/free-solid-svg-icons";
import { faXmark } from "@fortawesome/free-solid-svg-icons";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  icon?: IconDefinition;
  onClear: () => void;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, icon, onClear, ...props }, ref) => {
    const [focused, setFocused] = useState(false);

    const handleFocus = () => {
      setFocused(true);
    };

    const handleBlur = () => {
      setFocused(false);
    };

    return (
      <div className="relative rounded-md bg-zinc-50">
        {icon && (
          <FontAwesomeIcon
            aria-hidden="true"
            icon={icon}
            size="sm"
            className={clsx("absolute left-3 top-3 text-zinc-400", {
              "text-zinc-200": props.disabled,
            })}
          />
        )}
        <input
          type={type}
          id="input"
          className={clsx(
            "input-cancel-btn block w-full rounded-md border-0 py-1.5 text-zinc-950 caret-violet-600 shadow-sm outline-none ring-2 ring-zinc-300 transition-all ease-in-out placeholder:text-zinc-400 placeholder:transition placeholder:ease-in-out focus:bg-violet-50 focus:ring-violet-600 disabled:cursor-not-allowed disabled:bg-zinc-50 disabled:text-zinc-500 disabled:ring-zinc-200 sm:text-sm sm:leading-6",
            {
              "pl-10": icon,
            },
            className,
          )}
          ref={ref}
          onFocus={handleFocus}
          onBlur={handleBlur}
          {...props}
        />
        {props.value !== "" && (
          <button
            type="button"
            className="group absolute right-[10px] top-2 flex h-5 w-5 cursor-pointer items-center justify-center rounded-md border-[1px] border-zinc-300 bg-zinc-50 transition-all ease-in-out hover:border-violet-300 hover:bg-violet-100"
            onClick={onClear}
          >
            <FontAwesomeIcon
              icon={faXmark}
              size="sm"
              className="text-zinc-400 group-hover:text-violet-400"
            />
          </button>
        )}
      </div>
    );
  },
);