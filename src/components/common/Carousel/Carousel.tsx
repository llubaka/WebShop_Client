import React, { useCallback } from "react";
import { Carousel as RSCarousel } from "react-responsive-carousel";
import "./carousel.scss";

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
      //  autoPlay
      // infiniteLoop
      showStatus={false}
      //interval={2500}
    >
      {getImages()}
    </RSCarousel>
  );
};
