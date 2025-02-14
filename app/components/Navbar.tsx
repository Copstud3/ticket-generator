import React from "react";
import Image from "next/image";
import Link from "next/link";

//images
import logo from "@/public/images/logo.png";
import arrow from "@/public/images/arrow-right.svg";

// Define navigation links with actual paths
const navlinks = [
  { name: "Events", href: "/events" },
  { name: "My Tickets", href: "/my-tickets" },
  { name: "About Project", href: "/about-project" },
];

const Navbar = () => {
  return (
    <section className="flex bg-background/70 justify-between items-center mt-6 px-4 py-3 border-2 rounded-[24px] border-mint-green mx-32 sticky top-6 z-10 backdrop-blur max-sm:w-[350px] max-sm:mx-auto md:w-[700px] xl:w-[1000px] md:mx-auto">
      <Link href="/">
        <Image src={logo} alt="logo" />
      </Link>

      {/* Navigation Links */}
      <nav className="flex justify-center items-center gap-[26px] font-jeju max-sm:hidden">
        <ul className="flex gap-[26px]">
          {navlinks.map((link, index) => (
            <li key={index}>
              <Link href={link.href} className="text-white/70 hover:text-white">
                {link.name}
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      {/* Button */}
      <Link href="/">
      <button className="bg-white rounded-[12px] py-3 px-6 font-jeju text-black flex justify-center items-center gap-2 hover:bg-[#24A0B5] hover:text-white">
        MY TICKETS
        <Image src={arrow} alt="arrow" />
      </button>
      </Link>
    </section>
  );
};

export default Navbar;
