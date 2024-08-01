import { ProductType } from "../../globals/ProductType";
import { Product } from "../product/product";
import "./displayProducts.scss";

interface DisplayProductsInterface {
  products: ProductType[];
}

export const DisplayProducts: React.FC<DisplayProductsInterface> = ({ products }) => {
  return (
    <section className="display-products-container">
      {products.map(({ id }) => {
        return <Product key={id} id={id} />;
      })}
    </section>
  );
};
