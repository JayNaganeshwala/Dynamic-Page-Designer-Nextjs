import { CircleChevronLeft, CircleChevronRight } from "lucide-react";
import React, { useState } from "react";

interface PaginationProps {
  totalRecords: number;
  displayRecords: number;
  onPageChange: (startFrom: number, displayRecords: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({ totalRecords, displayRecords, onPageChange }) => {
  const totalPages = Math.ceil(totalRecords / displayRecords);
  const [currentPage, setCurrentPage] = useState(1);

  const handlePageClick = (page: number) => {
    console.log('page: ', page);
    setCurrentPage(page);
    const startFrom =  ((page - 1) * displayRecords);
    console.log('startFrom: ', startFrom);
    onPageChange(startFrom, displayRecords);
  };

  return (
    <nav aria-label="Page navigation example">
      <ul className="inline-flex -space-x-px text-sm">
        {/* Previous Button */}
        <li>
          <button
            onClick={() => handlePageClick(Math.max(1, currentPage - 1))}
            disabled={currentPage === 1}
            className={`flex items-center justify-center px-3 h-8 ms-0 leading-tight ${
              currentPage === 1 ? "text-gray-400" : "text-gray-500 hover:text-gray-700 hover:bg-gray-100"
            } bg-white border border-e-0 border-gray-300 rounded-s-lg`}
          >
            <CircleChevronLeft className="font-bold  text-black" strokeWidth={0.75} />
          </button>
        </li>

        {/* Page Numbers */}
        {Array.from({ length: totalPages }, (_, i) => (
          <li  key={i}>
            <button
              onClick={() => handlePageClick(i + 1)}
              className={`flex items-center justify-center px-3 h-8 leading-tight ${
                currentPage === i + 1
                  ? "text-blue-600 bg-blue-50 border border-gray-300"
                  : "text-gray-500 hover:text-gray-700 hover:bg-gray-100"
              } border border-gray-300`}
            >
              {i + 1}
            </button>
          </li>
        ))}

        {/* Next Button */}
        <li >
          <button
            onClick={() => handlePageClick(Math.min(totalPages, currentPage + 1))}
            disabled={currentPage === totalPages}
            className={`flex items-center justify-center px-3 h-8 leading-tight ${
              currentPage === totalPages ? "text-gray-400" : "text-gray-500 hover:text-gray-700 hover:bg-gray-100"
            } bg-white border border-e-0 border-gray-300 rounded-e-lg`}
          >
            <CircleChevronRight className="font-bold  text-black" strokeWidth={0.75} />
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default Pagination;
