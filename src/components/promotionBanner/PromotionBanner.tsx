import Settings from "../../settings/appSettings.json";
import "./promotionBanner.scss";

export const PromotionBanner: React.FC = () => {
  return (
    <div className="banner-container">
      <img
        className="banner-container__image"
        src={Settings.images.promotionsBanner}
        alt={Settings.images.promotionsBanner}
      />
    </div>
  );
};
