import { Product } from "../../components/product/product";
import { PromotionBanner } from "../../components/promotionBanner/PromotionBanner";
import Settings from "../../settings/appSettings.json";
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
          <Product id="0" />
          <Product id="1" />
          <Product id="2" />
          <Product id="3" />
          <Product id="4" />
          <Product id="5" />
        </section>
      </div>
    </div>
  );
};
