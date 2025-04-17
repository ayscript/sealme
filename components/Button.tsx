import React from "react";

const Button = (props: React.ButtonHTMLAttributes<HTMLButtonElement> & {
  children:
    | string
    | number
    | bigint
    | boolean
    | Iterable<React.ReactNode>
    | React.ReactPortal
    | Promise<React.AwaitedReactNode>
    | null
    | undefined;
}) => {
  return (
    <button
      {...props}
      className={
        "px-5 py-2 bg-primary text-white text-1 flex items-center justify-center gap-2 rounded " +
        (props.className || "") // Allow additional class names
      }
    >
      {props.children}
    </button>
  );
};

export default Button;
