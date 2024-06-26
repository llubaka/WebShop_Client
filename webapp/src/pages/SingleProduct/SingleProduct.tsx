import { ContentType, NavBanner } from "../../components/navBanner/NavBanner";
import { useCartContext } from "../../context/cartContext";
import { getById } from "../../data/getData/getFilteredProducts";
import { getImageUrl } from "../../data/getData/getImageUrl";
import "./singleProduct.scss";
import { useParams } from "react-router";
import AppSettings from "../../settings/appSettings.json";

export const SingleProduct = () => {
  const { param: id } = useParams();
  const { contact } = AppSettings;

  const { addProductInCart } = useCartContext();

  const product = getById(id as string);
  const hasAdditionalImages = product.additionalImagesUrls.length > 0;

  const hasDiscount = !!product.discount;
  const mainPrice = hasDiscount
    ? ((+product.price * (100 - product.discount)) / 100).toFixed(2)
    : product.price;

  const source = getImageUrl(product.imageUrl);
  const altAtr = product.imageUrl.split(".")[0];
  const discountText = `-${product.discount}%`;

  const handleAddInCartClick = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.stopPropagation();
    addProductInCart(id as string);
  };

  return (
    <>
      <NavBanner contentType={ContentType.INFO} content={product.info} />
      {hasAdditionalImages ? (
        <> </>
      ) : (
        <div className="sp-container">
          <img src={source} alt={altAtr} />
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
            >
              Добави в количката
            </button>
            <button
              onClick={handleAddInCartClick}
              className="sp-container__content--button sp-container__content--button--last"
            >
              Направи поръчка
            </button>
          </div>
        </div>
      )}
      <div className="sp-additional-info">
        {contact.telephone && (
          <div>
            <a
              className="sp-additional-info--href"
              href={`tel:${contact.telephone}`}
            >
              <img
                className="sp-additional-info--icon"
                src="/icons/phoneIcon.png"
                alt="Telephone icon."
              />
              Имате въпроси или желаете да поръчате? {contact.telephone}
            </a>
          </div>
        )}
        {contact.email && (
          <div>
            <a
              className="sp-additional-info--href"
              href={`mailto:${contact.email}`}
            >
              <img
                className="sp-additional-info--icon"
                src="/icons/emailIcon.png"
                alt="Email icon."
              />
              Може да се свържите с нас и по имейл: {contact.email}
            </a>
          </div>
        )}
      </div>
    </>
  );
};
