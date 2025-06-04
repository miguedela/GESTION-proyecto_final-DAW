import { Footer } from '../layouts/Footer'
import { Header } from '../layouts/Header'
import { MyNotifications } from './app/customer/MyNotifications'

export const Notifications = () => {
    return <>
        <div className="min-h-screen flex flex-col bg-slate-50">
            <Header />
            <main className="container mx-auto flex-1 flex flex-col gap-6 text-slate-700 rounded-lg p-8">
                <MyNotifications />
            </main>
            <Footer />
        </div>
    </>
}
