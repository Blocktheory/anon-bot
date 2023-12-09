import arrowRight from "../../public/images/arrow_right.svg";
import bannerBg from "../../public/images/bg.png";
import github from "../../public/images/github.svg";
import logo from "../../public/images/logo.svg";
import logoText from "../../public/images/logo_text.svg";
import successIcon from "../../public/images/success_icon.png";
import telegram from "../../public/images/telegram.svg";

export type TImages =
  | "logo"
  | "successIcon"
  | "logoText"
  | "bannerBg"
  | "arrowRight"
  | "github"
  | "telegram";

export type TNextImage = {
  src: string;
  height: number;
  width: number;
};

export const icons: Record<TImages, TNextImage> = {
  logo,
  successIcon,
  logoText,
  bannerBg,
  arrowRight,
  github,
  telegram,
};
