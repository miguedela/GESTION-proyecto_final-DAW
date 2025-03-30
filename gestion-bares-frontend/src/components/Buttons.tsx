import clsx from 'clsx'
import { Link } from 'react-router-dom'

export const MainLinkButton = ({ url, className, title }: { url: string, className?: string, title: string }) => {
    return <Link to={url} className={clsx('px-2 py-1 rounded-lg transition active:scale-100', className)}>
        {title}
    </Link>
}

export const MainButton = ({ onClick, className, title }: { onClick: () => void, className?: string, title: string }) => {
    return <button onClick={onClick} className={clsx('px-2 py-1 rounded-lg transition active:scale-100', className)}>
        {title}
    </button>
}
