import clsx from 'clsx';
import { useState } from 'react';
import { IoAlertCircleOutline, IoEyeOffOutline, IoEyeOutline } from 'react-icons/io5';

interface InputProps {
    label?: string;
    id: string;
    value: string;
    placeholder?: string;
    type?: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    fieldErrors?: string;
    min?: string;
    step?: string;
}

export const Input = ({ label, id, value, placeholder, type = 'text', onChange, fieldErrors, min, step }: InputProps) => {
    const [viewPassword, setViewPassword] = useState(false);
    const isPassword = type === 'password';

    const inputType = isPassword ? (viewPassword ? 'text' : 'password') : type;

    return (
        <div className={clsx("flex flex-col", label && "mb-4")}>
            {label && <label htmlFor={id}>{label}</label>}

            <div className={`flex items-center w-full gap-3 ${isPassword ? '' : 'block'}`}>
                <input
                    type={inputType}
                    id={id}
                    value={value}
                    placeholder={placeholder}
                    onChange={onChange}
                    min={min}
                    className="p-2 border border-neutral-400/70 rounded-sm outline-0 focus:border-amber-500 w-full bg-white text-neutral-900"
                    step={step}
                />
                {isPassword && (
                    <button
                        type="button"
                        tabIndex={-1}
                        onClick={() => setViewPassword(!viewPassword)}
                        className="cursor-pointer rounded-sm p-2 text-2xl hover:bg-neutral-100/20 transition-colors duration-200"
                    >
                        {viewPassword ? <IoEyeOutline /> : <IoEyeOffOutline />}
                    </button>
                )}
            </div>

            {fieldErrors && (
                <p className="text-red-500 text-sm flex items-center gap-2 mt-1">
                    <IoAlertCircleOutline size={16} />
                    {fieldErrors}
                </p>
            )}
        </div>
    );
};

interface Option {
    label: string;
    value: string;
}

interface SelectProps {
    label: string;
    id: string;
    value: string;
    options: Option[];
    onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
    fieldErrors?: string;
    placeholderOption?: string;
    disabled?: boolean;
}

export const Select: React.FC<SelectProps> = ({
    label,
    id,
    value,
    options,
    onChange,
    fieldErrors,
    placeholderOption = 'Selecciona una opción',
    disabled = false, // Añadido
}) => {
    return (
        <div className="flex flex-col mb-4">
            <label htmlFor={id}>{label}</label>
            <select
                id={id}
                value={value}
                onChange={onChange}
                disabled={disabled}
                className="p-2 border border-neutral-400/70 rounded-sm outline-0 focus:border-amber-500 w-full bg-white text-neutral-900"
            >
                <option value="" className='bg-amber-600 text-neutral-800'>{placeholderOption}</option>
                {options.map((option) => (
                    <option key={option.value} value={option.value}>{option.label}</option>
                ))}
            </select>
            {fieldErrors && (
                <p className="text-red-500 text-sm flex items-center gap-2 mt-1">
                    <IoAlertCircleOutline size={16} />
                    {fieldErrors}
                </p>
            )}
        </div>
    );
};
