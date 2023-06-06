import classNames from "classnames";

export type BoxProps = {
  children?: React.ReactNode;
  className?: string;
};

export const Box = ({ children, className }: BoxProps) => {
  const internalClassName = classNames(
    "flex flex-col gap-6 justify-center bg-white p-5 rounded-md shadow-xl",
    className
  );

  return <div className={internalClassName}>{children}</div>;
};

export default Box;
