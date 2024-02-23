import { Image } from "../common/Image";
import "./promotionBanner.scss";
import Settings from "../../settings/appSettings.json";

export const PromotionBanner: React.FC = () => {
  if (!Settings.options.showPromotionsBanner) return <></>;

  return (
    <div className="banner-container">
      <Image src={Settings.images.promotionsBanner} />
    </div>
  );
};
