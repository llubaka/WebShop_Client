// Directly targeting the public/products folder to remove redundant code and add alt text as the image text.
import "./productImageSection.scss";

interface IProductImage {
  src: string;
  discount: number;
}

export const ProductImage: React.FC<IProductImage> = ({ src, discount }) => {
  const source = `/products/${src}`;
  const altAtr = src.split(".")[0];
  const discountText = `-${discount}%`;

  return (
    <div className="product-image">
      <div className="product-image__actions">
        <button className="product-image__actions--add-favorite">
          <span>&#10084;</span>
        </button>
        {!!discount && <div className="product-image__actions--discount">{discountText}</div>}
      </div>
      <img className="product-image__image" src={source} alt={altAtr} />
    </div>
  );
};
