import { MainLinkButton } from "../../components/Buttons"

export const Home = () => {
    return <div className='min-h-screen min-w-screen flex flex-col items-center'>

        {/* HERO */}
        <section className="min-w-screen min-h-screen flex flex-col items-center justify-center bg-gradient-to-br
        from-neutral-800 to-amber-600">
            <h1 className="text-6xl mb-7">TapaTech</h1>
            <MainLinkButton url='/login' className="text-xl bg-amber-400 text-yellow-900 hover:scale-120" title='Acceder' />
        </section>

        {/* CONTENEDOR PRINCIPAL */}
        <div className="min-w-screen min-h-screen flex flex-col items-center justify-between bg-neutral-800">

            {/* HEADER */}
            <header className="min-w-screen bg-yellow-200 p-8">
                <div className="w-[90%] mx-auto flex items-center justify-between">
                    <h1 className="text-3xl">TapaTech</h1>
                    <div className="flex gap-3">
                        <MainLinkButton url='/login' className="text-xl bg-amber-400 text-yellow-900 hover:bg-amber-600 hover:text-yellow-200 text-md" title='Acceder' />
                        <MainLinkButton url='/sign-up' className="text-xl bg-amber-400 text-yellow-900 hover:bg-amber-600 hover:text-yellow-200 text-md" title='Registrarse' />
                    </div>
                </div>
            </header>

            {/* MAIN */}
            <main>
                <h2 className="text-3xl">Bienvenido a TapaTech</h2>
            </main>

            {/* FOOTER */}
            <footer className="min-w-screen bg-amber-300 p-4">
                <div className="w-[90%] mx-auto flex justify-between items-start">
                    <h3 className="text-sm">©Copyright 2025.</h3>
                    <div className="flex flex-col gap-3">
                        <a href="">Instagram</a>
                        <a href="">Facebook</a>
                        <a href="">Twitter</a>
                    </div>
                    <h3 className="text-sm">©Copyright 2025.</h3>
                    <h3 className="text-sm">©Copyright 2025.</h3>
                </div>
            </footer>

        </div>
    </div>
}