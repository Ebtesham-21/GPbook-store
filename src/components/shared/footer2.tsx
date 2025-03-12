"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { FaFacebook, FaInstagram, FaLinkedin, FaWhatsapp, FaYoutube } from "react-icons/fa";
import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.css"; // Import SweetAlert's CSS

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
    <footer className="bg-[#3A2E92] text-white pt-32 md:pt-20 pb-12">
      <div className="container mx-auto px-4 flex flex-col items-center">

        {/* Footer Content Section */}
        <div className="flex flex-col md:flex-row justify-between items-center w-full mt-20 space-y-6 md:space-y-0 md:space-x-12">
          
          {/* Column 1 - Logo & Contact Info */}
          <div className="flex flex-col items-start space-y-4">
            <Link href="/" className="flex items-center mb-6 md:mb-0">
              <Image
                src="/images/logo-2.png"
                alt="BookStore Logo"
                width={400}
                height={400}
              />
            </Link>
            <p className="text-3xl text-white">info@99explainers.com</p>
            <p className="text-3xl text-white">+88 01911-229-454</p>
            <p className="text-3xl text-white">+1 647-949-9454</p>
            <p className="text-4xl font-extrabold text-yellow-500">
              Bangladesh Studio:
            </p>
            <p className="text-3xl text-white">
              House#22, Road#04, Nikunja-2, <br />
              Khilkhet, Dhaka-1229
            </p>
            <p className="text-4xl font-extrabold text-yellow-500">
              Canada Studio:
            </p>
            <p className="text-3xl text-white">
              2972 Danforth Ave, East York, <br />
              ON, M4C 1M6
            </p>
          </div>

          {/* Column 2 - Subscribe to NewsLetter (Vertically Centered) */}
          <div className="flex flex-col items-center justify-center self-center">
            <div className="text-center w-full max-w-2xl px-4">
              <h3 className="text-2xl md:text-3xl font-semibold mb-6">
                Subscribe to our Newsletter
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

          {/* Column 3 - Social Media */}
          <div className="flex flex-col items-end space-y-4">
            <p className="text-3xl font-semibold">Follow Us</p>
            <div className="flex md:flex-col items-end space-y-4 space-x-3">
              <Link href="#" className="hover:text-white text-yellow-500">
                <FaFacebook size={52} />
              </Link>
              <Link href="#" className="hover:text-white text-yellow-500">
                <FaInstagram size={52} />
              </Link>
              <Link
                target="blank"
                href="https://www.youtube.com/@99explainersKids"
                className="hover:text-white text-yellow-500"
              >
                <FaYoutube size={52} />
              </Link>
              <Link href="#" className="hover:text-white text-yellow-500">
                <FaWhatsapp size={52} />
              </Link>
              <Link href="#" className="hover:text-white text-yellow-500">
                <FaLinkedin size={52} />
              </Link>
            </div>
          </div>

        </div>
      </div>
    </footer>
  );
};

export default Footer;
