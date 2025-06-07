import { Footer } from "../../layouts/Footer";
import { Header } from "../../layouts/Header";

export const Home = () => {
  return <>
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="container mx-auto flex-1 flex flex-col gap-6 text-slate-50 rounded-lg p-8">
        <div className="h-[83vh] bg-white/50 backdrop-blur-xs rounded-lg shadow-lg flex items-center justify-center">

        </div>
        <div className="h-[50vh] bg-white/50 backdrop-blur-xs rounded-lg shadow-lg flex items-center justify-center">

        </div>
        <div className="h-[150vh] bg-white/50 backdrop-blur-xs rounded-lg shadow-lg flex items-center justify-center">
        </div>
      </main >
      <Footer />
    </div >
  </>
}