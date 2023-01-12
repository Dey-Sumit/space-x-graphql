interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  Icon: React.ComponentType<any>;
  text: string;
  variant?: "solid" | "outlined";
}

const Button = ({ Icon, text, variant = "solid", ...rest }: ButtonProps) => (
  <button
    className="inline-flex items-center px-3 py-1 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-md hover:bg-gray-900 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
    {...rest}
  >
    <Icon />
    <span className="ml-2 text-xs">{text}</span>
  </button>
);

export default Button;
