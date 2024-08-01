import { Image } from "../common/Image";
import Settings from "../../settings/appSettings.json";
import "./promotionBanner.scss";

export const PromotionBanner: React.FC = () => {
  return (
    <div className="banner-container">
      <Image src={Settings.images.promotionsBanner} />
    </div>
  );
};
