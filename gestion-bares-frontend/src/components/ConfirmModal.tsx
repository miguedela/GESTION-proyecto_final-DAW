import clsx from 'clsx';
import React from 'react';
import { IoClose } from 'react-icons/io5';

interface ConfirmModalProps {
    isOpen: boolean;
    text: string;
    onConfirm: () => void;
    onCancel: () => void;
}

const ConfirmModal: React.FC<ConfirmModalProps> = ({ isOpen, text, onConfirm, onCancel }) => {
    if (!isOpen) return null;

    const confirmColor = 'bg-amber-500 hover:bg-amber-600';

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
            <div className="bg-white rounded-md shadow-lg w-full max-w-md p-6 relative">
                <button
                    onClick={onCancel}
                    className="cursor-pointer absolute top-4 right-4 text-amber-600 hover:text-amber-700"
                >
                    <IoClose size={20} />
                </button>

                <h3 className="text-lg font-semibold mb-4 text-slate-900">{text}</h3>

                <div className="flex justify-around gap-4 mt-6">
                    <button
                        onClick={onCancel}
                        className="cursor-pointer px-4 py-2 text-sm rounded-md bg-slate-300 hover:bg-slate-400 text-slate-900 transition-colors"
                    >
                        Cancelar
                    </button>
                    <button
                        onClick={onConfirm}
                        className={clsx('cursor-pointer px-4 py-2 text-sm rounded-md text-white transition-colors', confirmColor)}
                    >
                        Confirmar
                    </button>
                </div>
            </div>
        </div >
    );
};

export default ConfirmModal;