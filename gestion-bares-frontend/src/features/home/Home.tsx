import { MainLinkButton } from "../../components/Buttons"
import { RestaurantsList } from "../app/restaurants/RestaurantsList"

export const Home = () => {
  return (
    <div>
      <div className="min-h-screen flex flex-col items-center justify-center gap-5">
        <MainLinkButton url="/login" text="Acceder" />
      </div>
      <RestaurantsList />
    </div>
  );
}
