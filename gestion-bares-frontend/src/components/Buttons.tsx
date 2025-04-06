import clsx from 'clsx'
import { Link } from 'react-router-dom'

export const MainLinkButton = ({ url, text, className }: { url: string, text: string, className?: string }) => {
    return <Link to={url} className={clsx("cursor-pointer py-3 px-4 bg-blue-500 rounded-sm shadow hover:shadow-none hover:bg-blue-600 transition", className)}>{text}</Link>
}

export const MainButton = ({ text, className, onClick, type = "button" }: { text: string, className?: string, onClick?: React.MouseEventHandler<HTMLButtonElement>, type?: React.ButtonHTMLAttributes<HTMLButtonElement>['type'] }) => {
    return <button type={type} onClick={onClick} className={clsx("cursor-pointer py-3 px-4 bg-blue-500 rounded-sm shadow hover:shadow-none hover:bg-blue-600 transition", className)}>{text}</button>
}