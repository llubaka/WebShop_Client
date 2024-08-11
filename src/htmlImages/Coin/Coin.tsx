import "./coin.scss";

interface CoinProps {
  count: number;
}

export const Coin: React.FC<CoinProps> = ({ count }) => {
  return (
    <div className="html-coin">
      <div className="html-coin__first"></div>
      <div className="html-coin__second"></div>
      <div className="html-coin__third"></div>
      <div className="html-coin__count-container">
        <div className="html-coin__count-container--count">
          <div className="html-coin__count-container--count--text">{count}</div>
        </div>
      </div>
    </div>
  );
};
