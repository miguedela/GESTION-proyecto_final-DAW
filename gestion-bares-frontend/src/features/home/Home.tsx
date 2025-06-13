import { Link } from "react-router-dom";
import { Footer } from "../../layouts/Footer";
import { Header } from "../../layouts/Header";
import { userAtom } from "../../atoms/user.atom";
import { useAtom } from "jotai";

export const Home = () => {
  const [user] = useAtom(userAtom);

  return <>
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="container mx-auto flex-1 flex flex-col gap-6 text-slate-50 rounded-lg p-4 md:p-8">
        <section className="h-[82vh] bg-gradient-to-br from-amber-500 to-red-600 rounded-lg shadow-lg text-white p-4 md:p-6 grid grid-cols-1 lg:grid-cols-2 items-center text-center">
          <div className="flex flex-col items-center justify-center text-center w-[90%] md:w-[80%] mx-auto">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">Bienvenido a TapaTech, gestión de Restaurantes</h1>
            <p className="text-base md:text-lg mb-6 mt-8 text-pretty">
              Bienvenido a TapaTech, tu plataforma para la gestión moderna de bares y restaurantes.
              Nuestro objetivo es facilitar la administración y la experiencia de usuario tanto para los dueños como para los clientes.
              Próximamente añadiremos más información sobre nuestro equipo y nuestra misión.
            </p>
            {!user &&
              <Link to={"/signup"} className="bg-white text-amber-600 px-4 md:px-6 py-2 md:py-3 rounded-lg shadow-md font-semibold hover:bg-gray-200">Crear cuenta</Link>
            }
          </div>
          <img src="/img/hero.svg" alt="Hero" className="w-full max-w-xs md:max-w-md mx-auto" />
        </section>

        <section className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">
          <section className="h-[40vh] bg-white rounded-lg shadow-lg flex flex-col items-center justify-center text-center px-4 md:px-6">
            <h2 className="text-2xl md:text-3xl font-bold mb-4 text-gray-800">Características</h2>
            <ul className="text-gray-700">
              <li className="mb-2"><span className="text-green-700">✔</span> Gestión de reservas</li>
              <li className="mb-2"><span className="text-green-700">✔</span> Visualización de platos</li>
              <li className="mb-2"><span className="text-green-700">✔</span> Administración de restaurantes</li>
            </ul>
          </section>

          <section className="h-[40vh] bg-white/50 backdrop-blur-xs rounded-lg shadow-lg flex items-center justify-center text-center px-4 md:px-6">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold mb-4 text-gray-800">Testimonios</h2>
              <p className="text-gray-700 italic">"Esta aplicación ha transformado la manera en que gestionamos nuestro restaurante."</p>
              <p className="text-gray-700 italic">- Usuario satisfecho</p>
            </div>
          </section>
        </section>
      </main>
      <Footer />
    </div >
  </>
}