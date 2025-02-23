"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";

interface Slide {
  imageUrl: string;
  title: string;
  description: string;
}

const ImageSlider: React.FC = () => {
  const [slides, setSlides] = useState<Slide[]>([]);
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const fetchSlides = async () => {
      try {
        const res = await fetch("/api/slides");
        const data = await res.json();
        console.log("Fetched Slides:", data); // Log the fetched data
        setSlides(data);
      } catch (error) {
        console.error("Error fetching slides:", error);
      }
    };
    fetchSlides();
  }, []);

  useEffect(() => {
    if (slides.length > 0) {
      const timer = setInterval(() => {
        setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length);
      }, 5000);
      return () => clearInterval(timer);
    }
  }, [slides.length]);

  if (slides.length === 0) {
    return <div>Loading slider...</div>; // Show loading state if slides are not yet loaded
  }

  return (
    <div className="relative w-full h-[500px] md:h-[750px] lg:h-[955px] overflow-hidden">
      {slides.map((slide, index) => (
        <div
          key={index}
          className={`absolute w-full h-full transition-opacity duration-700 ease-in-out ${
            index === currentSlide ? "opacity-100" : "opacity-0"
          }`}
        >
          <div className="absolute h-full w-full">
            <Image
              src={slide.imageUrl}
              alt={`Slide ${index + 1}`}
              layout="fill"
              objectFit="cover"
              className="object-cover"
            />
          </div>
          <div className="absolute top-1/2 left-4 md:left-12 lg:left-20 transform -translate-y-1/2 text-[#DA1725] max-w-lg z-10 text-left px-6">
            <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold mb-2">{slide.title}</h2>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ImageSlider;
