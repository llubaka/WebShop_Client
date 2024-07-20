import React, { useCallback } from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel as RSCarousel } from "react-responsive-carousel";

interface CarouselProps {
  imageSources: string[];
}

export const Carousel: React.FC<CarouselProps> = ({ imageSources }) => {
  const getImages = useCallback(() => {
    return imageSources.map((src) => {
      return <img key={src} src={src} alt={src} />;
    });
  }, [imageSources]);

  return (
    <RSCarousel
      showArrows
      autoPlay
      infiniteLoop
      showStatus={false}
      interval={2500}
    >
      {getImages()}
    </RSCarousel>
  );
};
