import { FC } from "react";

interface IPrimaryBtnProps {
  title: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  className?: string;
  disabled?: boolean;
  rightIcon?: string;
}

const PrimaryBtn: FC<IPrimaryBtnProps> = ({
  title,
  onClick,
  className,
  disabled,
  rightIcon,
}) => {
  return (
    <button
      className={`${className} py-4 bg-[#007AFF] font-semibold flex items-center gap-2 justify-center text-xl rounded-xl w-full mx-auto disabled:opacity-50 text-white  px-10`}
      onClick={onClick}
      disabled={disabled}
    >
      {title}
      {rightIcon && <img src={rightIcon} />}
    </button>
  );
};

export default PrimaryBtn;
