import { Product } from "../../components/product/product";
import { PromotionBanner } from "../../components/promotionBanner/PromotionBanner";
import Settings from "../../settings/appSettings.json";
import "./home.scss";
import { Link } from "react-router-dom";
import { getHomePageProductsRouteLink } from "../../globals/Routes";
import { getHomePageProductsIds } from "../../data/getData/getHomePageProducts";
import { ShopInfo } from "../../components/shopInfo/ShopInfo";
import { HomeSections } from "../../components/homeSections/HomeSections";
import HomePageProductsSettings from "../../settings/homePageProducts.json";

export const Home = () => {
  const homePageProductsIds = getHomePageProductsIds();
  return (
    <div className="home-container">
      {Settings.images.promotionsBanner && <PromotionBanner />}
      <div className="home-container__main">
        <section>
          <h1 className="home-container__main--heading">
            {HomePageProductsSettings.title}
          </h1>
          <p className="home-container__main--paragraph">
            {HomePageProductsSettings.subTitle}
          </p>
        </section>
        <section className="home-container__main--products">
          {homePageProductsIds.map((id, index) => {
            if (index < 2) {
              return <Product key={id} id={id} lazyImageLoading={false} />;
            }

            return <Product key={id} id={id} />;
          })}
        </section>
        <div className="home-container__main--view-all-button-container">
          <Link
            to={getHomePageProductsRouteLink()}
            aria-label="See all suggested products"
          >
            {HomePageProductsSettings.buttonText}
          </Link>
        </div>
        <HomeSections />
        <ShopInfo />
      </div>
    </div>
  );
};
