import { ContentType, NavBanner } from "../../components/navBanner/NavBanner";
import "./pageNotFound.scss";

export const PageNotFound = () => {
  return (
    <div>
      <NavBanner content="" contentType={ContentType.INFO} />
      <div className="pnf-container">
        <div className="pnf-container__fof">404</div>
        <div className="pnf-container__pnf">Страницата не е намерена!</div>
      </div>
    </div>
  );
};
