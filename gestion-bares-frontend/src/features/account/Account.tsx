import { Footer } from '../../layouts/Footer';
import { Header } from '../../layouts/Header';
import { MyAccount } from '../app/my-account/MyAccount';


export const Account = () => {

    return <>
        <div className="min-h-screen flex flex-col bg-white dark:bg-neutral-900">
            <Header />
            <main className="container mx-auto flex-1 flex flex-col gap-6 dark:bg-neutral-900 bg-white dark:text-neutral-200 text-dark rounded-md p-8">
                <MyAccount />
            </main>
            <Footer />
        </div>
    </>
}
