import "./errorPage.scss";

export const ErrorPage = () => {
  return (
    <div className="error-page-container">
      <div className="error-page-container__title">Нещо се обърка!</div>
      <div className="error-page-container__link">
        <a href="./">Обратно към начална страница</a>
      </div>
    </div>
  );
};
