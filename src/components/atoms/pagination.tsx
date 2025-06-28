import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from '@/components/ui/pagination';

interface PaginationProps {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number, limit: number) => void;
    limit?: number;
    visiblePages?: number;
}

export function DevPagination({
    currentPage,
    totalPages,
    onPageChange,
    limit = 10,
    visiblePages = 3,
}: PaginationProps) {
    // Calculate visible page range
    const getVisiblePages = () => {
        let start = Math.max(1, currentPage - Math.floor(visiblePages / 2));
        let end = Math.min(totalPages, start + visiblePages - 1);

        // Adjust if we're at the beginning or end
        if (end - start + 1 < visiblePages) {
            start = Math.max(1, end - visiblePages + 1);
        }

        return Array.from({ length: end - start + 1 }, (_, i) => start + i);
    };

    const visiblePageNumbers = getVisiblePages();

    const handlePageChange = (page: number) => {
        if (page < 1 || page > totalPages || page === currentPage) return;
        onPageChange(page, limit);
    };

    return (
        <Pagination>
            <PaginationContent>
                {/* Previous button */}
                <PaginationItem>
                    <PaginationPrevious
                        href="#"
                        onClick={(e) => {
                            e.preventDefault();
                            handlePageChange(currentPage - 1);
                        }}
                        aria-disabled={currentPage <= 1}
                        tabIndex={currentPage <= 1 ? -1 : undefined}
                        className={
                            currentPage <= 1
                                ? 'pointer-events-none opacity-50'
                                : undefined
                        }
                    />
                </PaginationItem>

                {/* First page */}
                {visiblePageNumbers[0] > 1 && (
                    <>
                        <PaginationItem>
                            <PaginationLink
                                href="#"
                                onClick={(e) => {
                                    e.preventDefault();
                                    handlePageChange(1);
                                }}
                                isActive={currentPage === 1}
                            >
                                1
                            </PaginationLink>
                        </PaginationItem>
                        {visiblePageNumbers[0] > 2 && (
                            <PaginationItem>
                                <PaginationEllipsis />
                            </PaginationItem>
                        )}
                    </>
                )}

                {/* Visible pages */}
                {visiblePageNumbers.map((page) => (
                    <PaginationItem key={page}>
                        <PaginationLink
                            href="#"
                            onClick={(e) => {
                                e.preventDefault();
                                handlePageChange(page);
                            }}
                            isActive={page === currentPage}
                        >
                            {page}
                        </PaginationLink>
                    </PaginationItem>
                ))}

                {/* Last page */}
                {visiblePageNumbers[visiblePageNumbers.length - 1] <
                    totalPages && (
                    <>
                        {visiblePageNumbers[visiblePageNumbers.length - 1] <
                            totalPages - 1 && (
                            <PaginationItem>
                                <PaginationEllipsis />
                            </PaginationItem>
                        )}
                        <PaginationItem>
                            <PaginationLink
                                href="#"
                                onClick={(e) => {
                                    e.preventDefault();
                                    handlePageChange(totalPages);
                                }}
                                isActive={currentPage === totalPages}
                            >
                                {totalPages}
                            </PaginationLink>
                        </PaginationItem>
                    </>
                )}

                {/* Next button */}
                <PaginationItem>
                    <PaginationNext
                        href="#"
                        onClick={(e) => {
                            e.preventDefault();
                            handlePageChange(currentPage + 1);
                        }}
                        aria-disabled={currentPage >= totalPages}
                        tabIndex={currentPage >= totalPages ? -1 : undefined}
                        className={
                            currentPage >= totalPages
                                ? 'pointer-events-none opacity-50'
                                : undefined
                        }
                    />
                </PaginationItem>
            </PaginationContent>
        </Pagination>
    );
}
