import type { Metadata } from "next";
import Navbar from "@/components/shared/navbar";
import ImageSlider from "@/components/shared/ImageSlider";
import './globals.css';


export const metadata : Metadata = {
  title: "99 Book Store",
  description: "A great place to buy books online.",
}

export default function RootLayout ({ children} : { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Navbar/>
        <ImageSlider/>
        <main className="px-4">{children}</main>
      </body>

    </html>
  )
}