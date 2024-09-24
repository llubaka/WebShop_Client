import "./pagination.scss";

type PaginationProps = {
  pages: number;
  page: number;
  onChange: (page: number) => void;
  className?: string;
};

export const Pagination: React.FC<PaginationProps> = ({ page, onChange, pages, className = "" }) => {
  return (
    <div className={`pagination-container ${className}`}>
      {Array(pages)
        .fill(undefined)
        .map((_, index) => (
          <div
            className={`pagination-container__page ${page === index && "pagination-container__page--selected"}`}
            key={index}
            onClick={() => onChange(index)}
          ></div>
        ))}
    </div>
  );
};
