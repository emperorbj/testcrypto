import {
    Table,
    TableBody,
    TableCaption,
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

    return (
        <>
            <Table>
                <TableCaption>A list of available coins</TableCaption>
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

            <div>
                {/* Pagination Component */}
                <Pagination>
                    <PaginationContent>
                        <PaginationItem>
                            <PaginationPrevious
                                href="#"
                                onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
                            />
                        </PaginationItem>
                        {[...Array(totalPages)].map((_, index) => (
                            <PaginationItem key={index}>
                                <PaginationLink
                                    href="#"
                                    isActive={index + 1 === currentPage}
                                    onClick={() => handlePageChange(index + 1)}
                                >
                                    {index + 1}
                                </PaginationLink>
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
