"use client";

import { useEffect, useState } from "react";

interface Slider {
  _id: string;
  title: string;
  description: string;
  imageUrl: string;
}


interface Product {
  _id: string;
  title: string;
  price: number;
  imageUrl: string;
}

export default function AdminPage() {

  // slider state
  const [sliders, setSliders] = useState<Slider[]>([]);
  const [sliderTitle, setSliderTitle] = 


  
  