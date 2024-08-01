import "./fromMenu.scss";
import MenuSettings from "../../settings/menuSettings.json";
import { getByTags } from "../../data/getData/getFilteredProducts";
import { ContentType, NavBanner } from "../../components/navBanner/NavBanner";
import { DisplayProducts } from "../../components/displayProducts/DisplayProducts";
import { useParams } from "react-router-dom";

export const FromMenu = () => {
  const { param: menuSettingsId } = useParams();
  const { param: isFromSubMenu } = useParams();

  const tags =
    isFromSubMenu === "true"
      ? MenuSettings.filter((el) => el.subMenu.some((el) => el.id.toString() === menuSettingsId))[0].tags
      : MenuSettings.filter((el) => el.id.toString() === menuSettingsId)[0].tags;

  const filteredProducts = getByTags(tags);

  return (
    <div>
      <NavBanner content={tags} contentType={ContentType.TAGS} />
      <DisplayProducts products={filteredProducts} />
    </div>
  );
};
