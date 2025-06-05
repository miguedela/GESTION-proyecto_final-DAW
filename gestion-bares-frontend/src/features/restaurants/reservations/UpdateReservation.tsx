import { Footer } from '../../../layouts/Footer'
import { Header } from '../../../layouts/Header'
import { UpdateMyReservation } from '../../app/customer/reservation/UpdateMyReservation'

export const UpdateReservation = () => {
    return <>
        <div className="min-h-screen flex flex-col">
            <Header />
            <main className="container mx-auto flex-1 flex flex-col gap-6text-dark rounded-md p-8">
                <UpdateMyReservation />
            </main>
            <Footer />
        </div>
    </>
}
