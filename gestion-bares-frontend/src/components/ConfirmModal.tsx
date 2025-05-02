import clsx from 'clsx';
import React from 'react';
import { IoClose } from 'react-icons/io5';

interface ConfirmModalProps {
    isOpen: boolean;
    text: string;
    type: 'positive' | 'negative';
    onConfirm: () => void;
    onCancel: () => void;
}

const ConfirmModal: React.FC<ConfirmModalProps> = ({ isOpen, text, type, onConfirm, onCancel }) => {
    if (!isOpen) return null;

    const confirmColor = type === 'positive'
        ? 'bg-green-600 hover:bg-green-700'
        : 'bg-red-600 hover:bg-red-700';

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
            <div className="bg-neutral-900 rounded-md shadow-lg w-full max-w-md p-6 relative">
                <button
                    onClick={onCancel}
                    className="cursor-pointer absolute top-4 right-4 text-amber-600 hover:text-amber-700"
                >
                    <IoClose size={20} />
                </button>

                <h3 className="text-lg font-semibold mb-4 text-white">{text}</h3>

                <div className="flex justify-around gap-4 mt-6">
                    <button
                        onClick={onCancel}
                        className="cursor-pointer px-4 py-2 text-sm rounded-md bg-blue-500 hover:bg-blue-600  text-white"
                    >
                        Cancelar
                    </button>
                    <button
                        onClick={onConfirm}
                        className={clsx('cursor-pointer px-4 py-2 text-sm rounded-md text-white', confirmColor)}
                    >
                        Confirmar
                    </button>
                </div>
            </div>
        </div >
    );
};

export default ConfirmModal;