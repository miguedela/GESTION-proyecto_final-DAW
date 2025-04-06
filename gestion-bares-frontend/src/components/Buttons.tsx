import clsx from 'clsx'
import { IoCheckmarkOutline } from 'react-icons/io5'
import { Link } from 'react-router-dom'

export const MainLinkButton = ({ url, text, className }: { url: string, text: string, className?: string }) => {
    return <Link to={url} className={clsx("cursor-pointer py-3 px-4 bg-blue-500 rounded-sm shadow hover:shadow-none hover:bg-blue-600 transition", className)}>{text}</Link>
}

export const MainButton = ({ text, className, onClick, type = "button" }: { text: string, className?: string, onClick?: React.MouseEventHandler<HTMLButtonElement>, type?: React.ButtonHTMLAttributes<HTMLButtonElement>['type'] }) => {
    return <button type={type} onClick={onClick} className={clsx("cursor-pointer py-3 px-4 bg-blue-500 rounded-sm shadow hover:shadow-none hover:bg-blue-600 transition", className)}>{text}</button>
}

export const PillCheck = ({ text, className, active, onClick }: { text: string, className?: string, active: boolean, onClick?: () => void }) => {
    return <button onClick={onClick} className={clsx('cursor-pointer px-3 py-1 rounded-full text-xs flex items-center gap-2 bg-blue-700', active ? 'text-white' : 'opacity-70 text-white', className)}><span className={clsx('text-xl', active ? 'block' : 'hidden')}><IoCheckmarkOutline /></span> {text}</button>;
}

const colorClasses: Record<string, string> = {
    red: 'text-red-700 bg-red-700/30 border-red-700/80 dark:text-red-300 dark:bg-red-300/30 dark:border-red-300/80',
    blue: 'text-blue-700 bg-blue-700/30 border-blue-700/80 dark:text-blue-300 dark:bg-blue-500/30 dark:border-blue-500/80',
    green: 'text-green-700 bg-green-700/30 border-green-700/80 dark:text-green-300 dark:bg-green-300/30 dark:border-green-300/80',
    purple: 'text-purple-700 bg-purple-700/30 border-purple-700/80 dark:text-purple-300 dark:bg-purple-500/30 dark:border-purple-500/80',
    yellow: 'text-yellow-700 bg-yellow-700/30 border-yellow-700/80 dark:text-yellow-300 dark:bg-yellow-500/30 dark:border-yellow-500/80'
};

export const Pill = ({ text, color = 'blue' }: { text: string, color?: string }) => {
    const classes = colorClasses[color] || colorClasses['blue'];

    return (
        <span className={clsx('px - 3 py-1 font-semibold rounded-full border', classes)}>
            {text}
        </span >
    );
};