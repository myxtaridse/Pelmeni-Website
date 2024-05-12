import React, { memo } from "react";
// import ReactDOM from "react-dom";
import ReactPaginate from "react-paginate";
import "../../redux/filterSlice/sliceFilter";

import style from "./Pagination.module.scss";
import { useWhyDidYouUpdate } from "ahooks";

type PaginationProps = {
  onChangePage: (page: number) => void;
  currentPage: number;
};

// React.memo предотвращает лишние перерисовки

const Pagination: React.FC<PaginationProps> = ({
  onChangePage,
  currentPage,
}) => {
  useWhyDidYouUpdate("Pagination", { currentPage, onChangePage });
  console.log("Произошел рендер в Пагинации");
  return (
    <>
      <ReactPaginate
        className={style.root}
        breakLabel="..."
        nextLabel=">"
        onPageChange={(event) => {
          onChangePage(event.selected + 1);
        }}
        pageRangeDisplayed={4}
        pageCount={4}
        forcePage={currentPage - 1}
        previousLabel="<"
        renderOnZeroPageCount={null}
      />
    </>
  );
};

export default memo(Pagination);
