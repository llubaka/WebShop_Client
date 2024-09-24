import { useState } from "react";
import AppSettings from "../../settings/appSettings.json";
import "./compliance.scss";

enum Language {
  BULGARIAN,
  ENGLISH,
}

export const CompliancePage = () => {
  const [language, setLanguage] = useState<Language>(Language.BULGARIAN);
  return (
    <div className="compliance">
      <div className="compliance__lng">
        <div onClick={() => setLanguage(Language.BULGARIAN)}>БГ</div>
        <div onClick={() => setLanguage(Language.ENGLISH)}>ENG</div>
      </div>

      {language === Language.ENGLISH && (
        <>
          <h2>Privacy Policy</h2>
          <p>
            We are committed to protecting your privacy. This policy explains how we collect, use,
            and protect your personal information.
          </p>
          <h3>Data Collection</h3>
          <p>
            We collect personal information such as your name, email, and telephone number when you
            place an order on our website.
          </p>
          <h3>Purpose of Data Collection</h3>
          <p>
            Your personal information is used solely for processing your orders and providing
            customer support.
          </p>
          <h3>Data Security</h3>
          <p>
            We implement various security measures to ensure the safety of your personal
            information.
          </p>
          <h3>User Rights</h3>
          <p>
            You have the right to access, rectify, or delete your personal data. Please contact us
            at &nbsp;
            <a className="sp-additional-info--href" href={`mailto:${AppSettings.contact.email}`}>
              {AppSettings.contact.email}
            </a>
            &nbsp; for any requests.
          </p>
          <h3>Cookies</h3>
          <p>
            We use cookies to enhance your browsing experience. By using our website, you consent to
            our use of cookies.
          </p>
          <h3>Contact Information</h3>
          <p>
            If you have any questions about our privacy policy, please contact us at &nbsp;
            <a className="sp-additional-info--href" href={`mailto:${AppSettings.contact.email}`}>
              {AppSettings.contact.email}
            </a>
            .
          </p>
        </>
      )}
      {language === Language.BULGARIAN && (
        <>
          <h2>Политика за поверителност</h2>
          <p>
            Ние сме ангажирани с опазването на вашата поверителност. Тази политика обяснява как
            събираме, използваме и защитаваме вашата лична информация.
          </p>
          <h3>Събиране на данни</h3>
          <p>
            Събираме лична информация като вашето име, имейл и телефонен номер, когато правите
            поръчка на нашия уебсайт.
          </p>
          <h3>Цел на събирането на данни</h3>
          <p>
            Вашата лична информация се използва единствено за обработка на вашите поръчки и
            предоставяне на клиентска поддръжка.
          </p>
          <h3>Използване на данни</h3>
          <p>
            Използваме събраните данни само за посочените цели и не ги споделяме с трети страни,
            освен ако това не е необходимо за изпълнение на вашата поръчка (например с куриерски
            компании).
          </p>
          <h3>Сигурност на данните</h3>
          <p>
            Прилагаме различни мерки за сигурност, за да гарантираме безопасността на вашата лична
            информация.
          </p>
          <h3>Права на потребителите</h3>
          <p>
            Имате право на достъп, коригиране или изтриване на вашите лични данни. Моля, свържете се
            с нас на&nbsp;
            <a className="sp-additional-info--href" href={`mailto:${AppSettings.contact.email}`}>
              {AppSettings.contact.email}
            </a>
            &nbsp;за всякакви заявки.
          </p>
          <h3>Бисквитки</h3>
          <p>
            Използваме бисквитки, за да подобрим вашето преживяване при сърфиране. Използвайки нашия
            уебсайт, вие се съгласявате с използването на бисквитки.
          </p>
          <h3>Контактна информация</h3>
          <p>
            Ако имате въпроси относно нашата политика за поверителност, моля, свържете се с нас
            на&nbsp;
            <a className="sp-additional-info--href" href={`mailto:${AppSettings.contact.email}`}>
              {AppSettings.contact.email}
            </a>
            .
          </p>
        </>
      )}
    </div>
  );
};
