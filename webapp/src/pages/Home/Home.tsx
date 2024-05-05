import { Product } from "../../components/product/product";
import { PromotionBanner } from "../../components/promotionBanner/PromotionBanner";
import Settings from "../../settings/appSettings.json";
import "./home.scss";
import { Link } from "react-router-dom";
import { Routes } from "../../globals/Routes";
import { getNewProductsIds } from "../../data/getData/getNewProductsIds";
import { ShopInfo } from "../../components/shopInfo/ShopInfo";
import { HomeSections } from "../../components/homeSections/HomeSections";

export const Home = () => {
  const newProductsIds = getNewProductsIds();
  return (
    <div className="home-container">
      {Settings.options.showPromotionsBanner && <PromotionBanner />}
      <div className="home-container__main">
        <section>
          <h1 className="home-container__main--heading"> Нови Продукти </h1>
          <p className="home-container__main--paragraph"> Разгледайте нашите най-нови предложения </p>
        </section>
        <section className="home-container__main--products">
          {newProductsIds.map((id) => {
            return <Product key={id} id={id} />;
          })}
        </section>
        <div className="home-container__main--view-all-button-container">
          <Link to={Routes.NEW_PRODUCTS}>Виж всички</Link>
        </div>
        <HomeSections />
        <ShopInfo />
      </div>
    </div>
  );
};
