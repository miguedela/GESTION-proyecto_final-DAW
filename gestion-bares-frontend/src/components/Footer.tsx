export const Footer = () => (
    <footer className="w-full bg-white dark:bg-neutral-900 border-t border-neutral-200 dark:border-neutral-800 mt-5">
        <div className="py-6 px-6 flex flex-col md:flex-row items-center justify-between text-sm text-neutral-500 dark:text-neutral-400">
            <span>© {new Date().getFullYear()} TapaTech. Todos los derechos reservados.</span>
            <div className="flex gap-4 mt-2 md:mt-0">
                <a href="/privacy" className="hover:text-amber-500 transition-colors">Privacidad</a>
                <a href="/terms" className="hover:text-amber-500 transition-colors">Términos</a>
            </div>
        </div>
    </footer>
);