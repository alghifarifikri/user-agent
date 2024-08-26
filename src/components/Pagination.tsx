import React from "react";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export default function Pagination({
  currentPage,
  totalPages,
  onPageChange,
}: PaginationProps) {
  const renderPageNumbers = () => {
    const pages: React.ReactNode[] = [];
    for (let i = 1; i <= totalPages; i++) {
      pages.push(
        <li
          key={i}
          className={`${
            i === currentPage
              ? "bg-blue-500 text-white"
              : "bg-gray-200 text-gray-700"
          } hover:bg-blue-500 hover:text-white px-2 py-1 rounded-md cursor-pointer`}
          onClick={() => onPageChange(i)}
        >
          {i}
        </li>
      );
    }
    return pages;
  };

  const handleChangeValidate = (type: "prev" | "next") => {
    if (currentPage !== 1 && type === "prev") {
      onPageChange(currentPage - 1);
    } else if (currentPage !== totalPages && type === "next") {
      onPageChange(currentPage + 1);
    }
  };

  return (
    <ul className="flex justify-center space-x-2 mt-4">
      <li
        className={`${
          currentPage === 1 ? "opacity-50 cursor-not-allowed" : "cursor-pointer"
        } bg-gray-200 text-gray-700 px-2 py-1 rounded-md`}
        onClick={() => handleChangeValidate("prev")}
      >
        Prev
      </li>
      {renderPageNumbers()}
      <li
        className={`${
          currentPage === totalPages
            ? "opacity-50 cursor-not-allowed"
            : "cursor-pointer"
        } bg-gray-200 text-gray-700 px-2 py-1 rounded-md`}
        onClick={() => handleChangeValidate("next")}
      >
        Next
      </li>
    </ul>
  );
}
