import React, { useCallback, useState } from "react";
import { Carousel as RSCarousel } from "react-responsive-carousel";
import "./carousel.scss";
import ClipLoader from "../Loader/ClipLoader";

interface CarouselProps {
  imageSources: string[];
}

export const Carousel: React.FC<CarouselProps> = ({ imageSources }) => {
  const [isMainImageLoading, setIsMainImageLoading] = useState(true);

  const handleOnLoad = () => {
    setIsMainImageLoading(() => false);
  };

  const getImages = useCallback(() => {
    return imageSources.map((src, index) => {
      if (index === 0) {
        return <img onLoad={handleOnLoad} key={src} src={src} alt={src} />;
      }
      return <img key={src} src={src} alt={src} />;
    });
  }, [imageSources]);

  const style = isMainImageLoading ? { display: "none" } : {};

  return (
    <>
      {isMainImageLoading && (
        <div className="carousel-loader-container">
          <ClipLoader />
        </div>
      )}
      <div style={{ ...style }}>
        <RSCarousel
          showArrows
          autoPlay
          infiniteLoop
          showStatus={false}
          interval={2500}
        >
          {getImages()}
        </RSCarousel>
      </div>
    </>
  );
};
