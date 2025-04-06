import { Footer } from "../../layout/Footer";
import { Header } from "../../layout/Header";


export const Users = () => {
  return <div className="flex flex-col justify-center items-center min-h-screen bg-gradient-to-br from-neutral-800 to-amber-600">
    <Header />
    <div className="w-[100%] md:w-[80%] flex-1">

      <h1 className="text-white">Usuarios registrados</h1>

    </div>
    <Footer />
  </div>;
}
