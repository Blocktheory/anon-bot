import { FC } from "react";

interface IPrimaryBtnProps {
  title: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  className?: string;
  disabled?: boolean;
}

const PrimaryBtn: FC<IPrimaryBtnProps> = ({
  title,
  onClick,
  className,
  disabled,
}) => {
  return (
    <button
      className={`${className} py-4 bg-[#007AFF] font-semibold text-xl rounded-xl w-full mx-auto disabled:opacity-50 text-white `}
      onClick={onClick}
      disabled={disabled}
    >
      {title}
    </button>
  );
};

export default PrimaryBtn;
