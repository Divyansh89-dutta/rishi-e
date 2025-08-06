const Input = ({ label, ...props }) => (
  <div className="flex flex-col gap-1 mb-4">
    <label className="text-sm">{label}</label>
    <input
      {...props}
      className="border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-black"
    />
  </div>
);

export default Input;
