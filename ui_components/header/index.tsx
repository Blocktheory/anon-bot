import { usePathname, useRouter } from "next/navigation";

import Image from "next/image";
import { icons } from "../../utils/images";

const Header = (props: any) => {
  return (
    <header className="z-[9] fixed left-1/2 -translate-x-1/2 top-4 rounded-3xl h-[64px] bg-secondary-100 text-center flex items-center justify-between px-3 w-[calc(100vw-32px)] lg:w-[600px]">
      <Image src={icons.logo} alt="logo" className="w-10" />

      {/* {step != 1 && (
        <Image
          src={icons.logOut}
          alt="logout"
          className="w-8 cursor-pointer"
          onClick={handleLogOut}
        />
      )} */}
    </header>
  );
};
export default Header;
