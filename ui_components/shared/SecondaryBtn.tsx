import { TImages, TNextImage } from "../../utils/images";

import { FC } from "react";
import Image from "next/image";

interface ISecondaryBtn {
  title: string;
  onClick: React.MouseEventHandler<HTMLButtonElement>;
  leftImage?: TNextImage | TImages;
  rightImage?: TNextImage | TImages | string;
  className?: string;
  btnDisable?: boolean;
  loading?: boolean;
}

const SecondaryBtn: FC<ISecondaryBtn> = ({
  title,
  onClick,
  rightImage,
  leftImage,
  className,
  btnDisable,
  loading,
}) => {
  return (
    <button
      className={`py-4 support_text_bold rounded-lg flex gap-1 items-center w-full justify-center border max-w-[400px] mx-auto ${className}`}
      disabled={btnDisable}
      onClick={onClick}
    >
      {leftImage && !loading && <Image src={leftImage} alt="right-image" />}
      {!loading && title}
      {!loading && rightImage && <Image src={rightImage} alt="right-image" />}
      {loading && (
        <div className="bouncing-loader">
          <div></div>
          <div></div>
          <div></div>
        </div>
      )}
    </button>
  );
};
export default SecondaryBtn;
