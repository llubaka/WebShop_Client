import { useLocation, useParams } from "react-router-dom";
import "./byTagProducts.scss";
import { ContentType, NavBanner } from "../../components/navBanner/NavBanner";
import { getByTags } from "../../data/getData/getFilteredProducts";
import { DisplayProducts } from "../../components/displayProducts/DisplayProducts";
import { useCallback, useMemo, useState } from "react";
import AppSettings from "../../settings/appSettings.json";
import { PaginationNumbers } from "../../components/common/PaginationNumbers/PaginationNumbers";

export const ByTagProcuts = () => {
  const { param: tag, param2: page } = useParams();
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

  const products = useMemo(() => getByTags([tag || ""]), [tag]);

  if (products.length === 0) {
    return <NavBanner contentType={ContentType.INFO} content="Няма намерени продукти" />;
  }

  const displayProducts = products.slice(
    (currPage - 1) * AppSettings.pagination,
    currPage * AppSettings.pagination
  );

  const lastPage = Math.ceil(products.length / AppSettings.pagination);

  return (
    <div>
      <NavBanner contentType={ContentType.INFO} content={tag || ""} />
      <DisplayProducts products={displayProducts} />
      <PaginationNumbers initPage={+(page || 1)} lastPage={lastPage} onChange={handlePageChange} />
    </div>
  );
};
