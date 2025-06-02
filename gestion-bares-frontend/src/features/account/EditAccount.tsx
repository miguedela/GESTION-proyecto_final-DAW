import { Footer } from "../../layouts/Footer";
import { Header } from "../../layouts/Header";
import { EditMyAccount } from "../app/my-account/EditMyAccount";

export const EditAccount = () => {


    return <>
        <div className="min-h-screen flex flex-col bg-white dark:bg-neutral-900">
            <Header />
            <main className="container mx-auto flex-1 flex flex-col gap-6 dark:bg-neutral-900 bg-white dark:text-neutral-200 text-dark rounded-md p-8">
                <h1 className="text-2xl font-bold mb-4">Editar Cuenta</h1>
                <EditMyAccount />
            </main>
            <Footer />
        </div>
    </>
}
