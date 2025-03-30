
import { useNavigate } from "react-router-dom";
import { MainButton } from "../components/Buttons";

export const NotFound = () => {
    const navigate = useNavigate();

    return (
        <div className="min-w-screen min-h-screen flex flex-col items-center justify-center bg-gradient-to-br
        from-neutral-800 to-amber-600">
            <h1 className="text-5xl mb-7 text-white">Error 404: Not Found</h1>
            <MainButton onClick={() => navigate(-1)} className="text-xl bg-amber-400 text-yellow-900 hover:scale-120" title='Volver' />
        </div>
    )
}
