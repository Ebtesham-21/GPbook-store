import Image from "next/image";
import Link from "next/link";
import {
  FaFacebookF,
  FaArtstation ,
  FaLinkedin,
  FaBehance,
  FaYoutube 
} from "react-icons/fa";
import React, { useState } from "react";
import Swal from "sweetalert2";

interface ApiResponse {
  message?: string;
  error?: string;
}

const Footer: React.FC = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubscribe = async (event: React.FormEvent) => {
    event.preventDefault(); // Prevents page reload on form submit

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/mailchimp/api/subscribe`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email }),
        }
      );

      const data: ApiResponse = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Subscription failed");
      }

      // Show success alert
      Swal.fire({
        icon: "success",
        title: "Thank You!",
        text: "Subscribed successfully",
        confirmButtonColor: "#3085d6",
      });

      setMessage("Subscription successful!");
      setEmail(""); // Reset the email input field after successful subscription
    } catch (error: unknown) {
      let errorMessage = "An unexpected error occurred.";
      if (error instanceof Error) {
        errorMessage = error.message;
      }
      console.error("Subscription Error:", error);
      setMessage(errorMessage);

      // Show error alert
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: errorMessage,
        confirmButtonColor: "#d33",
      });
    }
  };


  return (
    <div className="relative bg-cover   bg-center  w-full overflow-hidden font-poppins md:p-4">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          // backgroundImage: "url(/FooterRed.png)",
           backgroundImage: "url('/images/Asset 2.png')",

          backgroundPosition: "center top",
        }}
      />

      {/* Content */}
      <div className="relative z-10 text-white max-w-[1480px] mx-auto px-4 sm:px-6 lg:px-1 overflow-y-auto h-full ">
        <div className="md:flex justify-between flex-wrap space-y-8 md:space-y-12">
          {/* Left Section */}
          <div className="flex flex-col items-center md:items-start space-y-6  md:pl-[25px]">
            {/* Logo */}
            <Link href="/">
              <div className="text-center md:text-left max-w-[1200px] pt-6">
                <Image
                  src="/images/logo-2.png"
                  alt="99explainers"
                  width={350}
                  height={175}
                  className="mb-6 transform  transition-transform duration-300"
                />
              </div>
            </Link>

            {/* Social Icons */}
            <div className="flex space-x-4">
              <Link
                href="https://www.facebook.com/99explainers/"
                 target="_blank"
                className="w-12 h-12 flex justify-center items-center rounded-full border border-white hover:bg-white hover:text-black transition duration-300"
              >
                <FaFacebookF size={20} />
              </Link>
              <Link
                href="https://www.behance.net/99explainer"
                target="_blank"
                className="w-12 h-12 flex justify-center items-center rounded-full border border-white hover:bg-white hover:text-black transition duration-300"
              >
                <FaBehance size={20} />
              </Link>
              <Link
                href="https://www.artstation.com/explainers_99"
                target="_blank"
                className="w-12 h-12 flex justify-center items-center rounded-full border border-white hover:bg-white hover:text-black transition duration-300"
              >
                <FaArtstation size={20} />
              </Link>
              <Link
                href="https://www.linkedin.com/company/99explainers"
                target="_blank"
                className="w-12 h-12 flex justify-center items-center rounded-full border border-white hover:bg-white hover:text-black transition duration-300"
              >
                <FaLinkedin size={20} />
              </Link>
              <Link
                href="https://www.youtube.com/@99Explainers"
                target="_blank"
                className="w-12 h-12 flex justify-center items-center rounded-full border border-white hover:bg-white hover:text-black transition duration-300"
              >
                <FaYoutube size={20} />
              </Link>
            </div>

            {/* Contact Info */}
            <div className="text-center md:text-left space-y-2">
              <p className="text-base sm:text-lg lg:text-xl xl:text-2xl">
                info@99explainers.com
              </p>
              <p className="text-base sm:text-lg lg:text-xl xl:text-2xl">
                +88 01911-229-454 
              </p>
            </div>

            {/* Address */}
            <div className="text-center md:text-left space-y-4">
              <h3 className="text-lg sm:text-xl lg:text-2xl xl:text-3xl font-bold text-yellow-300">
                Bangladesh Studio:
              </h3>
              <p className="text-base sm:text-lg lg:text-xl xl:text-2xl">
                House#22, Road#04, Nikunja-2, <br /> Khilkhet, Dhaka-1229
              </p>
             
            </div>
             {/* Footer Bottom */}
        <div className="mt-14 lg:mt-24 border-t border-white/10  pt-8 flex flex-col space-y-4">
          {/* Links */}
          <div className="flex space-x-6">
            <Link href="/privacy-policy" className="hover:underline text-sm lg:text-base">
              Privacy Policy
            </Link>
            <Link href="/terms-of-use" className="hover:underline text-sm lg:text-base">
              Terms of Use
            </Link>
          </div>
        </div>
          </div>

          {/* NewsLetter Section */}
          <div className="flex border-white flex-col md:flex-col md:gap-29 text-center md:text-left  md:pr-[25px]">
          <div className="flex flex-col md:mb-16 items-center justify-center self-center">
            <div className="text-center w-full max-w-2xl px-4">
              <h3 className="text-2xl md:text-3xl font-semibold mb-6">
                Subscribe To Get The Latest Updates!
              </h3>

              <form
                onSubmit={handleSubscribe}
                className="flex flex-col md:flex-row justify-center items-center w-full"
              >
                <input
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="text-black px-6 py-3 rounded-full focus:outline-none w-full md:w-46 text-lg md:text-2xl"
                  required
                />
                <button
                  type="submit"
                  className="mt-4 md:mt-0 bg-yellow-500 hover:bg-yellow-600 text-black px-6 py-3 rounded-full font-semibold ml-0 md:ml-4"
                >
                  Subscribe
                </button>
              </form>
              {message && <p className="mt-4">{message}</p>}
            </div>
          </div>
          <div className="md:mt-30">
          <Image
                  src="/images/kid.png"
                  alt="99explainers"
                  width={550}
                  height={375}
                  className="mb-6 transform  transition-transform duration-300"
                />
          </div>
          </div>
        </div>

       
      </div>
    </div>
  );
}

export default Footer;
