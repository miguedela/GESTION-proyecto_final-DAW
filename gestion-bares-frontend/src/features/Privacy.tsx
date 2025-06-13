import { Footer } from "../layouts/Footer"
import { Header } from "../layouts/Header"

export const Privacy = () => {
  return <>
    <div className="min-h-screen flex flex-col mt-6.5">
      <Header />
      <main className="container mx-auto flex-1 flex flex-col gap-6 text-slate-50 rounded-lg p-8 bg-gray-800 shadow-lg">
        <h1 className="text-3xl font-bold text-center text-amber-400">Política de Privacidad</h1>
        <p className="text-neutral-50 text-lg leading-relaxed">
          En nuestra empresa, valoramos tu privacidad y nos comprometemos a proteger tus datos personales. Esta política explica cómo recopilamos, usamos y compartimos tu información.
        </p>
        <section className="text-neutral-50">
          <h2 className="text-xl font-semibold text-amber-400">Recopilación de Información</h2>
          <p>
            Recopilamos información personal que nos proporcionas directamente, como tu nombre, correo electrónico y número de teléfono, así como datos generados por tu uso de nuestros servicios.
          </p>
        </section>
        <section className="text-neutral-50">
          <h2 className="text-xl font-semibold text-amber-400">Uso de la Información</h2>
          <p>
            Utilizamos tu información para mejorar nuestros servicios, comunicarnos contigo y cumplir con nuestras obligaciones legales.
          </p>
        </section>
        <section className="text-neutral-50">
          <h2 className="text-xl font-semibold text-amber-400">Tus Derechos</h2>
          <p>
            Tienes derecho a acceder, corregir y eliminar tu información personal. Contáctanos si deseas ejercer estos derechos.
          </p>
        </section>
      </main>
      <Footer />
    </div>
  </>
}
