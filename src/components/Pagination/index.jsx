import React, { useEffect, useState } from "react";
// import ReactDOM from "react-dom";
import ReactPaginate from "react-paginate";

import style from "./Pagination.module.scss";

const Pagination = ({ onChangePage }) => {
  return (
    <>
      <ReactPaginate
        className={style.root}
        breakLabel="..."
        nextLabel=">"
        onPageChange={(event) => {
          console.log(event);
          onChangePage(event.selected + 1);
        }}
        pageRangeDisplayed={4}
        pageCount={4}
        previousLabel="<"
        renderOnZeroPageCount={null}
      />
    </>
  );
};

export default Pagination;