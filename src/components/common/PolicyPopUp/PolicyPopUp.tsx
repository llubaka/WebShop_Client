import { useState } from "react";
import "./policyPopUp.scss";
import { Link } from "react-router-dom";
import { getCompliancePageRouteLink } from "../../../globals/Routes";

enum Language {
  BULGARIAN,
  ENGLISH,
}

type PolicyPopUpProps = {
  onAgree: () => void;
};

export const PolicyPopUp: React.FC<PolicyPopUpProps> = ({ onAgree }) => {
  const [language, setLanguage] = useState<Language>(Language.BULGARIAN);

  return (
    <div className="policy">
      <div className="policy__lng">
        <div onClick={() => setLanguage(Language.BULGARIAN)}>БГ</div>
        <div onClick={() => setLanguage(Language.ENGLISH)}>ENG</div>
      </div>

      <div className="policy__content">
        <div className="policy__content__text">
          {language === Language.ENGLISH && (
            <>
              By using this site, you agree to our
              <Link to={getCompliancePageRouteLink()}>Privacy Policy</Link>.
            </>
          )}
          {language === Language.BULGARIAN && (
            <>
              Използвайки този сайт, вие се съгласявате с нашата
              <Link to={getCompliancePageRouteLink()}>Политика за поверителност</Link>.
            </>
          )}
        </div>
        <button className="policy__content__agree-button" onClick={onAgree}>
          Съгласен/а съм
        </button>
      </div>
    </div>
  );
};
