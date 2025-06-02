import { Footer } from "../../layouts/Footer";
import { Header } from "../../layouts/Header";
import { RestaurantDetail } from "../app/customer/restaurant/RestaurantDetail";

export const Restaurant = () => {
    return <>
        <div className="min-h-screen flex flex-col bg-white">
            <Header />
            <main className="container mx-auto flex-1 flex flex-col gap-6 bg-white text-dark rounded-md p-8">
                <RestaurantDetail />
            </main>
            <Footer />
        </div>
    </>
};
