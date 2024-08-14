import { ContentType, NavBanner } from "../../components/navBanner/NavBanner";
import { useCartContext } from "../../context/cartContext";
import { getById } from "../../data/getData/getFilteredProducts";
import "./singleProduct.scss";
import { useParams } from "react-router";
import AppSettings from "../../settings/appSettings.json";
import { Envelope } from "../../svg/Envleope";
import { Telephone } from "../../svg/Telephone";
import { Carousel } from "../../components/common/Carousel/Carousel";
import { Accordion } from "../../components/common/Accordion/Accordion";
import { useNavigate } from "react-router-dom";
import { getCartRouteLink } from "../../globals/Routes";
import { ImageWrapperNoLazy } from "../../components/common/ImageWrapper/ImageWrapperNoLazy";
import { DeepSeparator } from "../../components/common/DeepSeparator/DeepSeparator";

export const SingleProduct = () => {
  const { param: id } = useParams();
  const { contact } = AppSettings;
  const navigate = useNavigate();

  const { addProductInCart, isProductInCart } = useCartContext();

  const product = getById(id as string);
  const hasAdditionalImages = product.additionalImagesUrls.length > 0;

  const hasDiscount = !!product.discount;
  const mainPrice = hasDiscount
    ? ((+product.price * (100 - product.discount)) / 100).toFixed(2)
    : product.price;

  const handleAddInCartClick = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.stopPropagation();
    addProductInCart(id as string, true);
  };

  const handleMakeOrder = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.stopPropagation();

    if (isProductInCart(id as string)) {
      navigate(getCartRouteLink());
    } else {
      addProductInCart(id as string, false);
      navigate(getCartRouteLink());
    }
  };

  const getProductImages = () => {
    return [product.imageUrl, ...product.additionalImagesUrls];
  };

  return (
    <>
      <NavBanner contentType={ContentType.INFO} content={product.info} />
      {hasAdditionalImages ? (
        <div className="carousel-container">
          <Carousel imageSources={getProductImages()} />
        </div>
      ) : (
        <div className="sp-container">
          <ImageWrapperNoLazy
            src={product.imageUrl}
            width="100%"
            height="45vh"
          />
        </div>
      )}
      <div className="sp-container__content">
        <div className="sp-container__content__info">{product.info}</div>
        <div className="sp-container__content__product-price">
          {mainPrice}лв.
          {hasDiscount && (
            <span className="sp-container__content__product-price--discount">
              {product.price}лв.
            </span>
          )}
        </div>
        <button
          onClick={handleAddInCartClick}
          className="sp-container__content--button"
          aria-label="Add product in cart"
        >
          Добави в количката
        </button>
        <button
          onClick={handleMakeOrder}
          className="sp-container__content--button sp-container__content--button--last"
          aria-label="Make order"
        >
          Направи поръчка
        </button>
      </div>

      <div className="sp-additional-info">
        <div className="sp-contact-container">
          <DeepSeparator />
          {(contact.telephone || contact.email) && (
            <div className="sp-additional-info__container">
              {contact.telephone && (
                <div className="sp-additional-info--first">
                  <a
                    className="sp-additional-info--href"
                    href={`tel:${contact.telephone}`}
                  >
                    <div className="sp-additional-info--href__container">
                      Имате въпроси или желаете да поръчате?
                    </div>
                    <div className="sp-additional-info--href--contact">
                      <span className="sp-additional-info--icon">
                        <Telephone color="#e39606" />
                      </span>
                      {contact.telephone}
                    </div>
                  </a>
                </div>
              )}
              {contact.email && (
                <div>
                  <a
                    className="sp-additional-info--href"
                    href={`mailto:${contact.email}`}
                  >
                    <div className="sp-additional-info--href__container">
                      Може да се свържете с нас и по имейл:
                    </div>
                    <div className="sp-additional-info--href--contact">
                      <span className="sp-additional-info--icon">
                        <Envelope color="#e39606" />
                      </span>
                      {contact.email}
                    </div>
                  </a>
                </div>
              )}
            </div>
          )}
          <DeepSeparator />
        </div>
        <div className="sp-accordion-container">
          <Accordion items={product.description} />
        </div>
        <DeepSeparator />
      </div>
    </>
  );
};
