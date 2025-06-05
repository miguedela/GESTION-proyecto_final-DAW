import { Footer } from '../layouts/Footer'
import { Header } from '../layouts/Header'
import { MyNotifications } from './app/customer/MyNotifications'

export const Notifications = () => {
    return <>
        <div className="min-h-screen flex flex-col">
            <Header />
            <main className="container mx-auto flex-1 flex flex-col gap-6 text-slate-50 rounded-lg p-8">
                <MyNotifications />
            </main>
            <Footer />
        </div>
    </>
}
