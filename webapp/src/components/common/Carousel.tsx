import React, { Component } from "react";
import ReactDOM from "react-dom";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel as RSCarousel } from "react-responsive-carousel";

interface CarouselProps {
  imageSources: string[];
}

export const Carousel: React.FC<CarouselProps> = ({ imageSources }) => {
  const getImages = () => {
    return imageSources.map((src) => {
      return <img src={src} />;
    });
  };
  return <RSCarousel showArrows>{getImages()}</RSCarousel>;
};
