import "./navBanner.scss";
import Settings from "../../settings/appSettings.json";
import { Link } from "react-router-dom";
import { getByCategoryProductsLink, getByTagProductsLink, getHomeRouteLink } from "../../globals/Routes";

export enum ContentType {
  TAG,
  CATEGORY,
  INFO,
}

interface INavBanner {
  content: string | Array<string>;
  contentType: ContentType;
}

export const NavBanner: React.FC<INavBanner> = ({ content, contentType }) => {
  const getContent = () => {
    switch (contentType) {
      case ContentType.INFO:
        return <div className="navbar-container__info">{content}</div>;
      case ContentType.CATEGORY:
        return <Link to={getByCategoryProductsLink(content as string)}>{content}</Link>;
      case ContentType.TAG:
        return (
          <>
            {(content as Array<string>).map((tag, index) => {
              if (index === content.length - 1) return <Link to={getByTagProductsLink(tag)}>{tag}</Link>;
              return <Link to={getByTagProductsLink(tag)}>{`${tag}, `}</Link>;
            })}
          </>
        );
      default:
        return <></>;
    }
  };

  return (
    <div className="navbar-container">
      <Link to={getHomeRouteLink()} className="navbar-container__home">
        {Settings.appName}
      </Link>
      <div className="navbar-container__separator">/</div>
      {getContent()}
    </div>
  );
};
