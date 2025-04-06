import { MainLinkButton } from "../../components/Buttons"

export const Home = () => {
  return <div className="min-h-screen flex flex-col items-center justify-center gap-5 text-neutral-100 bg-neutral-900">
    <h1 className="text-8xl">Inicio</h1>
    <MainLinkButton url="/login" text="Acceder" />
  </div>
}
