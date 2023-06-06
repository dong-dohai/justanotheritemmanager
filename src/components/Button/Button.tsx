import classNames from "classnames";

export type ButtonProps = React.DetailedHTMLProps<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
>;

export const Button = ({ children, className, ...rest }: ButtonProps) => {
  const internalClassName = classNames(
    "rounded-full bg-pink-500 text-white flex flex-col items-center justify-center px-5 py-1",
    className
  );

  return (
    <button {...rest} className={internalClassName}>
      {children}
    </button>
  );
};
