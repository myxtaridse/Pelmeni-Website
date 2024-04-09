import React from "react";
// import ReactDOM from "react-dom";
import ReactPaginate from "react-paginate";
import "../../redux/slices/filterSlice";

import style from "./Pagination.module.scss";

const Pagination = ({ onChangePage, currentPage }) => {
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

export default Pagination;
