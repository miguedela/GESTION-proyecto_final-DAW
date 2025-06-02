import { Footer } from "../../layouts/Footer";
import { Header } from "../../layouts/Header";

export const About = () => (
    <div className="min-h-screen flex flex-col bg-white">
        <Header />
        <main className="flex-1 container mx-auto px-4 py-12 flex flex-col items-center justify-center">
            <h1 className="text-3xl font-bold mb-4 text-amber-600">Sobre Nosotros</h1>
            <p className="max-w-2xl text-lg text-neutral-700 text-center">
                Bienvenido a TapaTech, tu plataforma para la gestión moderna de bares y restaurantes.
                Nuestro objetivo es facilitar la administración y la experiencia de usuario tanto para los dueños como para los clientes.
                Próximamente añadiremos más información sobre nuestro equipo y nuestra misión.
            </p>
        </main>
        <Footer />
    </div>
);