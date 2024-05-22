import { useParams } from "react-router-dom";
import "./byTagProducts.scss";

export const ByTagProcuts = () => {
  const { param: tag } = useParams();
  return <div> {tag} </div>;
};
