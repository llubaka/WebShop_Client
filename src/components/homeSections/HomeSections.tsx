import { Link } from "react-router-dom";
import { getSections } from "../../data/getData/getSections";
import { Image } from "../common/Image";
import "./homeSections.scss";
import { getFromBannerProductsLink } from "../../globals/Routes";

export const HomeSections = () => {
  const sections = getSections();

  if (sections.length === 0) return <> </>;

  return (
    <div className="home-sections">
      {sections.map((sect) => {
        return (
          <Link key={sect.id} to={getFromBannerProductsLink(sect.id)}>
            <Image className="home-sections__image" src={sect.imageUrl} />
          </Link>
        );
      })}
    </div>
  );
};
