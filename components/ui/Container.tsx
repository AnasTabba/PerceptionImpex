type ContainerProps = {
  children: React.ReactNode;
  className?: string;
};

/** Centered content column with consistent responsive gutters. */
export function Container({ children, className = "" }: ContainerProps) {
  return (
    <div className={`mx-auto w-full max-w-content px-5 sm:px-8 lg:px-12 ${className}`}>
      {children}
    </div>
  );
}
