const Form = ({ onSubmit, children, className = "", ...props }) => {
  return (
    <form onSubmit={onSubmit} className={`space-y-4 ${className}`} {...props}>
      {children}
    </form>
  );
};

export default Form;