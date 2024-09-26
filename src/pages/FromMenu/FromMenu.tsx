import "./fromMenu.scss";
import MenuContent from "../../settings/menuContent.json";
import AppSettings from "../../settings/appSettings.json";
import { getByTags } from "../../data/getData/getFilteredProducts";
import { ContentType, NavBanner } from "../../components/navBanner/NavBanner";
import { DisplayProducts } from "../../components/displayProducts/DisplayProducts";
import { useParams } from "react-router-dom";
import { QueryParam } from "../../helpers/enum";
import { PaginationNumbers } from "../../components/common/PaginationNumbers/PaginationNumbers";

export const FromMenu = () => {
  const { param: id, param2: subId } = useParams();

  const tags =
    subId === QueryParam.NOT_SUBMENU
      ? MenuContent.filter((row) => row.id === id)[0].tags
      : MenuContent.filter((row) => row.id === id)[0].subMenu.filter((row) => row.id === subId)[0]
          .tags;

  const filteredProducts = getByTags(tags);
  const lastPage = Math.ceil(filteredProducts.length / AppSettings.pagination);

  return (
    <div>
      <NavBanner content={tags} contentType={ContentType.TAGS} />
      <DisplayProducts products={filteredProducts} />
      <PaginationNumbers initPage={1} lastPage={lastPage} />
    </div>
  );
};
