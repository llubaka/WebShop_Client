import Settings from "../../settings/appSettings.json";
import { ImageWithLoader } from "../common/ImageWithLoader";
import "./promotionBanner.scss";

export const PromotionBanner: React.FC = () => {
  return (
    <div className="banner-container">
      <ImageWithLoader
        className="banner-container__image"
        src={Settings.images.promotionsBanner}
      />
    </div>
  );
};
