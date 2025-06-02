import { Footer } from "../../layouts/Footer";
import { Header } from "../../layouts/Header";
import { RestaurantMenu } from "../app/customer/restaurant/RestaurantMenu";

export const Menu = () => {
    return <>
        <div className="min-h-screen flex flex-col bg-white">
            <Header />
            <main className="container mx-auto flex-1 flex flex-col gap-6 bg-white text-dark rounded-md p-8">
                <RestaurantMenu />
            </main>
            <Footer />
        </div>
    </>
};
