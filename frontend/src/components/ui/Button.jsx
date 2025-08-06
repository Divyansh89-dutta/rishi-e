const Button = ({ children, ...props }) => (
  <button
    {...props}
    className="bg-black text-white px-4 py-2 rounded hover:bg-gray-800 transition w-full"
  >
    {children}
  </button>
);

export default Button;
