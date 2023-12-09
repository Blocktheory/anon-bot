import { usePathname, useRouter } from "next/navigation";

import Image from "next/image";
import Link from "next/link";
import { icons } from "../../utils/images";

const Header = () => {
  return (
    <header className="z-[9] fixed left-0 top-0 h-[64px] test text-center flex items-center justify-between w-full header">
      <div className="container mx-auto flex items-center justify-between">
        <Link href={"/"}>
          <Image src={icons.logo} alt="logo" className="w-10" />
        </Link>

        <div className="flex items-center gap-10">
          <div className="flex items-center gap-5">
            <div className="text-base text-[#D5D5D5] cursor-pointer">
              <p>Admin</p>
            </div>
            <div className="text-base text-[#D5D5D5] cursor-pointer">
              <p>Check-in</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Link href={"/"}>
              <Image src={icons.github} alt="github" />
            </Link>
            <Link href={"/"}>
              <Image src={icons.telegram} alt="github" />
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};
export default Header;
