import { MainLinkButton } from "../../components/Buttons"

export const Home = () => {
  return <div className="min-h-screen flex flex-col items-center justify-center gap-5">
    <MainLinkButton url="/login" text="Acceder" />
  </div>
}
