import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { useState } from "react";
import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination";

const TableData = ({ coins, searchCoin }) => {
    const [currentPage, setCurrentPage] = useState(1);

        // Filter coins based on name
        const filteredCoins = coins.filter((coin) =>
            coin.name.toLowerCase().includes(searchCoin.toLowerCase())
        );

    const itemsPerPage = 10;


    // Calculate the total number of pages
    const totalPages = Math.ceil(coins.length / itemsPerPage);

    // Get coins for the current page
    const startIndex = (currentPage - 1) * itemsPerPage;
    const paginatedCoins = filteredCoins.slice(startIndex, startIndex + itemsPerPage);

    // Handle page change
    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

     // Helper function to generate the range of page numbers to show
     const getPageNumbers = () => {
        const pageNumbers = [];
        const maxVisiblePages = 3; // Number of pages to show around the current page

        if (totalPages <= maxVisiblePages + 2) {
            for (let i = 1; i <= totalPages; i++) {
                pageNumbers.push(i);
            }
        } else {
            pageNumbers.push(1); // Always show the first page

            if (currentPage > maxVisiblePages) {
                pageNumbers.push("..."); // Ellipsis before current page range
            }

            const start = Math.max(2, currentPage - 1);
            const end = Math.min(totalPages - 1, currentPage + 1);

            for (let i = start; i <= end; i++) {
                pageNumbers.push(i);
            }

            if (currentPage < totalPages - maxVisiblePages) {
                pageNumbers.push("..."); // Ellipsis after current page range
            }

            pageNumbers.push(totalPages); // Always show the last page
        }

        return pageNumbers;
    };

    return (
        <>
            <Table>
                
                <TableHeader>
                    <TableRow>
                        <TableHead className="w-[100px]">Coin</TableHead>
                        <TableHead>Code</TableHead>
                        <TableHead>Price</TableHead>
                        <TableHead className="text-right">Total Supply</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>

                    {paginatedCoins.length > 0 ? (
                        paginatedCoins.map((coin) => (
                            <TableRow key={coin.id}>
                                <TableCell className="font-medium">{coin.name}</TableCell>
                                <TableCell>{coin.symbol}</TableCell>
                                <TableCell className={`${parseFloat(coin.price_usd) > 1 ? 'text-green-700' : 'text-red-400'}`}>{coin.price_usd}</TableCell>
                                <TableCell className="text-right">{coin.tsupply}</TableCell>
                            </TableRow>
                        ))
                    ) : (
                        <p className="col-span-full text-center text-lg">No coins found</p>
                    )}
                </TableBody>
            </Table>

            <div className="">
                {/* Pagination Component */}
                <Pagination>
                    <PaginationContent>
                        <PaginationItem>
                            <PaginationPrevious
                                href="#"
                                onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
                            />
                        </PaginationItem>

                        {getPageNumbers().map((page, index) => (
                            <PaginationItem key={index}>
                                {page === "..." ? (
                                    <span className="px-2">...</span>
                                ) : (
                                    <PaginationLink
                                        href="#"
                                        isActive={page === currentPage}
                                        onClick={() => handlePageChange(page)}
                                    >
                                        {page}
                                    </PaginationLink>
                                )}
                            </PaginationItem>
                        ))}

                        <PaginationItem>
                            <PaginationNext
                                href="#"
                                onClick={() => handlePageChange(Math.min(totalPages, currentPage + 1))}
                            />
                        </PaginationItem>
                    </PaginationContent>
                </Pagination>
            </div>
        </>
    )
}

export default TableData
