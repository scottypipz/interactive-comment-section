const Button = ({ children, ...otherProps }) => {
  return (
    <button
      {...otherProps}
      className={
        'uppercase px-5 py-2 text-white text-center hover:bg-lightBlue bg-darkBlue rounded-md text-sm ' +
        (otherProps.className || '')
      }
    >
      {children}
    </button>
  );
};

export default Button;