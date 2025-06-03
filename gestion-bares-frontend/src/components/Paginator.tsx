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
        <div className="flex flex-col lg:flex-row gap-6 lg:gap-0 lg:justify-between lg:items-center mt-4 text-slate-700">
            <div>
                <span>Elementos totales: {totalElements}</span>
            </div>
            <div className="flex gap-2 items-center">
                <button
                    className="cursor-pointer p-2 bg-white border border-slate-300 rounded-md hover:bg-slate-50 transition-colors disabled:opacity-50"
                    onClick={() => handlePageChange(0)}
                    disabled={page <= 0}
                >
                    <IoPlayBackOutline className='text-amber-600' />
                </button>

                <button
                    className="cursor-pointer p-2 bg-white border border-slate-300 rounded-md hover:bg-slate-50 transition-colors disabled:opacity-50"
                    onClick={() => handlePageChange(page - 1)}
                    disabled={page <= 0}
                >
                    <IoPlayOutline className="rotate-180 text-amber-600" />
                </button>

                <span className='px-3 py-1 rounded-md bg-amber-500 text-white font-bold shadow-sm'>
                    {page + 1}
                </span>

                <button
                    className="cursor-pointer p-2 bg-white border border-slate-300 rounded-md hover:bg-slate-50 transition-colors disabled:opacity-50"
                    onClick={() => handlePageChange(page + 1)}
                    disabled={page >= pageCount - 1}
                >
                    <IoPlayOutline className='text-amber-600' />
                </button>

                <button
                    className="cursor-pointer p-2 bg-white border border-slate-300 rounded-md hover:bg-slate-50 transition-colors disabled:opacity-50"
                    onClick={() => handlePageChange(pageCount - 1)}
                    disabled={page >= pageCount - 1}
                >
                    <IoPlayForwardOutline className='text-amber-600' />
                </button>
            </div>

            {showSizes && <div className="flex gap-2 items-center">
                <span className="text-slate-700">Mostrar:</span>
                <select
                    value={pageSize}
                    onChange={(e) => handleSizeChange(Number(e.target.value))}
                    className="p-2 border border-slate-300 rounded-md bg-white text-slate-900 focus:border-amber-500 transition-colors"
                >
                    {availableSizes.map((size) => (
                        <option key={size} value={size} className="bg-white">
                            {size}
                        </option>
                    ))}
                </select>
            </div>}
        </div>
    );
};