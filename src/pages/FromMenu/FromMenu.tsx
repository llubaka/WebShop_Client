import "./fromMenu.scss";
import MenuContent from "../../settings/menuContent.json";
import { getByTags } from "../../data/getData/getFilteredProducts";
import { ContentType, NavBanner } from "../../components/navBanner/NavBanner";
import { DisplayProducts } from "../../components/displayProducts/DisplayProducts";
import { useParams } from "react-router-dom";
import { QueryParam } from "../../helpers/enum";

export const FromMenu = () => {
  const { param: id, param2: subId } = useParams();
  console.log(id);
  console.log(MenuContent.filter((row) => row.id === id)[0].tags);

  const tags =
    subId === QueryParam.NOT_SUBMENU
      ? MenuContent.filter((row) => row.id === id)[0].tags
      : MenuContent.filter((row) => row.id === id)[0].subMenu.filter(
          (row) => row.id === subId
        )[0].tags;

  const filteredProducts = getByTags(tags);

  return (
    <div>
      <NavBanner content={tags} contentType={ContentType.TAGS} />
      <DisplayProducts products={filteredProducts} />
    </div>
  );
};
