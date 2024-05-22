import { useParams } from "react-router-dom";
import "./byCategoryProducts.scss";

export const ByCategoryProducts = () => {
  const { param: category } = useParams();
  return <div> {category} </div>;
};
