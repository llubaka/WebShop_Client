import "./shopDescription.scss";
import { Item } from "./Item";
import features from "../../settings/shopFeatures.json";
import { useMemo } from "react";

export const ShopDescription = () => {
  const shopFeatures = useMemo(() => {
    return features;
  }, []);
  return (
    <section className="shop-description">
      <div className="shop-description__title">{shopFeatures.title}</div>
      <div className="shop-description__items">
        {shopFeatures.features.map(({ title, info, imageUrl }) => {
          return <Item key={title} title={title} info={info} imageUrl={imageUrl} />;
        })}
      </div>
    </section>
  );
};
