import "./shopDescription.scss";
import { Item } from "./Item";

export const ShopDescription = () => {
  return (
    <section className="shop-description">
      <div className="shop-description__title">Довери ни се</div>
      <div className="shop-description__items">
        <Item title="ПРАВО НА ВРЪЩАНЕ" info="до 60 дни след покупката" imageUrl="buss.png" />
        <Item title="БЕЗПЛАТНА ДОСТАВКА" info="над 100лв. с преглед и тест" imageUrl="buss.png" />
        <Item title="СЕРТИФИКАТ ЗА КАЧЕСТВО" info="с 1 година гаранция" imageUrl="buss.png" />
        <Item title="БЕЗ АЛЕРГЕНИ" info="само благородни метали" imageUrl="buss.png" />
        <Item title="ЛЮБЕЗНО ОБСЛУЖВАНЕ" info="ние работим за Вас" imageUrl="buss.png" />
        <Item title="30 ГОДИНИ ОПИТ" info="може да ни се доверите" imageUrl="buss.png" />
      </div>
    </section>
  );
};
