const Spinner = ({ className }: { className?: string }) => {
  return (
    <span
      className={`${className} inline-block animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]`}
    ></span>
  );
};
export default Spinner;
