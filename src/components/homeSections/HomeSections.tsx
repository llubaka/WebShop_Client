import { Link } from "react-router-dom";
import { getSections } from "../../data/getData/getSections";
import "./homeSections.scss";
import { getFromBannerProductsLink } from "../../globals/Routes";
import { ImageWithLoader } from "../common/ImageWithLoader";

export const HomeSections = () => {
  const sections = getSections();

  if (sections.length === 0) return <> </>;

  return (
    <div className="home-sections">
      {sections.map((sect) => {
        return (
          <div className="home-sections__banner">
            <Link key={sect.id} to={getFromBannerProductsLink(sect.id)}>
              <ImageWithLoader
                className="home-sections__banner--image"
                src={sect.imageUrl}
              />
            </Link>
          </div>
        );
      })}
    </div>
  );
};
