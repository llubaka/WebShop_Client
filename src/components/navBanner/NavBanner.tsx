import "./navBanner.scss";
import Settings from "../../settings/appSettings.json";
import { Link } from "react-router-dom";
import { getByTagProductsLink, getHomeRouteLink } from "../../globals/Routes";

export enum ContentType {
  TAGS,
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
      case ContentType.TAGS:
        return (
          <>
            {(content as Array<string>).map((tag, index) => {
              const linkContent =
                index === content.length - 1 ? (
                  tag
                ) : (
                  <>
                    <span>{tag}</span>
                    <span className="navbar-container__link-slash">/</span>
                  </>
                );

              return (
                <Link className="navbar-container__link" key={tag} to={getByTagProductsLink(tag)}>
                  {linkContent}
                </Link>
              );
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
