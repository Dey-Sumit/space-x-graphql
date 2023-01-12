const Badge = ({ type }: { type: "success" | "failure" }) => (
  <span
    className={`text-xs inline-block py-1 px-3 leading-none text-center whitespace-nowrap align-baseline h-fit  text-white rounded-full ${
      type === "success" ? "border-green-600 bg-green-800" : "border-red-600 bg-red-800"
    }`}
  >
    {type}
  </span>
);

export default Badge;
