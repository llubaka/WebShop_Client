import Settings from "../../settings/appSettings.json";
import { ImageWithLoaderNoLazy } from "../common/ImageWithLoaderNoLazy";
import "./promotionBanner.scss";

export const PromotionBanner: React.FC = () => {
  return (
    <div className="banner-container">
      <ImageWithLoaderNoLazy
        className="banner-container__image"
        src={Settings.images.promotionsBanner}
      />
    </div>
  );
};
