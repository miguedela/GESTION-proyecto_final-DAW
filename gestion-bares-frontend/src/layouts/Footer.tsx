export const Footer = () => (
    <footer className="w-full bg-slate-600 shadow-sm text-slate-100 rounded-tl-2xl rounded-tr-2xl mt-2">
        <div className="mx-auto py-6 px-6 md:px-12 flex flex-wrap items-center justify-between text-sm">
            <span className="font-semibold tracking-wide flex items-center gap-2">
                ©{new Date().getFullYear()}<span className="font-bold text-amber-600">TapaTech</span>Derechos reservados.
            </span>
            <div className="flex flex-wrap gap-4 mt-2 md:mt-0">
                <a href="/privacy" className="text-slate-100 hover:text-amber-500 transition-colors">Privacidad</a>
                <a href="/terms" className="text-slate-100 hover:text-amber-500 transition-colors">Términos</a>
            </div>
        </div>
    </footer>
);