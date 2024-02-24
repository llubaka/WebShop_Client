import { Product } from "../../components/product/product";
import { PromotionBanner } from "../../components/promotionBanner/PromotionBanner";
import Settings from "../../settings/appSettings.json";
import NewProducts from "../../products/newProducts.json";

import "./home.scss";

export const Home = () => {
  return (
    <div className="home-container">
      {Settings.options.showPromotionsBanner && <PromotionBanner />}
      <div className="home-container__main">
        <section>
          <h1 className="home-container__main--heading"> Нови Продукти </h1>
          <p className="home-container__main--paragraph"> Разгледайте нашите най-нови предложения </p>
        </section>
        <section className="home-container__main--products">
          {NewProducts.slice(0, 6).map((id) => {
            return <Product key={id} id={id} />;
          })}
        </section>
        <div className="home-container__main--view-all-button-container">
          <button>Виж всички</button>
        </div>
      </div>
    </div>
  );
};
