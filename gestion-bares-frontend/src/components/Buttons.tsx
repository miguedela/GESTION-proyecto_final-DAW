import clsx from 'clsx'
import { IoCheckmarkOutline } from 'react-icons/io5'
import { Link } from 'react-router-dom'

export const MainLinkButton = ({ url, text, className }: { url: string, text: string, className?: string }) => {
    return <Link to={url} className={clsx("text-neutral-800 cursor-pointer py-3 px-4 bg-amber-500 rounded-sm shadow hover:shadow-none hover:bg-amber-600 transition", className)}>{text}</Link>
}

export const MainButton = ({ text, className, onClick, type = "button" }: { text: string, className?: string, onClick?: React.MouseEventHandler<HTMLButtonElement>, type?: React.ButtonHTMLAttributes<HTMLButtonElement>['type'] }) => {
    return <button type={type} onClick={onClick} className={clsx("text-neutral-800 cursor-pointer py-3 px-4 bg-amber-500 rounded-sm shadow hover:shadow-none hover:bg-amber-600 transition", className)}>{text}</button>
}

export const PillCheck = ({ text, className, active, onClick }: { text: string, className?: string, active: boolean, onClick?: () => void }) => {
    return <button onClick={onClick} className={clsx('cursor-pointer px-3 py-1 rounded-full text-xs flex items-center gap-2 bg-amber-700', active ? 'text-white' : 'opacity-70 text-white', className)}><span className={clsx('text-xl', active ? 'block' : 'hidden')}><IoCheckmarkOutline /></span> {text}</button>;
}

const colorClasses: Record<string, string> = {
    red: 'text-red-700 bg-red-700/30 border-red-700/80',
    amber: 'text-amber-700 bg-amber-700/30 border-amber-700/80',
    green: 'text-green-700 bg-green-700/30 border-green-700/80',
    purple: 'text-purple-700 bg-purple-700/30 border-purple-700/80',
    yellow: 'text-yellow-700 bg-yellow-700/30 border-yellow-700/80'
};

export const Pill = ({ text, color = 'amber' }: { text: string, color?: string }) => {
    const classes = colorClasses[color] || colorClasses['amber'];

    return (
        <span className={clsx('px-3 py-1 font-semibold rounded-full border', classes)}>
            {text}
        </span >
    );
};