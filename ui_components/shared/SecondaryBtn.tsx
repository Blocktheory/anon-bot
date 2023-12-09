import { TImages, TNextImage } from "../../utils/images";

import { FC } from "react";

interface ISecondaryBtn {
  title: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  className?: string;
  btnDisable?: boolean;
}

const SecondaryBtn: FC<ISecondaryBtn> = ({
  title,
  onClick,
  className,
  btnDisable,
}) => {
  return (
    <button
      className={`py-4 rounded-lg w-full text-xl font-semibold border border-[#007AFF] text-[#007AFF] mx-auto ${className}`}
      disabled={btnDisable}
      onClick={onClick}
    >
      {title}
    </button>
  );
};
export default SecondaryBtn;
