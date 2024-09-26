import "./fromMenu.scss";
import MenuContent from "../../settings/menuContent.json";
import AppSettings from "../../settings/appSettings.json";
import { getByTags } from "../../data/getData/getFilteredProducts";
import { ContentType, NavBanner } from "../../components/navBanner/NavBanner";
import { DisplayProducts } from "../../components/displayProducts/DisplayProducts";
import { useLocation, useParams } from "react-router-dom";
import { FromMenuQueryParam } from "../../helpers/enum";
import { PaginationNumbers } from "../../components/common/PaginationNumbers/PaginationNumbers";
import { useCallback, useMemo, useState } from "react";

export const FromMenu = () => {
  const { param: id, param2: subId, param3: page } = useParams();
  const [currPage, setCurrPage] = useState(+(page || 0));
  const location = useLocation();

  const getNewUrl = useCallback(() => {
    return (
      location.pathname.substring(0, location.pathname.lastIndexOf("/") + 1) + currPage.toString()
    );
  }, [currPage, location.pathname]);

  const handlePageChange = useCallback(
    (page: number) => {
      setCurrPage(page);
      window.history.replaceState(null, "", getNewUrl());
      window.scrollTo({ top: 0, behavior: "smooth" });
    },
    [getNewUrl]
  );

  let tags: string[];
  let hasError = false;

  try {
    tags =
      subId === FromMenuQueryParam.NOT_SUBMENU
        ? MenuContent.filter((row) => row.id === id)[0].tags
        : MenuContent.filter((row) => row.id === id)[0].subMenu.filter((row) => row.id === subId)[0]
            .tags;
  } catch (error) {
    tags = [];
    hasError = true;
  }

  const filteredProducts = useMemo(() => getByTags(tags), [tags]);

  if (hasError) {
    return <NavBanner contentType={ContentType.INFO} content="Няма намерени продукти" />;
  }

  const displayProducts = filteredProducts.slice(
    (currPage - 1) * AppSettings.pagination,
    currPage * AppSettings.pagination
  );

  const lastPage = Math.ceil(filteredProducts.length / AppSettings.pagination);

  return (
    <div>
      <NavBanner content={tags} contentType={ContentType.TAGS} />
      <DisplayProducts products={displayProducts} />
      <PaginationNumbers initPage={+(page || 1)} lastPage={lastPage} onChange={handlePageChange} />
    </div>
  );
};
