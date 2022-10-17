import Image from "next/image";
import {
  MagnifyingGlassIcon,
  Bars4Icon,
  ShoppingCartIcon,
} from "@heroicons/react/24/outline";
import { signIn, signOut, useSession } from "next-auth/react";
import {useRouter} from "next/router";
import {useSelector} from "react-redux"
import { selectItems } from "../slices/basketSlice";

const Header = () => {

const router = useRouter();
const items = useSelector(selectItems);
const { data: session, status } = useSession()

  return (
    <div>
      <div className="flex items-center bg-slate-800 p-1 flex-grow py-2">
        {/* left side - Icon */}
        <div onClick={ ()=> router.push("/")} className="mt-2 flex items-center flex-grow py-2 sm:flex-grow-0 ">
          <Image
            src="https://links.papareact.com/f90"
            width={150}
            height={40}
            objectFit={"contain"}
            className="cursor-pointer"
            alt="logo"
          />
        </div>

        {/* middle side - search bar */}
        <div className="flex items-center h-10 bg-yellow-400 rounded-md flex-grow cursor-pointer  ">
          <input
            className="p-2 h-full w-6 px-4 rounded-l-md flex-grow focus:outline-none"
            type="text"
          />
          <MagnifyingGlassIcon className="h-12 p-4 " />
        </div>

        {/* right side - user Info */}
        <div className="text-white flex items-center text-xs space-x-6 mx-6 whitespace-nowrap">
          <div onClick={status === "authenticated" ? signOut : signIn} className="link">
            <p>{session ? `Hello, ${session.user.name}` : "Sign In"}</p>
            <p className="font-extrabold md:text-sm">Account & Lists</p>
          </div>
          <div className="link">
            <p>Returns </p>
            <p className="font-extrabold md:text-sm">& Orders</p>
          </div>
          <div onClick={ ()=> router.push("/Checkout")} className="relative link flex items-center">
            <span className="absolute top-0 right-0 md:right-10 h-4 w-4 bg-yellow-500 rounded-full text-center text-black">
              {items.length}
            </span>
            <ShoppingCartIcon className="h-10" />
            <p className="hidden md:inline font-extrabold md:text-sm">Basket</p>
          </div>
        </div>
      </div>

      {/* bottom nav header */}
      <div className="flex items-center space-x-3 p-2 pl-6 bg-slate-700 text-white ">
        <p className="link  flex items-center">
          <Bars4Icon className="h-6 mr-1 " />
          All
        </p>

        <p className="link">Prime Video</p>
        <p className="link">Amazon Business</p>
        <p className="link">Today's Deals</p>
        <p className="link hidden lg:inline-flex">Electronics</p>
        <p className="link hidden lg:inline-flex">Kitchen</p>
        <p className="link hidden lg:inline-flex">Cloths</p>
        <p className="link hidden lg:inline-flex">Gardening</p>
        <p className="link hidden lg:inline-flex">Tiles</p>
      </div>
    </div>
  );
};

export default Header;
