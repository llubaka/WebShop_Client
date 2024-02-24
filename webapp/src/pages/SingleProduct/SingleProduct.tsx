import "./singleProduct.scss";
import { useParams } from "react-router";

export const SingleProduct = () => {
  const { id } = useParams();
  return <div> {id} </div>;
};
