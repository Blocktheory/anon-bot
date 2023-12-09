import logo from "../../public/images/logo.svg";
import successIcon from "../../public/images/success_icon.png";

export type TImages = "logo" | "successIcon";

export type TNextImage = {
  src: string;
  height: number;
  width: number;
};

export const icons: Record<TImages, TNextImage> = {
  logo,
  successIcon,
};
