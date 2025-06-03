import { Footer } from "../../layouts/Footer";
import { Header } from "../../layouts/Header";
import { EditMyAccount } from "../app/my-account/EditMyAccount";

export const EditAccount = () => {

    return <>
        <div className="min-h-screen flex flex-col bg-slate-50">
            <Header />
            <main className="container mx-auto flex-1 flex flex-col gap-6 text-slate-700 rounded-lg p-8">
                <EditMyAccount />
            </main>
            <Footer />
        </div>
    </>
}
