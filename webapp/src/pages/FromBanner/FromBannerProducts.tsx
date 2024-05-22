import { useParams } from "react-router-dom";
import "./fromBannerProducts.scss";
import { getSections } from "../../data/getData/getSections";
import { getByCategory, getByIds, getByTags } from "../../data/getData/getFilteredProducts";
import { DisplayProducts } from "../../components/displayProducts/DisplayProducts";
import { useMemo, useRef } from "react";
import { ContentType, NavBanner } from "../../components/navBanner/NavBanner";

export const FromBannerProducts = () => {
  const { param: id } = useParams();
  const section = getSections().filter((sect) => sect.id === id)[0];

  const bannerContentType = useRef<{ type: ContentType; content: string | Array<string> }>({
    type: ContentType.INFO,
    content: "продукти",
  });

  const filteredProducts = useMemo(() => {
    if (section.category) {
      bannerContentType.current = { type: ContentType.INFO, content: section.category };
      return getByCategory(section.category);
    }
    if (section.tags && section.tags.length > 0) {
      bannerContentType.current = { type: ContentType.TAGS, content: section.tags };
      return getByTags(section.tags);
    }
    if (section.productsIds && section.productsIds.length > 0) return getByIds(section.productsIds);

    return [];
  }, [section.category, section.productsIds, section.tags]);

  return (
    <>
      <NavBanner content={bannerContentType.current.content} contentType={bannerContentType.current.type} />
      <DisplayProducts products={filteredProducts} />
    </>
  );
};
