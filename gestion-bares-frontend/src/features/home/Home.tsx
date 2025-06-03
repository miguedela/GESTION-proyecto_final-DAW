import { MainLinkButton } from "../../components/Buttons";
import { Footer } from "../../layouts/Footer";
import { Header } from "../../layouts/Header";

export const Home = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 w-full flex flex-col items-center justify-center gap-5 text-neutral-100">
        <MainLinkButton url="/login" text="Acceder" />
      </main>
      <Footer />
    </div>
  );
}