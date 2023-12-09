import logo from "../../public/assets/images/logo.svg";

export type TImages = "logo";

export type TNextImage = {
  src: string;
  height: number;
  width: number;
};

export const icons: Record<TImages, TNextImage> = {
  logo,
};
