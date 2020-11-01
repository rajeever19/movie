import React from "react";
import propTypes from "prop-types";
import _ from "lodash";
const Pagination = (props) => {
  const { pageSize, itemCount, currentPage, onPageChange } = props;
  const pageCount = Math.ceil(itemCount / pageSize);
  console.log(pageCount);
  if (pageCount === 1) return null;
  const pages = _.range(1, pageCount + 1);
  return (
    <nav>
      <ul className="pagination">
        {pages.map((page) => (
          <li
            className={page === currentPage ? "page-item active" : "page-item"}
            key={page}
          >
            <a href="#" className="page-link" onClick={() => onPageChange(page)}>
              {page}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
};
Pagination.propTypes = {
  pageSize: propTypes.number.isRequired,
  itemCount: propTypes.number.isRequired,
  currentPage: propTypes.number.isRequired,
  onPageChange: propTypes.func.isRequired,
};
export default Pagination;
