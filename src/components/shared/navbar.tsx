"use client";
import Link from "next/link";
import { useState } from "react";
import { AiOutlineSearch, AiOutlineShoppingCart, AiOutlineMenu, AiOutlineClose } from "react-icons/ai";
import { usePathname } from "next/navigation";
import classNames from "classnames";
import Image from "next/image";

const Navbar = () => {
  const pathName = usePathname();
  const [searchQuery, setSearchQuery] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Searching For:", searchQuery);
  };

  return (
    <nav className="mt-6 flex items-center justify-between px-4 relative">
      {/* Logo */}
      <div className="flex items-center">
        <Link href="/" className="flex items-center">
          <Image src="/Logo-01.png" alt="BookStore Logo" width={150} height={50} className="w-28 md:w-40" />
        </Link>
      </div>

      {/* Search Bar */}
      <div className="hidden md:flex flex-grow max-w-sm mx-4">
        <form onSubmit={handleSearchSubmit} className="relative w-full">
          <input
            type="text"
            placeholder="Search Books..."
            value={searchQuery}
            onChange={handleSearchChange}
            className="p-2 w-full rounded-full border border-gray-300 focus:ring-2 focus:ring-red-500 focus:outline-none text-black px-4"
          />
          <button type="submit" className="absolute right-3 top-1/2 transform -translate-y-1/2 text-red-500">
            <AiOutlineSearch size={20} />
          </button>
        </form>
      </div>

      {/* Desktop Navigation */}
      <div className="hidden md:flex items-center space-x-6">
        <Link href="/" className={classNames("hover:text-red-600", { "text-black font-semibold": pathName === "/" })}>
          Home
        </Link>
        <Link href="/signup" className={classNames("hover:text-red-600", { "text-black font-semibold": pathName === "/signup" })}>
          Signup/Login
        </Link>
        <Link href="/cart" className="relative hover:text-red-600">
          <AiOutlineShoppingCart size={24} />
          <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full px-2 text-xs">0</span>
        </Link>
      </div>

      {/* Mobile Menu Toggle */}
      <button className="md:hidden text-black" onClick={() => setMenuOpen(!menuOpen)}>
        {menuOpen ? <AiOutlineClose size={30} /> : <AiOutlineMenu size={30} />}
      </button>

      {/* Mobile Navigation Menu */}
      <div
        className={`absolute top-16 left-0 w-full bg-white shadow-md flex flex-col items-center space-y-4 py-6 md:hidden transition-all duration-300 ${
          menuOpen ? "translate-y-0 opacity-100" : "-translate-y-10 opacity-0 pointer-events-none"
        }`}
      >
        <Link href="/" className="hover:text-red-600 text-lg" onClick={() => setMenuOpen(false)}>
          Home
        </Link>
        <Link href="/signup" className="hover:text-red-600 text-lg" onClick={() => setMenuOpen(false)}>
          Signup/Login
        </Link>
        <Link href="/cart" className="hover:text-red-600 text-lg relative" onClick={() => setMenuOpen(false)}>
          <AiOutlineShoppingCart size={24} />
          <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full px-2 text-xs">0</span>
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
