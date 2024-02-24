import { useParams } from "react-router-dom";
import "./byCategoryProducts.scss";

export const ByCategoryProducts = () => {
  const { category } = useParams();
  return <div> {category} </div>;
};
