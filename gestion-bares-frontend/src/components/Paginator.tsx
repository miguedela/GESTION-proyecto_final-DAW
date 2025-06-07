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
        <div className="flex flex-col md:flex-row gap-2 justify-center items-center mt-8">
            <div>
                <span className="text-slate-50 font-semibold">{totalElements} resultados</span>
            </div>
            <div className="flex gap-2 items-center">
                <button
                    className="cursor-pointer p-2 bg-white border border-slate-200 rounded-lg hover:bg-amber-50 transition-colors disabled:opacity-50 shadow available:hover:scale-105 available:active:scale-95"
                    onClick={() => handlePageChange(0)}
                    disabled={page <= 0}
                >
                    <IoPlayBackOutline className='text-amber-600' size={22} />
                </button>

                <button
                    className="cursor-pointer p-2 bg-white border border-slate-200 rounded-lg hover:bg-amber-50 transition-colors disabled:opacity-50 shadow available:hover:scale-105 available:active:scale-95"
                    onClick={() => handlePageChange(page - 1)}
                    disabled={page <= 0}
                >
                    <IoPlayOutline className="rotate-180 text-amber-600" size={22} />
                </button>

                <span className='px-4 py-2 rounded-lg bg-amber-500 text-white font-bold shadow text-lg'>
                    {page + 1}
                </span>

                <button
                    className="cursor-pointer p-2 bg-white border border-slate-200 rounded-lg hover:bg-amber-50 transition-colors disabled:opacity-50 shadow available:hover:scale-105 available:active:scale-95"
                    onClick={() => handlePageChange(page + 1)}
                    disabled={page >= pageCount - 1}
                >
                    <IoPlayOutline className='text-amber-600' size={22} />
                </button>

                <button
                    className="cursor-pointer p-2 bg-white border border-slate-200 rounded-lg hover:bg-amber-50 transition-colors disabled:opacity-50 shadow available:hover:scale-105 available:active:scale-95"
                    onClick={() => handlePageChange(pageCount - 1)}
                    disabled={page >= pageCount - 1}
                >
                    <IoPlayForwardOutline className='text-amber-600' size={22} />
                </button>
            </div>

            {showSizes && <div className="flex gap-2 items-center">
                <select
                    value={pageSize}
                    onChange={(e) => handleSizeChange(Number(e.target.value))}
                    className="p-2 border border-slate-200 rounded-lg bg-white text-slate-900 focus:border-amber-500 transition-colors shadow"
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