import { Navigate } from "react-router-dom";
import { estaLogueado } from "../../auth/auth";

function RutaProtegida({ children }) {
    if (!estaLogueado()) {
        return <Navigate to="/acceder" replace />;
    }
    return children;
}

export default RutaProtegida;