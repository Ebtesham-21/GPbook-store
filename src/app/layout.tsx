"use client";
import { usePathname } from "next/navigation";
import Navbar from "@/components/shared/navbar";
import ImageSlider from "@/components/shared/ImageSlider";
import LatestAddition from "@/components/LatestAddition";
import './globals.css';
import Footer2 from "@/components/shared/footer2";

// export const metadata = {
//   title: "99 Book Store",
//   description: "A great place to buy books online.",
// };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  
  return (
    <html lang="en">
      <body>
        {pathname !== "/admin" && (
          <>
            <Navbar />
            <ImageSlider />
            <LatestAddition/>
            <Footer2/>
          </>
        )}

        <main className="px-4">{children}</main>
      </body>
    </html>
  );
}