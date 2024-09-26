import { useEffect, useState } from "react";
import { Arrow } from "../../../svg/Arrow/Arrow";
import "./paginationNumbers.scss";

type PaginationNumbersProps = {
  initPage: number;
  lastPage: number;
  onChange: (page: number) => void;
};

export const PaginationNumbers: React.FC<PaginationNumbersProps> = ({
  initPage,
  lastPage,
  onChange,
}) => {
  const [currPage, setCurrPage] = useState(initPage);
  const leftArrowDisabled = currPage === 1;
  const rightArrowDisabled = currPage === lastPage;

  const handleLeftArrowClick = () => {
    setCurrPage((prev) => {
      if (prev === 1) return 1;

      return prev - 1;
    });
  };

  const handleRightArrowClick = () => {
    setCurrPage((prev) => {
      if (prev === lastPage) return lastPage;

      return prev + 1;
    });
  };

  const handleFirstPageClick = () => {
    setCurrPage(() => 1);
  };

  const handleLastPageClick = () => {
    setCurrPage(() => lastPage);
  };

  useEffect(() => {
    onChange(currPage);
  }, [currPage, onChange]);

  if (lastPage < 2) return <></>;

  return (
    <div className="pagination-numbers noSelect">
      <Arrow
        height="22px"
        width="22px"
        disabled={leftArrowDisabled}
        className="pagination-numbers--arrow-left"
        onClick={handleLeftArrowClick}
      />
      <div>
        <span className="pagination-numbers--first-page" onClick={handleFirstPageClick}>
          1
        </span>
        ...
        <span className="pagination-numbers--curr-page">{currPage}</span>...
        <span className="pagination-numbers--last-page" onClick={handleLastPageClick}>
          {lastPage}
        </span>
      </div>
      <Arrow
        height="22px"
        width="22px"
        disabled={rightArrowDisabled}
        className="pagination-numbers--arrow-right"
        onClick={handleRightArrowClick}
      />
    </div>
  );
};
