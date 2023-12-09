import { FC } from "react";
import Image from "next/image";
import { PrimaryBtn } from "../shared";
import { icons } from "../../utils/images";

const HomePage: FC<any> = () => {
  return (
    <div className=" relative h-full">
      <Image
        src={icons.bannerBg}
        alt="banner"
        className="min-h-full min-w-[1024px] w-full h-auto fixed left-0 top-0"
      />
      <div className="container mx-auto relative h-full">
        <div className="absolute left-1/2 -translate-x-1/2 bottom-10 text-center">
          <h1 className="text-white text-[72px] font-extralight fontAdvent leading-[72px] mb-4">
            Next generation <br />{" "}
            <span className="font-normal"> Identity verifier</span>
          </h1>
          <p className="text-white text-base mb-6">
            Anon Aadhaar securely verifies your document by confirming its
            government signature. This process happens entirely on your device
            for privacy. Please note, slower internet speeds may affect
            verification time.
          </p>
          <PrimaryBtn
            className="w-[300px] rounded-full"
            title={"Launch AnonBOT"}
            rightIcon={icons.arrowRight.src}
          />
        </div>
      </div>
    </div>
  );
};

export default HomePage;
