import { Footer } from "../layouts/Footer"
import { Header } from "../layouts/Header"

export const Terms = () => {
  return <>
    <div className="min-h-screen flex flex-col mt-6.5">
      <Header />
      <main className="container mx-auto flex-1 flex flex-col gap-6 text-slate-50 rounded-lg p-8 bg-gray-800 shadow-lg">
        <h1 className="text-3xl font-bold text-center text-amber-400">Términos y Condiciones</h1>
        <p className="text-neutral-50 text-lg leading-relaxed">
          Bienvenido a nuestra página de Términos y Condiciones. Aquí encontrarás toda la información sobre las reglas y políticas que rigen el uso de nuestros servicios.
        </p>
        <section className="text-neutral-50">
          <h2 className="text-xl font-semibold text-amber-400">Uso de los Servicios</h2>
          <p>
            Al utilizar nuestros servicios, aceptas cumplir con las normas establecidas y respetar los derechos de otros usuarios.
          </p>
        </section>
        <section className="text-neutral-50">
          <h2 className="text-xl font-semibold text-amber-400">Modificaciones</h2>
          <p>
            Nos reservamos el derecho de modificar estos términos en cualquier momento. Te notificaremos sobre cambios importantes.
          </p>
        </section>
      </main>
      <Footer />
    </div>
  </>
}
