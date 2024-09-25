import { ShopDescription } from "../shopFeatures/ShopFeatures";
import "./footer.scss";
import AppSettings from "../../settings/appSettings.json";
import { getCompliancePageRouteLink } from "../../globals/Routes";
import { Link } from "react-router-dom";

export const Footer = () => {
  const currYear = new Date().getFullYear();
  const hasSocial = !!AppSettings.facebook || !!AppSettings.twitter || !!AppSettings.instagram;
  return (
    <footer className="footer">
      <ShopDescription />
      <div className="footer__info">
        <p>
          &copy; {currYear} <span className="footer__info--app-name">{AppSettings.appName}</span>.
          Всички права запазени.
        </p>
        <p>
          <Link className="footer__info--link--policy" to={getCompliancePageRouteLink()}>
            Политика за поверителност
          </Link>
          <a className="footer__info--link" href={`mailto:${AppSettings.contact.email}`}>
            {AppSettings.contact.email}
          </a>
          &nbsp;|&nbsp;
          <a className="footer__info--link" href={`tel:${AppSettings.contact.telephone}`}>
            {AppSettings.contact.telephone}
          </a>
          <div className="footer__info--link--space">&nbsp;|&nbsp;</div>
        </p>
        {hasSocial && (
          <p>
            Последвайте ни:&nbsp;
            {AppSettings.facebook && (
              <>
                <a href={`${AppSettings.facebook}`} target="_blank" rel="noreferrer">
                  Facebook
                </a>
                &nbsp;|&nbsp;
              </>
            )}
            {AppSettings.twitter && (
              <>
                <a href={`${AppSettings.twitter}`} target="_blank" rel="noreferrer">
                  Twitter
                </a>
                &nbsp;|&nbsp;
              </>
            )}
            {AppSettings.instagram && (
              <>
                <a href={`${AppSettings.instagram}`} target="_blank" rel="noreferrer">
                  Instagram
                </a>
              </>
            )}
          </p>
        )}
      </div>
    </footer>
  );
};
