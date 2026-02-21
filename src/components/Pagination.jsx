const Pagination = ({
    currentPage,
    totalItems,
    itemsPerPage,
    onPageChange,
}) => {
    if (!itemsPerPage || itemsPerPage <= 0) return null;
    if (!totalItems || totalItems <= 0) return null;

    const totalPages = Math.ceil(totalItems / itemsPerPage);

    if (!Number.isFinite(totalPages) || totalPages <= 1) {
        return null;
    }

    return (
        <div className="flex flex-wrap justify-center gap-2 mt-8">
            <button
                disabled={currentPage === 1}
                onClick={() => onPageChange(currentPage - 1)}
                className="px-3 py-1 border rounded cursor-pointer disabled:opacity-50 disabled:cursor-no-drop"
            >
                Prev
            </button>

            {Array.from({ length: totalPages }).map((_, i) => {
                const page = i + 1;
                return (
                    <button
                        key={page}
                        onClick={() => onPageChange(page)}
                        className={`px-3 py-1 border border-gray-300 cursor-pointer rounded ${currentPage === page
                                ? "bg-green-600 text-white"
                                : ""
                            }`}
                    >
                        {page}
                    </button>
                );
            })}

            <button
                disabled={currentPage === totalPages}
                onClick={() => onPageChange(currentPage + 1)}
                className="px-3 py-1 border rounded cursor-pointer disabled:opacity-50 disabled:cursor-no-drop"
            >
                Next
            </button>
        </div>
    );
};

export default Pagination;
