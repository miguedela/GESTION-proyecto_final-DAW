import React, { useState } from 'react';
import { IoPlayBackOutline, IoPlayForwardOutline, IoPlayOutline } from 'react-icons/io5';

interface PaginatorProps {
    totalElements: number;
    pageCount: number;
    page: number;
    defaultSize?: number;
    availableSizes?: number[];
    showSizes?: boolean;
    onPageChange: (page: number, size: number) => void;
}

export const Paginator: React.FC<PaginatorProps> = ({
    totalElements,
    pageCount,
    page,
    defaultSize = 5,
    availableSizes = [5, 10, 15],
    showSizes = true,
    onPageChange,
}) => {
    const [pageSize, setPageSize] = useState(defaultSize);

    const handlePageChange = (newPage: number) => {
        onPageChange(newPage, pageSize);
    };

    const handleSizeChange = (newSize: number) => {
        setPageSize(newSize);
        onPageChange(0, newSize);
    };

    return (
        <div className="flex flex-col lg:flex-row gap-6 lg:gap-0 lg:justify-between lg:items-center mt-4">
            <div>
                <span>Elementos totales: {totalElements}</span>
            </div>
            <div className="flex gap-2 items-center">
                <button
                    className="cursor-pointer p-2 dark:hover:bg-gray-700 hover:bg-gray-300 rounded"
                    onClick={() => handlePageChange(0)}
                    disabled={page <= 0}
                >
                    <IoPlayBackOutline className='text-amber-500' />
                </button>

                <button
                    className="cursor-pointer p-2 dark:hover:bg-gray-700 hover:bg-gray-300 rounded"
                    onClick={() => handlePageChange(page - 1)}
                    disabled={page <= 0}
                >
                    <IoPlayOutline className="rotate-180 text-amber-500" />
                </button>

                <span className='px-3 py-1 rounded bg-amber-500 text-neutral-800'>{page + 1}</span>

                <button
                    className="cursor-pointer p-2 dark:hover:bg-gray-700 hover:bg-gray-300 rounded"
                    onClick={() => handlePageChange(page + 1)}
                    disabled={page >= pageCount - 1}
                >
                    <IoPlayOutline className='text-amber-500' />
                </button>

                <button
                    className="cursor-pointer p-2 dark:hover:bg-gray-700 hover:bg-gray-300 rounded"
                    onClick={() => handlePageChange(pageCount - 1)}
                    disabled={page >= pageCount - 1}
                >
                    <IoPlayForwardOutline className='text-amber-500' />
                </button>
            </div>

            {showSizes && <>
                <div className="flex gap-2 items-center">
                    <span>Mostrar:</span>
                    <select
                        value={pageSize}
                        onChange={(e) => handleSizeChange(Number(e.target.value))}
                        className="p-2 border-2 border-gray-300 rounded"
                    >
                        {availableSizes.map((size) => (
                            <option key={size} value={size}>
                                {size}
                            </option>
                        ))}
                    </select>
                </div>
            </>}
        </div>
    );
};