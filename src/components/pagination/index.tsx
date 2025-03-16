import React, { useState } from 'react';

// Definindo as props do componente com TypeScript
interface PaginationProps {
  totalPages: number; // Número total de páginas
  onPageChange: (page: number) => void; // Função chamada quando a página muda
}

const Pagination: React.FC<PaginationProps> = ({
  totalPages,
  onPageChange,
}) => {
  const [currentPage, setCurrentPage] = useState(1);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    onPageChange(page); // Notifica o componente pai sobre a mudança de página
  };

  return (
    <div className="flex justify-center mt-12">
      <button
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="px-4 py-2 mx-1 border rounded disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-100"
      >
        «
      </button>

      {Array.from({ length: totalPages }, (_, index) => index + 1).map(
        (page) => (
          <button
            key={page}
            onClick={() => handlePageChange(page)}
            className={`px-4 py-2 mx-1 border rounded ${
              currentPage === page
                ? 'bg-orange-500 text-white border-orange-500'
                : 'hover:bg-gray-100'
            }`}
          >
            {page}
          </button>
        )
      )}

      <button
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="px-4 py-2 mx-1 border rounded disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-100"
      >
        »
      </button>
    </div>
  );
};

export default Pagination;
