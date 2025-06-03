import clsx from 'clsx'
import { IoCheckmarkOutline } from 'react-icons/io5'
import { Link } from 'react-router-dom'

export const MainLinkButton = ({ url, text, className }: { url: string, text: string, className?: string }) => {
    return <Link to={url} className={clsx("text-slate-900 cursor-pointer py-3 px-4 bg-amber-500 rounded-md shadow hover:shadow-md hover:bg-amber-600 transition", className)}>{text}</Link>
}

export const MainButton = ({ text, className, onClick, type = "button" }: { text: string, className?: string, onClick?: React.MouseEventHandler<HTMLButtonElement>, type?: React.ButtonHTMLAttributes<HTMLButtonElement>['type'] }) => {
    return <button type={type} onClick={onClick} className={clsx("text-slate-900 cursor-pointer py-3 px-4 bg-amber-500 rounded-md shadow hover:shadow-md hover:bg-amber-600 transition", className)}>{text}</button>
}

export const PillCheck = ({ text, className, active, onClick }: { text: string, className?: string, active: boolean, onClick?: () => void }) => {
    return <button onClick={onClick} className={clsx('cursor-pointer px-3 py-1 rounded-full text-xs flex items-center gap-2', active ? 'bg-amber-600 text-white' : 'bg-amber-300 text-amber-900', className)}><span className={clsx('text-xl', active ? 'block' : 'hidden')}><IoCheckmarkOutline /></span> {text}</button>;
}

const colorClasses: Record<string, string> = {
    red: 'text-red-700 bg-red-200 border-red-400',
    amber: 'text-amber-800 bg-amber-200 border-amber-400',
    green: 'text-green-700 bg-green-200 border-green-400',
    purple: 'text-purple-700 bg-purple-200 border-purple-400',
    yellow: 'text-yellow-700 bg-yellow-200 border-yellow-400'
};

export const Pill = ({ text, color = 'amber' }: { text: string, color?: string }) => {
    const classes = colorClasses[color] || colorClasses['amber'];

    return (
        <span className={clsx('px-3 py-1 font-semibold rounded-full border', classes)}>
            {text}
        </span >
    );
};