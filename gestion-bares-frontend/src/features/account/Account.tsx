import { Footer } from '../../layouts/Footer';
import { Header } from '../../layouts/Header';
import { MyAccount } from '../app/my-account/MyAccount';


export const Account = () => {
    return <>
        <div className="min-h-screen flex flex-col bg-slate-50">
            <Header />
            <main className="container mx-auto flex-1 flex flex-col gap-6 text-slate-700 rounded-lg">
                <MyAccount />
            </main>
            <Footer />
        </div>
    </>
}
