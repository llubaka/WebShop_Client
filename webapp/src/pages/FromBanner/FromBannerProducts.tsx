import { useParams } from "react-router-dom";
import "./fromBannerProducts.scss";
import { getSections } from "../../data/getData/getSections";

export const FromBannerProducts = () => {
  const { id } = useParams();
  const x = getSections().filter((sect) => sect.id === id)[0];
  return (
    <div>
      {x.id} {x.tags}
    </div>
  );
};
