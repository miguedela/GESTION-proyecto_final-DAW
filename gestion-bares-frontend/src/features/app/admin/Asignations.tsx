import { useAtom } from "jotai";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { userAtom } from "../../../atoms/user.atom";

export const Asignations = () => {
    const [user] = useAtom(userAtom);
    const navigate = useNavigate();

    

    useEffect(() => {
        if (user.role !== "ADMIN") {
            navigate("/main");
        }
    }, [user.role]);

    return (
        <div>Asignations</div>
    )
}
