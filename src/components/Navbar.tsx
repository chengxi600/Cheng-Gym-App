"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import cn from "clsx";

interface Page {
  href: string;
  title: string;
}

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const pages: Page[] = [
    {
      href: "/",
      title: "Home",
    },
    {
      href: "/true-fitness",
      title: "True Fitness Calc",
    },
    {
      href: "/pr-tracker",
      title: "PR Tracker",
    },
    {
      href: "/1rm-warmup",
      title: "1RM Warmup Sets",
    },
  ];

  const MobileButton = () => (
    <div className="md:hidden">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="text-gray-700 focus:outline-none"
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>
    </div>
  );

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link href="/" className="text-xl font-bold text-gray-800">
              Cheng Gym App
            </Link>
          </div>
          <PageLinks pages={pages} />
          <MobileButton />
        </div>
        {isOpen && <PageLinks pages={pages} isMobile />}
      </div>
    </nav>
  );
};

const PageLinks = ({
  pages,
  isMobile = false,
}: {
  pages: Page[];
  isMobile?: boolean;
}) => {
  const mobileStyle = "md:hidden mt-2 space-y-2 pb-4";
  const desktopStyle = "hidden md:flex space-x-6";

  return (
    <div className={isMobile ? mobileStyle : desktopStyle}>
      {pages.map((page) => (
        <Link
          key={page.title}
          href={page.href}
          className={cn(
            "text-gray-700 hover:text-blue-600",
            isMobile && "block",
          )}
        >
          {page.title}
        </Link>
      ))}
    </div>
  );
};

export default Navbar;
