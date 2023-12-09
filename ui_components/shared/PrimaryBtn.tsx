import { TImages, TNextImage } from "../../utils/images";

import { FC } from "react";
import Image from "next/image";

interface IPrimaryBtnProps {
  title: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  leftImage?: Record<TImages, TNextImage>;
  leftIcon?: TNextImage | TImages | string;
  className?: string;
  disabled?: boolean;
  loading?: boolean;
  width?: number;
  height?: number;
}

const PrimaryBtn: FC<IPrimaryBtnProps> = ({
  title,
  onClick,
  leftIcon,
  className,
  disabled,
  loading,
  width,
  height,
}) => {
  return (
    <button
      className={`${className} py-4 bg-main support_text_bold rounded-full flex gap-1 items-center w-full justify-center my-0 mx-auto relative disabled:opacity-50 text-text-900 `}
      onClick={onClick}
      disabled={disabled}
    >
      {leftIcon && !loading ? (
        <Image
          src={leftIcon ?? ""}
          width={width ?? 20}
          height={height ?? 20}
          alt="right-image"
        />
      ) : null}
      {title}
      {loading && (
        <div
          className={`spinner absolute right-4 w-8 h-8 top-1/2 z-30 -translate-y-1/2 `}
        >
          <div />
          <div />
          <div />
          <div />
        </div>
      )}
    </button>
  );
};

export default PrimaryBtn;
